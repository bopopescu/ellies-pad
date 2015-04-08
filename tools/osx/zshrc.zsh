#!/usr/bin/env zsh

ZSHRC_OSX="$0:A"
ZSHRC=${ZSHRC_OSX/\/osx\/zshrc.zsh/\/common\/zshrc.zsh}

# Set $ELLIESPATH
source "$ZSHRC"

# TODO #multi-platform @daniel Support more than just 64-bit OSX.
if [[ $PATH != *"$ELLIESPATH/tools/osx/64-bit/bin"* ]]; then
  export PATH="$PATH:$ELLIESPATH/tools/osx/64-bit/bin"
fi

antigen bundle brew
antigen bundle brew-cask
antigen bundle osx
antigen bundle terminalapp
