@echo off
cd /d "C:\Users\tomng\Desktop\2m-construction"
del ".git\index.lock" 2>nul
git add -A
git commit -m "fix: roofing page syntax error - bad border string on line 206"
git push origin main
echo === DONE ===
pause
