// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { RoadmapProvider } from "./context/RoadmapContext";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <RoadmapProvider>
//       <App />
//     </RoadmapProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RoadmapProvider } from "./context/RoadmapContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RoadmapProvider>
      <App />
    </RoadmapProvider>
  </React.StrictMode>
);

