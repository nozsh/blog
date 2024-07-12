#!/bin/bash

echo "- Delete public and resources"
echo
rm -rf public && rm -rf resources
echo
echo "- Work with git"
echo
git add . && git commit -m "upd" && git push
echo
echo "Done!"
