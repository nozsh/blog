#!/bin/bash

echo "- Purging public dir"
echo
rm -rf public/* && echo "- Purging public dir: Done"
echo
echo "- Re-generate public dir"
echo
hugo && echo "Re-generate public dir: Done"
echo
echo "- Work with git"
echo
git add . && git commit -m "upd" && git push
echo
echo "Done!"
