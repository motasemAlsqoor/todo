import Button from "react-bootstrap/Button";
import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoList(props) {
  return (
    <ul>
      {props.list.map((item) => (
        <li className={`complete-${item.complete.toString()}`} key={item._id}>
          <span onClick={() => props.handleComplete(item._id)}>
            {item.text}
          </span>
          <Button
            variant="danger"
            onClick={() => props.handleDeleteItem(item._id)}
          >
            Delete
          </Button>
          <Button
            variant="primary"
            onClick={()=>{
              props.handleItemIdToEdit(item._id);
              props.handleShow();
            }}
          >Edit</Button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
