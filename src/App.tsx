import { Header } from "./components/header/header";
import "./index.css";
import { routes } from "./routes";
import { Redirect, Route } from "wouter";
import { store } from "../store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Header text={"Feed with web socket"} />
      <Provider store={store}>
        <Route path="/">
          <Redirect to="/feed" />
        </Route>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} component={route.component} />
        ))}
      </Provider>
    </>
  );
}

export default App;
