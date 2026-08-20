## To generate manifest manually
`
python .\framework\tools\generate_manifest.py
`

## To pull latest copy of Reveal Lecture Framework code
`
git fetch framework
git rm -r framework
git commit -m "Remove framework"
git subtree add --prefix=framework framework main --squash
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