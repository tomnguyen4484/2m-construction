@echo off
cd /d "C:\Users\tomng\Desktop\2m-construction"
del ".git\index.lock" 2>nul
git add -A
git commit -m "feat: fence estimator - pine dog-ear 6ft only, $500/gate, stain excluded note, other types contact CTA"
git push origin main
echo === DONE ===
pause
