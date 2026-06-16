@echo off
cd /d "C:\Users\tomng\Desktop\2m-construction"
del ".git\index.lock" 2>nul
git add -A
git commit -m "fix: estimate page - show watermark logo + better text contrast"
git push origin main
echo === DONE ===
pause
