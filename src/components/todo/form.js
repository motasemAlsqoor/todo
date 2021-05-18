import React from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";

function TodoForm(props) {
  const [item, handleInputChange, handleSubmit] = useForm(props.handleSubmit);
  // const handleInputChange = (e) => {
  //   setitem({ ...item, [e.target.name]: e.target.value });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   e.target.reset();
  //   props.handleSubmit(item);
  //   const tempItem = {};
  //   setitem(tempItem);
  // };

  return (
    <>
      <h3>Add ToDo Item</h3>
      <Form className="mr-auto" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>ToDo item</Form.Label>
          <Form.Control
            type="text"
            name="text"
            placeholder="Item Details"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Assigned To</Form.Label>
          <Form.Control
            type="text"
            placeholder="Assignee Name"
            name="assignee"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form>
          <Form.Group controlId="formBasicRange">
            <Form.Label>Difficulty Rating</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              defaultValue="1"
              type="range"
              min="1"
              max="5"
              name="difficulty"
            />
          </Form.Group>
        </Form>

        <Button variant="primary" type="submit">
          Add Item
        </Button>
      </Form>
    </>
  );
}

export default TodoForm;
