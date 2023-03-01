import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
function SchdTimeGraph() {
  const schd_time = useSelector(
    (state) => state.operationOnDataReducer.schd_time
  );
  const [isNineVis, setIsNineVis] = useState(false);
  const [objct, setObject] = useState("");
  const id = useSelector((state) => state.operationOnDataReducer.id);
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
  const createGraphforNine = () => {
    return;
  };
  const createGraphforTwelve = () => {
    console.log(schd_time);
  };
  const createGraphforThree = () => {
    console.log(schd_time);
  };
  const createGraphforSix = () => {
    console.log(schd_time);
  };
  const createGraph = () => {
    console.log(schd_time[id]);
    obj2.label = schd_time[id].schd_date;
    obj.labels.push("9am - 12am");
    obj.labels.push("12am - 3pm");
    obj.labels.push("3pm - 6pm");
    obj.labels.push("6pm - 9pm");
    // console.log(schd_time[id].ThreeToSix);
    obj2.data.push(schd_time[id].nineToTwelve);
    obj2.data.push(schd_time[id].TwelveToThree);
    obj2.data.push(schd_time[id].ThreeToSix);
    obj2.data.push(schd_time[id].SixToNine);
    for (let i = 0; i < 4; i++) {
      obj2.backgroundColor.push("aqua");
    }
    obj.datasets.push(obj2);
    console.log("This is an object", obj);
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
  return (
    <>
      <br></br>
      {createGraph()}
    </>
  );
}

export default SchdTimeGraph;
