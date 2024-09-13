import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {store} from "./store/store.js"
import { Provider } from "react-redux";
import {Login, SearchUser, UpdateCover,UpdateAvatar,UpdateAccountDetails, ChangePassword,GetlikedTweets } from "./components/index.js"


function App() {
  return (
    <>
      <Provider store={store}>
      <Login/>
     <GetlikedTweets/>
      </Provider>
    </>
  );
}

export default App;
