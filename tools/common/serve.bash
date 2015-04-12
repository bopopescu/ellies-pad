#!/usr/bin/env bash

session="tools/common/serve"

tmux has-session -t ${session}
if [[ $? -ne 0 ]]; then
  tmux new-session -s ${session} -d -n api 'cd "$ELLIESPATH" && goapp serve ./api'
  tmux split-window 'cd "$ELLIESPATH/web" && gulp serve'

  tmux set-option -t ${session} mode-mouse on
  tmux set-option -t ${session} mouse-select-window on
  tmux set-option -t ${session} mouse-select-pane on
  tmux set-option -t ${session} mouse-resize-pane on
fi

tmux attach-session -t ${session}
