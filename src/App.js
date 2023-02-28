import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Start from "./components/start/Start";
import { getData, updateMap } from "./redux/slices/operationOnDataSlice";
// import "./../scheduled-date-timing.json"
function App() {
  return (
    <>
      <Start />
    </>
  );
}

export default App;
