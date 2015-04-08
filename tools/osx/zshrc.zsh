#!/usr/bin/env zsh

ZSHRC_OSX="$0:A"
ZSHRC_COMMON=${ZSHRC_OSX/\/osx\/zshrc.zsh/\/common\/zshrc.zsh}

source "$ZSHRC_COMMON"

launchctl setenv ELLIESPATH "$ELLIESPATH"
launchctl setenv GOPATH "$GOPATH"

antigen bundle brew
antigen bundle brew-cask
antigen bundle osx
antigen bundle terminalapp
antigen apply
