#!/bin/bash

#echo "- Purging public dir"
#echo
#rm -rf public/* && echo "- Purging public dir: Done"
#echo
#echo "- Purging gen dir (resources/_gen/images)"
#echo
#rm -rf resources/_gen/images/* && echo "- Purging resource/_gen/images dir: Done"
#echo
#echo "- Re-generate public dir"
#echo
#hugo && echo "Re-generate public dir: Done"
#echo

echo "- Delete public and resources"
echo
rm -rf public && rm -rf resources
echo
echo "- Work with git"
echo
git add . && git commit -m "upd" && git push
echo
echo "Done!"
