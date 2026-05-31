#!/bin/bash
echo "--- نظام المزامنة الآلي للمهندس أوسان يعمل الآن ---"
while true; do
  git add .
  if ! git diff-index --quiet HEAD; then
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    git commit -m "Automated Update: $timestamp (Eng. Awsan Tech Suite)"
    git push origin main
    echo "Done: تم الرفع التلقائي لـ GitHub بنجاح في $timestamp"
  fi
  sleep 10 # يفحص المجلد كل 10 ثوانٍ لضمان الاستمرارية
done
