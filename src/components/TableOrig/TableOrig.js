// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// // import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import Table from "react-bootstrap/Table";
// function TableOrig({ orig_data }) {
//   // const orig_data = useSelector(
//   //   (state) => state.operationOnDataReducer.orig_data
//   // );
//   console.log(orig_data);
//   const col = Object.keys(orig_data[0]);
//   //table heading
//   const thData = () => {
//     return col.map((data) => {
//       return <th key={data}>{data}</th>;
//     });
//   };
//   //get row data
//   const tdData = () => {
//     return orig_data.map((data) => {
//       return (
//         <tr>
//           {col.map((i) => {
//             return <td>{data[i]}</td>;
//           })}
//         </tr>
//       );
//     });
//   };
//   return (
//     <>
//       <Table stripped bordered hover>
//         <thead>
//           <tr>{thData()}</tr>
//         </thead>
//         <tbody>{tdData()}</tbody>
//       </Table>
//     </>
//   );
// }

// export default TableOrig;
