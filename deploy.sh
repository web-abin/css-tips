#!/bin/sh
npm run build
git add .
git commit -m "$1"
git push origin main
npm run deploy