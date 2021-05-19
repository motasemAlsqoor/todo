import React from "react";
import SettingProvider from "./context/app-setting";

import ToDo from "./components/todo/todo.js";

export default class App extends React.Component {
  render() {
    return (
      <>
        <SettingProvider>
          <ToDo />
        </SettingProvider>
      </>
    );
  }
}
