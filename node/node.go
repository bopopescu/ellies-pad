package node

import (
	"github.com/verticalpalette/ae/object"

	"appengine"
	"appengine/datastore"
)

// Kind is the appengine datastore kind string for Node.
const Kind = "Node"

// ID represents a Node's ID.
type ID string

// Node represents any piece of data that is stored in the graph.
type Node struct {
	object.Object
	Tags   []ID
	Name   string
	Points int64
}

// GetAll returns all Nodes in the graph.
func GetAll(c appengine.Context) ([]*Node, error) {
	q := datastore.NewQuery(Kind)
	var ns []*Node
	_, err := q.GetAll(c, &ns)
	if err != nil {
		return nil, err
	}
	return ns, nil
}

// Get returns the Node with the provided ID.
func Get(c appengine.Context, id ID) (*Node, error) {
	n := Node{
		Object: object.New(Kind, string(id)),
	}
	err := object.Get(c, &n)
	if err != nil {
		return nil, err
	}
	return &n, nil
}

// Save updates the graph with the changes that have been made to n.
func (n *Node) Save(c appengine.Context) error {
	return object.Save(c, n)
}
