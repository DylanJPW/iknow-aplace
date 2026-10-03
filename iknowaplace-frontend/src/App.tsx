import './App.css'
import {Router} from "./Router.tsx";
import {BrowserRouter} from "react-router";

function App() {

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
