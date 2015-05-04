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

if ! [[ $GOPATH =~ /3rdparty/go ]]; then
  echo "Please add \$ELLIESPATH/3rdparty/go to your \$GOPATH."
  exit 1
fi

cd "$ELLIESPATH"

# TODO @daniel Enable all of these.
echo ">> Installing Go tools."

# Update the timestamps on the pre-built object files,
# otherwise Go will try to build the AppEngine SDKs and fail.
(
  cd "$ELLIESPATH/tools/linux/64-bit/go_appengine/goroot" && \
  find . -name "*.a" -exec touch {} \;
)
(
  cd "$ELLIESPATH/tools/osx/64-bit/go_appengine/goroot" && \
  find . -name "*.a" -exec touch {} \;
)

goapp get github.com/golang/lint/golint
# goapp get github.com/nsf/gocode
goapp get golang.org/x/tools/cmd/cover
goapp get golang.org/x/tools/cmd/goimports
goapp get golang.org/x/tools/cmd/oracle
# goapp get golang.org/x/tools/cmd/vet
# goapp get sourcegraph.com/sqs/goreturns

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
