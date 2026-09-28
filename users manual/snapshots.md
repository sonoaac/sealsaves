The snapshots are stored on your computer, inside the project folder itself:

```
C:\Users\chuch\Downloads\sealsavesale\.git
```

`.git` is a hidden folder that holds all the snapshots and their history. It lives on disk, so **closing VS Code, Claude, or even restarting your PC won't lose anything**. The only way to lose it is deleting the `sealsavesale` folder or that `.git` folder inside it.

**To pick up where you left off:**
1. Open `C:\Users\chuch\Downloads\sealsavesale` in VS Code.
2. Start the site with `npm run dev` in the terminal, then open http://localhost:3000.
3. Ask me to keep going, or say "revert to v3" (or any snapshot) to restore one.

**Things to know:**
- **Snapshots are backed up on GitHub** (see "GitHub backup" below), so they survive even if the laptop dies.
- **Reopening Claude:** a new chat won't remember this conversation's details, but the code and snapshots are all there. I can also save a short note about this project in my memory so a future session knows what SealSaves is and how the snapshots are named. Want me to?

## GitHub backup

A copy of the project and every snapshot lives on GitHub:

**https://github.com/sonoaac/sealsaves** (private, account **sonoaac**)

**Snapshots so far:**

| Snapshot | What's in it |
|---|---|
| `v1-homepage` | First homepage |
| `v2-gamesir-photos` | + GameSir photos, product pages, gallery |
| `v3-logo-devices` | + S² logo, Logitech photos, iPhones/iPads, colour stock |
| `v4-color-picker` | + colour cubes that switch the title and photo |
| `v5-users-manual` | + this users manual and the auto-updated chat log |

**Keeping GitHub up to date:** a new snapshot is saved on your computer first. Ask Claude to "save a snapshot and upload it", or run these in the project folder:

```
git add -A
git commit -m "describe what changed"
git push --follow-tags
```

**If the laptop is lost or replaced:** on the new computer, run

```
git clone https://github.com/sonoaac/sealsaves.git
cd sealsaves
npm install
npm run dev
```

and everything, including all snapshots, is back.

**Deploying:** Vercel can deploy the site straight from this GitHub repository (vercel.com → Add New Project → import `sonoaac/sealsaves`).
