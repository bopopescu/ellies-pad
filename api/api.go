package api

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/verticalpalette/elliespad/node"
)

func init() {
	r := mux.NewRouter().PathPrefix("/api").Subrouter()
	node.Routes(r)
	http.Handle("/", r)
}
