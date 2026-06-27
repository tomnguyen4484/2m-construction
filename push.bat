@echo off
cd /d "C:\Users\tomng\Desktop\2m-construction"
del ".git\index.lock" 2>nul
del ".git\HEAD.lock" 2>nul
del ".git\objects\maintenance.lock" 2>nul
git add -A
git commit -m "feat: flooring page - move to top of services, fix text colors for dark bg"
git push origin main
echo === DONE ===
pause
