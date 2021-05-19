import Button from "react-bootstrap/Button";
import React from "react";
import { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";

import { SettingContext } from "../../context/app-setting";

function TodoList(props) {
  const [currentPage, setcurrentPage] = useState(1);
  const context = useContext(SettingContext);
  const numberOfPage = Math.ceil(
    props.list.length / context.numberOfItemsPerScreen
  );
  const getToDoItemStatusBadge = (item) => {
    const variant = item.complete ? "danger" : "success";
    const text = item.complete ? "complete" : "pending";
    return (
      <Badge
        style={{ cursor: "pointer" }}
        onClick={() => props.handleComplete(item._id)}
        variant={variant}
      >
        {text}
      </Badge>
    );
  };
  const getPagesNavigationButtons = () => {
    let buttons = [];
    //If you are past the first n items (i.e. on page 2 or higher), add a button labeled Previous that will replace the list with the previous n items in the list.
    let next = 0;
    if (currentPage >= 2) {
      buttons.push(
        <Button variant="link" onClick={() => setcurrentPage(currentPage - 1)}>
          Previous
        </Button>
      );
      next = currentPage;
    }

    for (let index = next; index < numberOfPage; index++) {
      buttons.push(
        <Button variant="link" onClick={() => setcurrentPage(index + 1)}>
          {index + 1}
        </Button>
      );
    }
    return buttons;
  };
  const getCurrentList = () => {
    let itemsPerPerScreen = context.numberOfItemsPerScreen;
    let start = currentPage * itemsPerPerScreen - itemsPerPerScreen;
    let end = currentPage * itemsPerPerScreen;
    //filter=>sort=>slice
    return props.list
      .filter((item) => {
        return !item.complete || context.completedTodoItemsShowStatus;
      })
      .sort((first, last) => {
        // if (a is less than b by some ordering criterion) {
        //   return -1;
        // }
        // if (a is greater than b by the ordering criterion) {
        //   return 1;
        // }
        // // a must be equal to b
        // return 0;
        const criteria = context.defaultSortField;
        if (first[criteria] < last[criteria]) {
          return -1;
        }
        if (first[criteria] > last[criteria]) {
          return 1;
        }
        // a must be equal to b
        return 0;
      })
      .slice(start, end);
  };

  return (
    <>
      <ul>
        {getCurrentList().map((item) => (
          <li style={{ marginTop: "16px" }} key={item._id}>
            <Card style={{ width: "100%" }}>
              <Card.Header as="h5">
                {getToDoItemStatusBadge(item)} {item.assignee}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <span>{item.text}</span>
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
              <Card.Footer>difficulty{" : " + item.difficulty}</Card.Footer>
            </Card>
          </li>
        ))}
      </ul>
      {getPagesNavigationButtons().map((item) => item)}
    </>
  );
}

export default TodoList;
