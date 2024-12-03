#!/bin/bash
set -e

npm i

npm i -g serve@14.2.4 pm2@5.4.3

npm run build

if [ "$NODE_ENV" = "production" ]; then
  echo "Production environment detected, serving the app..."
  serve -s dist
else
  echo "Non-production environment detected, tailing /dev/null..."
  pm2 start --name "ptc-dashboard" npm -- run start
  tail -f /dev/null
fi
