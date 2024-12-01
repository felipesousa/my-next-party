import React from "react";
import ReactDOMClient from "react-dom/client";
import { Ui } from "./screens/Ui/Ui";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<Ui />);
