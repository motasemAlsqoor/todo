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
import axios from "axios";

import "./todo.scss";
import useAjax from "../../hooks/useAjax.js";
function ToDo() {
  const todoServerUrl = `https://api-server13.herokuapp.com/api/v1/todo`;
  const [list, addItem, editItem, deleteItem] = useAjax(todoServerUrl);
  const [itemIdToEdit, setitemIdToEdit] = useState({});
  const [show, setShow] = useState(false);

  //const {list} = useAjax(todoServerUrl);
  //console.log(data);
  //setlist(data);
  const handleClose = (item) => {
    setShow(false);
    if (item && item.text) editItem(itemIdToEdit, item);
  };
  const handleShow = () => setShow(true);
  const toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};
    item.complete = !item.complete;
    editItem(id, item);
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
