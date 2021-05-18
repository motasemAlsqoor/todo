import Button from "react-bootstrap/Button";
import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoList(props) {
  const getToDoItemStatusBadge = (item) => {
    const variant = item.complete ? "danger" : "success";
    const text = item.complete ? "complete" : "pending";
    return <Badge variant={variant}>{text}</Badge>;
  };
  return (
    <ul>
      {props.list.map((item) => (
        <li style={{ marginTop: "16px" }} key={item._id}>
          <Card style={{ width: "100%" }}>
            <Card.Header as="h5">
              {getToDoItemStatusBadge(item)} {item.assignee}
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <span onClick={() => props.handleComplete(item._id)}>
                  {item.text}
                </span>
              </Card.Text>
              <Button
                variant="danger"
                onClick={() => props.handleDeleteItem(item._id)}
              >
                Delete
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  props.handleItemIdToEdit(item._id);
                  props.handleShow();
                }}
              >
                Edit
              </Button>
            </Card.Body>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
