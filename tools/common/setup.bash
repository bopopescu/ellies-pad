#!/usr/bin/env bash
set -e

if [[ -z $ELLIESPATH ]]; then
  echo "Please set \$ELLIESPATH."
  exit 1
fi

if ! [[ $PATH =~ /tools/(linux|osx)/64-bit/bin ]]; then
  echo "Please add \$ELLIESPATH/tools/{linux,osx}/64-bit/bin to your \$PATH."
  exit 1
fi

if ! [[ $GOPATH =~ /tools/common/gopath ]]; then
  echo "Please add \$ELLIESPATH/tools/common/gopath to your \$GOPATH."
  exit 1
fi

cd "$ELLIESPATH"

echo ">> Installing npm packages."
(cd web && npm install)

# Don't install development tools on Travis CI.
if ! [[ -z $TRAVIS ]]; then
  exit 0
fi

echo
echo ">> Installing optional tools."
echo ">> Ctrl+C to stop."
echo

echo ">> Installing git hooks."
rm -rf .git/hooks
ln -s ../tools/common/git/hooks .git/hooks

# git config.
include=$'[include]\n\tpath = ../tools/common/git/config'
grep --fixed-strings --quiet "$include" .git/config
if [[ $? -ne 0 ]]; then
  echo ">> Installing git config."
  echo "$include" >> .git/config
fi

# echo ">> Installing go tools."
# goapp get -u github.com/golang/lint/golint
# goapp get -u github.com/nsf/gocode
# goapp get -u golang.org/x/tools/cmd/cover
# goapp get -u golang.org/x/tools/cmd/goimports
# goapp get -u golang.org/x/tools/cmd/oracle
# goapp get -u sourcegraph.com/sqs/goreturns

# Atom.
which -s apm
if [[ $? -eq 0 ]]; then
  echo ">> Installing atom packages."
  apm install Sublime-Style-Column-Selection
  apm install atom-beautify
  apm install autocomplete-plus
  apm install editorconfig
  apm install go-plus
  apm install jshint
  apm install language-gitignore
  apm install react
  apm install sort-lines
fi
