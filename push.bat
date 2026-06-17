@echo off
cd /d "C:\Users\tomng\Desktop\2m-construction"
del ".git\index.lock" 2>nul
git add -A
git commit -m "fix: recalibrate all estimate pricing - fence formula bug fix, concrete lower, deck railing/stairs, painting/flooring/drywall adjustments"
git push origin main
echo === DONE ===
pause
