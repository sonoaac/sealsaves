// Stop hook: writes the 10 most recent chat messages (your prompts + Claude's
// replies, each counting as one) to "users manual/chat-log.md".
const fs = require("fs");
const path = require("path");

const KEEP = 10;
const OUT = path.join(__dirname, "..", "..", "users manual", "chat-log.md");

let input = "";
process.stdin.on("data", (d) => (input += d));
process.stdin.on("end", () => {
  const { transcript_path } = JSON.parse(input || "{}");
  if (!transcript_path || !fs.existsSync(transcript_path)) return;

  const entries = fs
    .readFileSync(transcript_path, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  const clean = (t) =>
    t
      .replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, "")
      .replace(/<ide_[a-z_]+>[\s\S]*?<\/ide_[a-z_]+>/g, "")
      .trim();

  const messages = [];
  for (const e of entries) {
    if (e.isMeta || e.isSidechain || e.isApiErrorMessage) continue;
    const content = e.message?.content;
    if (e.type === "user") {
      const blocks = typeof content === "string" ? [{ type: "text", text: content }] : content || [];
      if (blocks.some((b) => b.type === "tool_result")) continue;
      const text = clean(blocks.filter((b) => b.type === "text").map((b) => b.text).join("\n"));
      if (!text || text.startsWith("<task-notification") || text.startsWith("<command-")) continue;
      messages.push({ role: "You", text });
    } else if (e.type === "assistant" && Array.isArray(content)) {
      const text = content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
      if (!text) continue;
      // Keep only Claude's last text of each turn, i.e. the reply you actually read at the end.
      const last = messages[messages.length - 1];
      if (last?.role === "Claude") last.text = text;
      else messages.push({ role: "Claude", text });
    }
  }

  const recent = messages.slice(-KEEP);
  const body = recent.map((m) => `## ${m.role}\n\n${m.text}\n`).join("\n---\n\n");
  const header = `# Chat log — last ${recent.length} messages\n\nUpdated automatically after every Claude reply (${new Date().toLocaleString()}).\nYour message and Claude's reply each count as one.\n\n---\n\n`;
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, header + body);
});
