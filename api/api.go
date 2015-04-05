package api

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/verticalpalette/ellies-pad/task"
)

func init() {
	r := mux.NewRouter().PathPrefix("/api").Subrouter()
	task.Routes(r)
	http.Handle("/", r)
}
