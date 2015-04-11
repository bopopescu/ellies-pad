#!/usr/bin/env bash
set -e

echo ">> Building web app."
cd "$ELLIESPATH/web"
npm run deploy

echo ">> Deploying to AppEngine."
cd "$ELLIESPATH"
if ! [[ -z $TRAVIS ]]; then
  echo "$APPENGINE_PASSWORD" | appcfg.py update ./api --email="$APPENGINE_EMAIL" --passin
else
  goapp deploy ./api
fi
