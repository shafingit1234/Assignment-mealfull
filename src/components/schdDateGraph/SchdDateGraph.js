import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import "chart.js/auto";
function SchdDateGraph() {
  const schd_list = useSelector(
    (state) => state.operationOnDataReducer.schd_list
  );
  const [objt, setObjt] = useState(null);
  const random = () => Math.floor(Math.random() * 255);
  const createGraph = () => {
    //first create schd_date as labels id by id
    //then set count as your data.
    console.log(schd_list);
    let obj = {
      labels: [],
      datasets: [],
    };
    let obj2 = {
      label: "",
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 0.5,
    };
    obj2.label = "Schedules";
    for (let i = 0; i < schd_list.length; i++) {
      obj.labels.push(schd_list[i].schd_date);
      obj2.data.push(schd_list[i].count);
      obj2.borderColor.push("black");
      obj2.backgroundColor.push("aqua");
      //   obj2.borderWidth.push("acqua");
    }
    obj.datasets.push(obj2);
    console.log("This is an object ", obj);
    // setObjt(obj);
    return (
      <>
        <h1>Schedule-Date Vs Schedules Bar Graph</h1>
        <div style={{ maxWidth: "650px" }}>
          <Bar
            data={obj}
            height={400}
            options={{
              maintainAspectRatio: false,
              scales: {},
              legend: {
                labels: {
                  fontSize: 15,
                },
              },
            }}
          ></Bar>
        </div>
      </>
    );
  };
  return <div>{createGraph()}</div>;
}

export default SchdDateGraph;
