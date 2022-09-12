import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/antd.css";
import "./index.css";

import { initializeAPI } from "./api";
import { App } from "./components/App/App";
// import { spy } from "mobx";
//
// spy((event) => {
//   if (event.type === "action") {
//     console.log(event);
//   }
// });

initializeAPI();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
