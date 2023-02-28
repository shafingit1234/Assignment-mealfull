import { createSlice } from "@reduxjs/toolkit";
const operationOnDataSlice = createSlice({
  name: "data-fetch-Slice",
  initialState: {
    orig_mp: new Map(),
    schd_list: [],
    schd_time: [],
    orig_data: new Object(),
  },
  reducers: {
    getData: (state, action) => {
      state.orig_data = action.payload;
    },
    //reducer to update orig_mp at the time of loading.
    updateMap: (state, action) => {
      state.orig_mp = action.payload;
    },
    //reducer to fetch schedule_date and count pair with only
    fetchSchedulePair: (state, action) => {
      //this time action will store query(item_date).
      state.schd_list = [];
      let list = state.orig_mp.get(action.payload).keys;
      for (const schd_id of list) {
        let obj = {
          schd_date: schd_id,
          count: state.orig_mp.get(action.payload).get(schd_id).count,
        };
        state.schd_list.push(obj);
      }
    },
    fetchTimePair: (state, action) => {
      //reducer to fetch time, and schedules in that period of time.
      // this time action will consist of item_date and schedule_date clicked by user.
      state.schd_time = [];
      let list = state.orig_mp
        .get(action.payload.item_date)
        .get(action.payload.schedule_date).time;
      let obj = {
        time: "",
        count: 0,
      };
      if (list["9-12"] !== 0) {
        obj.time = "9am to 12am";
        obj.count = list["9-12"];
        state.schd_time.push(obj);
      }
      if (list["12-3"] !== 0) {
        obj.time = "12am to 3pm";
        obj.count = list["12-3"];
        state.schd_time.push(obj);
      }
      if (list["3-6"] !== 0) {
        obj.time = "3pm to 6pm";
        obj.count = list["3-6"];
        state.schd_time.push(obj);
      }
      if (list["6-9"] !== 0) {
        obj.time = "6pm to 9pm";
        obj.count = list["6-9"];
        state.schd_time.push(obj);
      }
    },
  },
});

//export actions
export const { updateMap, fetchSchedulePair, fetchTimePair, getData } =
  operationOnDataSlice.actions;
// export const {}
export default operationOnDataSlice.reducer;
