@echo off
cd /d "C:\Users\tomng\Desktop\2m-construction"
del ".git\index.lock" 2>nul
git add -A
git commit -m "feat: estimate redesign - 10% below market pricing + savings comparison + top 6 services"
git push origin main
echo === DONE ===
pause
