#!/usr/bin/env zsh

ZSHRC_DIR=$(dirname $0:A)
export ELLIESPATH=${ZSHRC_DIR/\/tools/}
export GOPATH=${ELLIESPATH/src\/github.com\/verticalpalette\/ellies-pad/}

# git subrepo
source "$ELLIESPATH/tools/git-subrepo/init"

# antigen
source "$ELLIESPATH/tools/antigen/antigen.zsh"

# zsh themes and plugins
antigen use oh-my-zsh
antigen bundle git
antigen bundle npm
antigen theme minimal
