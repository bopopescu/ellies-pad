package api

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/verticalpalette/ellies-pad/node"
)

func init() {
	r := mux.NewRouter().PathPrefix("/api").Subrouter()
	node.Routes(r)
	http.Handle("/", r)
}
