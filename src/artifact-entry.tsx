import React from "react";
import { createRoot } from "react-dom/client";
import { DashboardClient } from "./components/dashboard/dashboard-client";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(React.createElement(DashboardClient));
}
