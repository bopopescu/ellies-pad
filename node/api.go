package node

import (
	"encoding/json"
	"net/http"

	"appengine"

	"github.com/gorilla/mux"
	"github.com/verticalpalette/ae/apiutil"
)

// Routes adds Node-specific routing.
func Routes(r *mux.Router) {
	ns := r.Path("/nodes").Subrouter()
	ns.Methods("GET").Handler(listNodes)
	ns.Methods("POST").Handler(createNode)

	n := r.Path("/nodes/{ID:[a-fA-F0-9]+}").Subrouter()
	n.Methods("GET").Handler(showNode)
	n.Methods("PUT").Handler(editNode)
}

var listNodes = apiutil.Error(apiutil.Json(
	func(w http.ResponseWriter, r *http.Request) error {
		c := appengine.NewContext(r)
		nodes, err := GetAll(c)
		if err != nil {
			return err
		}

		if nodes == nil {
			nodes = make([]*Node, 0)
		}

		err = json.NewEncoder(w).Encode(nodes)
		if err != nil {
			return err
		}

		return nil
	}))

var createNode = apiutil.Error(apiutil.Json(
	func(w http.ResponseWriter, r *http.Request) error {
		return nil
	}))

var showNode = apiutil.Error(apiutil.Json(
	func(w http.ResponseWriter, r *http.Request) error {
		return nil
	}))

var editNode = apiutil.Error(apiutil.Json(
	func(w http.ResponseWriter, r *http.Request) error {
		return nil
	}))
