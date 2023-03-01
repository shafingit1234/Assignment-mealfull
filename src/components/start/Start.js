import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Start.scss";
import { updateMap } from "../../redux/slices/operationOnDataSlice";
import { getData } from "../../redux/slices/operationOnDataSlice";
import TableOrig from "../TableOrig/TableOrig";
// import "./../scheduled-date-timing.json"
function Start() {
  const dispatch = useDispatch();
  // let orig_mp = new Map();
  // let orig_data = "";
  const [orig_mp, setOrig_mp] = useState("");
  const [orig_data, setData] = useState("");
  const findTimeRange = (tm) => {
    let hr = tm.indexOf(":");
    let int_hr = parseInt(tm.substring(0, hr));

    if (int_hr >= 9 && int_hr < 12) {
      return "9-12";
    }
    if (int_hr >= 12 && int_hr < 15) {
      return "12-3";
    }
    if (int_hr >= 15 && int_hr < 18) {
      return "3-6";
    }
    if (int_hr >= 18 && int_hr < 21) {
      return "6-9";
    }
  };
  const findCleanData = (data) => {
    let mp = new Map();
    let test = "";
    for (let i = 0; i < data.length; i++) {
      // i = 0;
      let id = JSON.stringify(data[i].item_date);

      let dt = JSON.stringify(data[i].schedule_time).split(" ")[0];
      let time = JSON.stringify(data[i].schedule_time).split(" ")[1];
      let len = dt.length;
      let sd_date = dt.substring(1, len);
      // let sd_slot = data[i].slot;
      len = time.length;
      let sd_time = time.substring(0, len - 1);
      // console.log("item_date ", id);
      console.log("sd_date", sd_date);
      console.log("sd_time", sd_time);
      // console.log("sd_slot", sd_slot);
      // const obj = {
      //   count: 0,
      //   time: {
      //     "9-12": 0,
      //     "12-3": 0,
      //     "3-6": 0,
      //     "6-9": 0,
      //   },
      // };

      if (mp.has(id)) {
        if (mp.get(id).has(sd_date)) {
          mp.get(id).get(sd_date).count++;
          let str_time = findTimeRange(sd_time);
          mp.get(id).get(sd_date).time[str_time]++;
          console.log("Update map ", mp.get(id));
        } else {
          let obj = {
            count: 0,
            time: {
              "9-12": 0,
              "12-3": 0,
              "3-6": 0,
              "6-9": 0,
            },
          };
          // sd_mp = new Map();
          obj.count++;
          let str_time = findTimeRange(sd_time);
          obj.time[str_time]++;
          // sd_mp.set(sd_date, obj);
          mp.get(id).set(sd_date, obj);
          console.log("newly added ", mp.get(id));
        }
      } else {
        //add the values;
        mp.set(id, new Map());
        //create object
        let obj = {
          count: 0,
          time: {
            "9-12": 0,
            "12-3": 0,
            "3-6": 0,
            "6-9": 0,
          },
        };
        // sd_mp = new Map();
        obj.count++;
        let str_time = findTimeRange(sd_time);
        obj.time[str_time]++;
        // sd_mp.set(sd_date, obj);
        mp.get(id).set(sd_date, obj);
        console.log("first Insertion", mp.get(id));
      }
    }
    // orig_mp stored in mp.
    // need to dispatch it to reducers so as to update orig_mp
    return mp;
  };
  async function fetchData() {
    const response = await fetch("scheduled-date-timing.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    setOrig_mp(findCleanData(data));
    setData(data);
    console.log(orig_mp);
    console.log(orig_data);
    console.log(orig_data[0]);
    return;
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* I will need to pass orig_mp as prop to tableOrig. */}
      Start
      {/* <TableOrig /> */}
    </div>
  );
}

export default Start;
