import React from 'react';
import "../App.css";
import { RxCross2 } from "react-icons/rx";

const form = ({handleSubmit,handleOnChange,handleclose,rest}) => {
  console.log("rest is :",rest)
  return (
    <div className="addContainer">
   
    <form onSubmit={handleSubmit}>
       <div className='close-btn' onClick={handleclose}><RxCross2/></div>
       
       <label>Name : </label>
       <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}/>

       <label>Email : </label>
       <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email}/>

       <label>Mobile : </label>
       <input type="number" id="mobile" name="mobile" onChange={handleOnChange} value={rest.mobile}/>

       <button className="btn">Submit</button>
  </form>
 </div>
  )
}
export default form;