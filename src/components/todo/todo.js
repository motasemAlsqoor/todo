import React from "react";
import { useState, useEffect, useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoForm from "./form.js";
import TodoList from "./list.js";
import LoginProvider from "../../context/auth";
import Login from "./login";
import { If, Else, Then } from "react-if";

import "./todo.scss";
import useAjax from "../../hooks/useAjax.js";
import { LoginContext } from "../../context/auth";
export default function ToDo(props) {
  const context = useContext(LoginContext);
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
            
              <Login />
           
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

      <If condition={context.loggedIn}>
        <section className="todo">
          <div style={{ width: "25%" }}>
            <TodoForm handleSubmit={addItem} />
          </div>

          <div style={{ maxWidth: "75%", minWidth: "75%" }}>
            <TodoList
              list={list}
              handleComplete={toggleComplete}
              handleDeleteItem={deleteItem}
              handleShow={handleShow}
              handleItemIdToEdit={setitemIdToEdit}
            />
          </div>
        </section>
      </If>

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
