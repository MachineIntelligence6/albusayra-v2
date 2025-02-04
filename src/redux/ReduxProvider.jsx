"use client"; // Mark as a client component

import { Provider } from "react-redux";
import store from "./store";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
