$repo = "https://github.com/jinsungpsu/DTCC-Lectures-RevealJS-Framework.git"

if (Test-Path framework) {
    Remove-Item -Recurse -Force framework
}

git clone $repo framework

Remove-Item -Recurse -Force framework\.git

git add framework
git commit -m "Update framework"
git push origin main