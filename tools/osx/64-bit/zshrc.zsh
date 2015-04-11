#!/usr/bin/env zsh

ZSHRC_OSX_64BIT="$0:A"
ZSHRC_OSX=${ZSHRC_OSX_64BIT/\/64-bit\/zshrc.zsh/\/zshrc.zsh}

source "$ZSHRC_OSX"

if [[ $PATH != *$ELLIESPATH/tools/osx/64-bit/bin* ]]; then
  export PATH="$PATH:$ELLIESPATH/tools/osx/64-bit/bin"
fi

if [[ -z $GOROOT ]]; then
  export GOROOT="$ELLIESPATH/tools/osx/64-bit/go_appengine_sdk_darwin_amd64-1.9.18/goroot"
  launchctl setenv GOROOT "$GOROOT"
fi
