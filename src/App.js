import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import New_start from "./components/new_start/New_start";
import Start from "./components/start/Start";
import TableSchdDate from "./components/TableSchdDate/TableSchdDate";
import TableSchdTime from "./components/TableSchdTime/TableSchdTime";
import { getData, updateMap } from "./redux/slices/operationOnDataSlice";
// import "./../scheduled-date-timing.json"
function App() {
  return (
    <>
      {/* <Start />
       */}
      <Routes>
        <Route path="/" element={<New_start />}></Route>
        <Route path="/fetchPair" element={<TableSchdDate />}></Route>
        <Route path="/fetchTime" element={<TableSchdTime />}></Route>
      </Routes>
      {/* <New_start /> */}
    </>
  );
}

export default App;
