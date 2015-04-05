package task

import (
	"github.com/verticalpalette/ae/object"

	"appengine"
	"appengine/datastore"
)

// Kind is the appengine datastore kind string for Task.
const Kind = "Task"

// ID represents a Task's ID.
type ID string

// Task represents any piece of data that is stored in the graph.
type Task struct {
	object.Object
	Name   string
	Tags   []ID
}

// GetAll returns all Tasks in the graph.
func GetAll(c appengine.Context) ([]*Task, error) {
	q := datastore.NewQuery(Kind)
	var ts []*Task
	_, err := q.GetAll(c, &ts)
	if err != nil {
		return nil, err
	}
	return ts, nil
}

// Get returns the Task with the provided ID.
func Get(c appengine.Context, id ID) (*Task, error) {
	t := Task{
		Object: object.New(Kind, string(id)),
	}
	err := object.Get(c, &t)
	if err != nil {
		return nil, err
	}
	return &t, nil
}

// Save updates the graph with the changes that have been made to n.
func (t *Task) Save(c appengine.Context) error {
	return object.Save(c, t)
}
