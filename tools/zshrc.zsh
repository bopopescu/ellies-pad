#!/usr/bin/env zsh

ZSHRC_DIR=$(dirname $0:A)
export ELLIESPATH=${ZSHRC_DIR/\/tools/}
export GOPATH=${ELLIESPATH/src\/github.com\/verticalpalette\/ellies-pad/}

# git subrepo
source "$ELLIESPATH/tools/git-subrepo/init"

# git config
git config color.ui auto
git config alias.co checkout
git config alias.br branch
git config alias.ci commit
git config alias.st status

# antigen
source "$ELLIESPATH/tools/antigen/antigen.zsh"

# zsh themes and plugins
antigen use oh-my-zsh
antigen bundle git
antigen bundle golang
antigen bundle npm
antigen theme minimal
