import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Login  from "./components/Login.jsx";
import AllTweets from "./components/Getalltweets.jsx"
import {store} from "./store/store.js"
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
      <Login/>
      <AllTweets/>
      </Provider>
    </>
  );
}

export default App;
