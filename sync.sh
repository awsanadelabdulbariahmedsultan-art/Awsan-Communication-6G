#!/bin/bash
echo "--- بدء المزامنة العالمية لمشروع Awsan Communication ---"
git add .
timestamp=$(date "+%Y-%m-%d %H:%M:%S")
git commit -m "Continuous Sync by Eng. Awsan - $timestamp"
git push origin main
echo "--- تمت المزامنة والحفظ في GitHub بنجاح ---"
