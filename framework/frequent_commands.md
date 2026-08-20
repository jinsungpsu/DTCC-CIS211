## To generate manifest manually
`
python .\framework\tools\generate_manifest.py
`

## To pull latest copy of Reveal Lecture Framework code
`
framework/tools/test.ps1
`

it's a script which:
`
$repo = "https://github.com/jinsungpsu/DTCC-Lectures-RevealJS-Framework.git"

if (Test-Path framework) {
    Remove-Item -Recurse -Force framework
}

git clone $repo framework

Remove-Item -Recurse -Force framework\.git

git add framework
git commit -m "Update framework"
git push origin main
`

# To add framework to new project/repo
`
git remote add framework https://github.com/jinsungpsu/DTCC-Lectures-RevealJS-Framework.git      
git subtree pull --prefix=framework framework main --squash
`

# revealjs plugins
'
npm install --save reveal.js-menu
'