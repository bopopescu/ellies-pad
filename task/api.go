package task

import (
	"encoding/json"
	"net/http"

	"appengine"

	"github.com/gorilla/mux"
	"github.com/verticalpalette/ae/apiutil"
)

// Routes adds Task-specific routing.
func Routes(r *mux.Router) {
	ns := r.Path("/tasks").Subrouter()
	ns.Methods("GET").Handler(listTasks)
	ns.Methods("POST").Handler(createTask)

	n := r.Path("/tasks/{ID:[a-fA-F0-9]+}").Subrouter()
	n.Methods("GET").Handler(showTask)
	n.Methods("PUT").Handler(editTask)
}

var listTasks = apiutil.Error(apiutil.Json(
	func(w http.ResponseWriter, r *http.Request) error {
		c := appengine.NewContext(r)
		tasks, err := GetAll(c)
		if err != nil {
			return err
		}

		if tasks == nil {
			tasks = make([]*Task, 0)
		}

		err = json.NewEncoder(w).Encode(tasks)
		if err != nil {
			return err
		}

		return nil
	}))

var createTask = apiutil.Error(apiutil.Json(
	func(w http.ResponseWriter, r *http.Request) error {
		return nil
	}))

var showTask = apiutil.Error(apiutil.Json(
	func(w http.ResponseWriter, r *http.Request) error {
		return nil
	}))

var editTask = apiutil.Error(apiutil.Json(
	func(w http.ResponseWriter, r *http.Request) error {
		return nil
	}))
