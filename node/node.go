package node

import (
	"github.com/verticalpalette/ae/object"

	"appengine"
	"appengine/datastore"
)

const Kind = "Node"

type ID string

type Node struct {
	object.Object
	Tags   []ID
	Name   string
	Points int64
}

func GetAll(c appengine.Context) ([]*Node, error) {
	q := datastore.NewQuery(Kind)
	var ns []*Node
	_, err := q.GetAll(c, &ns)
	if err != nil {
		return nil, err
	}
	return ns, nil
}

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

func (n *Node) Save(c appengine.Context) error {
	return object.Save(c, n)
}
