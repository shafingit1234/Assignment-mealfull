import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import SchdTimeGraph from "../schdTimeGraph/SchdTimeGraph";

function TableSchdTime() {
  const schd_time = useSelector(
    (state) => state.operationOnDataReducer.schd_time
  );
  const id = useSelector((state) => state.operationOnDataReducer.id);
  const [isVisible, setIsVisible] = useState(false);

  const col = Object.keys(schd_time[id]);
  const thData = () => {
    // return col.map((data) => {
    //   return <th key={data}>{data}</th>;
    // });
    // console.log(id);
    // console.log(schd_time);
    // console.log(schd_time.length);
    // let foundIdx = 0;
    // for (let i = 0; i < schd_time.length; i++) {
    //   if (schd_time[i].schd_date === id) {
    //     console.log("found ", schd_time[i]);
    //     foundIdx = i;
    //     break;
    //   }
    // }
    // setFoundId(foundIdx);
    // console.log(schd_time[id]);
    return col.map((data) => {
      return <th key={data}>{data}</th>;
    });
  };
  //get row data
  const tdData = () => {
    // return orig_data.map((data) => {
    //   return (
    //     <tr>
    //       {col.map((i) => {
    //         return <td>{data[i]}</td>;
    //       })}
    //     </tr>
    //   );
    // });
    return schd_time.map((data) => {
      return (
        <tr>
          {col.map((id) => {
            console.log(data[id]);
            return <td>{data[id]}</td>;
          })}
        </tr>
      );
    });
  };
  // return <div>TableSchdTime</div>;
  const test = () => {
    setIsVisible(true);
  };
  return (
    <>
      <Button
        onClick={() => {
          test();
        }}
      >
        Click Me!
      </Button>
      {isVisible === true ? <SchdTimeGraph /> : ""}
      {/* <Table stripped bordered hover>
        <thead>
          <tr>{thData()}</tr>
        </thead>
        <tbody>{tdData()}</tbody>
      </Table> */}
    </>
  );
}

export default TableSchdTime;
