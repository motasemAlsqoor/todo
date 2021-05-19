import React, { useState } from "react";

export const SettingContext = React.createContext();

export default function SettingProvider(props) {
  const [completedTodoItemsShowStatus, setCompletedItemShowStatus] =
    useState(true);
  const [numberOfItemsPerScreen, setnumberOfItemsPerScreen] = useState(3);
  const [defaultSortField, setdefaultSortField] = useState("difficulty");
  const state = {
    completedTodoItemsShowStatus,
    numberOfItemsPerScreen,
    defaultSortField,
  };

  return (
    <SettingContext.Provider value={state}>
      {props.children}
    </SettingContext.Provider>
  );
}
