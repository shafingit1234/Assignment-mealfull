import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { storeId } from "../../redux/slices/operationOnDataSlice";
import { Bar } from "react-chartjs-2";
import SchdDateGraph from "../schdDateGraph/SchdDateGraph";
//here fetch the schd_list from store.js then create another table that will show schedule date and count for it.
function TableSchdDate() {
  const [id, setId] = useState("");
  const dispatch = useDispatch("");
  const [isVisible, setIsVisible] = useState(false);
  const schd_time = useSelector(
    (state) => state.operationOnDataReducer.schd_time
  );
  const schd_list = useSelector(
    (state) => state.operationOnDataReducer.schd_list
  );
  const navigate = useNavigate("");
  const col = Object.keys(schd_list[0]);
  const thData = () => {
    return col.map((data) => {
      console.log(data);
      return <th key={data}>{data}</th>;
    });
  };
  const navToFetchTime = (data, col) => {
    console.log("hi");
    setId(data[col[0]]);
    console.log(data[col[0]]);
    dispatch(storeId(data[col[0]]));

    let foundIdx = 0;
    for (let i = 0; i < schd_time.length; i++) {
      if (schd_time[i].schd_date === id) {
        console.log("found ", schd_time[i]);
        foundIdx = i;
        break;
      }
    }
    console.log("foundIdx", foundIdx);
    dispatch(storeId(foundIdx));

    navigate("/fetchTime", { replace: true });
  };

  const tdData = () => {
    console.log("bi", schd_list);
    return schd_list.map((data) => {
      console.log(data);
      console.log("hi", col[0]);
      return (
        <tr>
          {col.map((i) => {
            // console.log(i);
            // console.log(data[0]);
            return (
              <td>
                <ul>
                  <li
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navToFetchTime(data, col);
                    }}
                  >
                    {data[i]}
                  </li>
                </ul>
              </td>
            );
          })}
        </tr>
      );
    });
  };
  const test = () => {
    // console.log("This is my list:", schd_list);
    tdData();
  };
  const createGraph = () => {
    setIsVisible(true);
  };
  return (
    <div>
      <Button
        onClick={() => {
          // test();
          createGraph();
        }}
      >
        Click Me!
      </Button>
      <Table stripped bordered hover>
        <thead>
          <tr>{thData()}</tr>
        </thead>
        <tbody>{tdData()}</tbody>
      </Table>
      {isVisible === true ? <SchdDateGraph /> : ""}
    </div>
  );
}

export default TableSchdDate;
