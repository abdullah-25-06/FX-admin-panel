// import React, { useState } from "react";

// const ManualDW = () => {
//   const [formData, setFormData] = useState({
//     account: "",
//     display: "disp",
//     amount: "",
//     remark: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Manual D/W Submitted:", formData);
//     alert("Manual D/W Submitted Successfully!");
//   };

//   return (
//     <div className="p-8 w-full">
//       <h2 className="text-2xl font-semibold mb-6">Manual Deposit/Withdraw</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-lg rounded-xl p-6 space-y-6"
//       >
//         {/* Account */}
//         <div>
//           <label className="block font-medium mb-2">Account</label>
//           <input
//             type="text"
//             name="account"
//             value={formData.account}
//             onChange={handleChange}
//             placeholder="Enter account name"
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Display */}
//         <div>
//           <label className="block font-medium mb-2">Whether it is shown</label>
//           <select
//             name="display"
//             value={formData.display}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="disp">disp</option>
//             <option value="hide">hide</option>
//           </select>
//         </div>

//         {/* Operation Amount */}
//         <div>
//           <label className="block font-medium mb-2">Operation Amount</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             placeholder="A positive number is an increase"
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Remark */}
//         <div>
//           <label className="block font-medium mb-2">Remark</label>
//           <input
//             type="text"
//             name="remark"
//             value={formData.remark}
//             onChange={handleChange}
//             placeholder="Please enter a comment"
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ManualDW;
