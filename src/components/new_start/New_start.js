import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import {
  fetchSchedulePair,
  fetchTimePair,
} from "../../redux/slices/operationOnDataSlice";
import { useNavigate } from "react-router-dom";

function New_start() {
  const [data, setData] = useState([]);
  const [col, setCol] = useState([]);
  const [query, setQuery] = useState("");
  const [data_map, setMp] = useState("");
  const dispatch = useDispatch("");
  const navigate = useNavigate();
  const thData = () => {
    return col.map((d) => {
      return <th key={d}>{d}</th>;
    });
  };
  const tdData = () => {
    return data.map((e) => {
      //   console.log(e);
      return (
        <tr>
          {col.map((i) => {
            // console.log(e[i]);
            return <td>{e[i]}</td>;
          })}
        </tr>
      );
    });
  };
  //creating a map
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
      //   console.log("sd_date", sd_date);
      //   console.log("sd_time", sd_time);
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
          //   console.log("Update map ", mp.get(id));
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
          //   console.log("newly added ", mp.get(id));
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
        // console.log("id ", typeof id);
        // console.log("first Insertion", mp.get(id));
      }
    }
    // orig_mp stored in mp.
    // need to dispatch it to reducers so as to update orig_mp
    return mp;
    // setMp(mp);
    // console.log("This is the map ", data_map);
  };
  useEffect(() => {
    fetch("scheduled-date-timing.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((actualData) => {
        setData(actualData);
        // console.log(actualData);
        setCol(Object.keys(actualData[0]));
        let ans = findCleanData(actualData);
        // console.log(ans);

        // console.log(ans.keys());
        // console.log(ans.get('"2021-05-19"').get("2021-05-18"));
        setMp(ans);
        console.log("this is a map", ans);
        //call function to create table.
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const navToOtherTable = () => {
    //find other table to work with.
    //clean the data, convert it to map, then dispatch an action to
    //store list of schedule_date and counts.
    //get the query fetch the list and count.
    // console.log("this is the query ", typeof query);
    // console.log(query);
    // console.log("Updated Query", data_map.get(query));
    // console.log(data_map);
    let schd_list = [];
    let schd_time = [];
    let list = data_map.get(query).keys();
    for (const schd_id of list) {
      let obj = {
        schd_date: schd_id,
        count: data_map.get(query).get(schd_id).count,
      };
      let obj2 = {
        schd_date: schd_id,
        nineToTwelve: data_map.get(query).get(schd_id).time["9-12"],
        TwelveToThree: data_map.get(query).get(schd_id).time["12-3"],
        ThreeToSix: data_map.get(query).get(schd_id).time["3-6"],
        SixToNine: data_map.get(query).get(schd_id).time["6-9"],
      };
      console.log("This is obj1", obj);
      console.log("this is id ", schd_id);
      schd_list.push(obj);
      console.log("this is obj2 ", obj2);
      schd_time.push(obj2);
    }
    // console.log(schd_list);

    dispatch(fetchSchedulePair(schd_list));
    dispatch(fetchTimePair(schd_time));
    navigate("/fetchPair", { replace: true });
  };
  return (
    <>
      <Form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          navToOtherTable();
        }}
      >
        <input
          type="text"
          name="query"
          id="query"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button>Submit</Button>
      </Form>
      <Table stripped bordered hover>
        <thead>
          <tr>{thData()}</tr>
        </thead>
        <tbody>{tdData()}</tbody>
      </Table>
    </>
  );
}

export default New_start;
