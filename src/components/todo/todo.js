import React from "react";
import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoForm from "./form.js";
import TodoList from "./list.js";

import "./todo.scss";
function ToDo() {
  const [list, setlist] = useState([]);
  const [itemIdToEdit, setitemIdToEdit] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = (item) => {
    setShow(false);
    if (item && item.text) editItem(itemIdToEdit, item);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    let list = [
      {
        _id: 1,
        complete: false,
        text: "Clean the Kitchen",
        difficulty: 3,
        assignee: "Person A",
      },
      {
        _id: 2,
        complete: false,
        text: "Do the Laundry",
        difficulty: 2,
        assignee: "Person A",
      },
      {
        _id: 3,
        complete: false,
        text: "Walk the Dog",
        difficulty: 4,
        assignee: "Person B",
      },
      {
        _id: 4,
        complete: true,
        text: "Do Homework",
        difficulty: 3,
        assignee: "Person C",
      },
      {
        _id: 5,
        complete: false,
        text: "Take a Nap",
        difficulty: 1,
        assignee: "Person B",
      },
    ];
    console.log("DidMount????");
    setlist(list);
    document.title = `ToDo list : ${
      list.filter((item) => !item.complete).length
    }`;
  }, []);
  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setlist([...list, item]);
  };

  const toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      let newList = list.map((listItem) =>
        listItem._id === item._id ? item : listItem
      );
      setlist(newList);
    }
  };

  const deleteItem = (id) => {
    console.log("delete", id);
    let newList = list.filter((item) => item._id != id);
    console.log(newList.length);
    setlist(newList);
  };

  const editItem = (id, newItem) => {
    newItem._id = id;
    // add complete state from the oldItem
    let oldItem = list.find((item) => item._id == id);
    newItem.complete = oldItem.complete;
    let newList = list.map((listItem) => {
      return listItem._id == id ? newItem : listItem;
    });
    setlist(newList);
  };

  return (
    <>
      <header>
        <Navbar bg="primary" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Navbar>
        <br />

        <Container>
          <Navbar expand="lg" variant="dark" bg="dark">
            <Navbar.Brand href="#">
              TODO List Manager ({list.filter((item) => !item.complete).length})
            </Navbar.Brand>
          </Navbar>
        </Container>
      </header>

      <section className="todo">
        <div>
          <TodoForm handleSubmit={addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={toggleComplete}
            handleDeleteItem={deleteItem}
            handleShow={handleShow}
            handleItemIdToEdit={setitemIdToEdit}
          />
        </div>
      </section>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TodoForm handleSubmit={handleClose}></TodoForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ToDo;
