#!/usr/bin/env zsh

ZSHRC_OSX="$0:A"
ZSHRC=${ZSHRC_OSX/\/osx\/zshrc.zsh/\/common\/zshrc.zsh}

source "$ZSHRC"

antigen bundle brew
antigen bundle brew-cask
antigen bundle osx
antigen bundle terminalapp
