@echo off
cd /d "C:\Users\tomng\Desktop\2m-construction"
del ".git\index.lock" 2>nul
git add -A
git commit -m "feat: blog admin system - CRUD editor in admin panel, blog listing page, individual post pages with SEO metadata"
git push origin main
echo === DONE ===
pause
