The snapshots are stored on your computer, inside the project folder itself:

```
C:\Users\chuch\Downloads\sealsavesale\.git
```

`.git` is a hidden folder that holds all four snapshots (v1–v4) and their history. It lives on disk, so **closing VS Code, Claude, or even restarting your PC won't lose anything**. The only way to lose it is deleting the `sealsavesale` folder or that `.git` folder inside it.

**To pick up where you left off:**
1. Open `C:\Users\chuch\Downloads\sealsavesale` in VS Code.
2. Start the site with `npm run dev` in the terminal, then open http://localhost:3000.
3. Ask me to keep going, or say "revert to v3" (or any snapshot) to restore one.

**Things to know:**
- **Snapshots are backed up nowhere else.** A GitHub copy would protect you if the laptop dies, and Vercel needs GitHub to deploy anyway.
- **Reopening Claude:** a new chat won't remember this conversation's details, but the code and snapshots are all there. I can also save a short note about this project in my memory so a future session knows what SealSaves is and how the snapshots are named. Want me to?
