import React from 'react';
import "./form.css"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RxCross2 } from "react-icons/rx";

const Form = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
  console.log("rest is :", rest);
  
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className='close-btn' onClick={handleClose}><RxCross2/></div>
        
        <label>Name : </label>
        <input type="text" id="name" name="name" onChange={handleOnChange} value={rest.name}/>

        <label>Email : </label>
        <input type="email" id="email" name="email" onChange={handleOnChange} value={rest.email}/>

        <label>Mobile : </label>
        <input type="number" id="mobile" name="mobile" onChange={handleOnChange} value={rest.mobile}/>

        <label>DOB : </label>
        <DatePicker
          id="dob"
          name="dob"
          selected={rest.dob ? new Date(rest.dob) : null}
          onChange={(date) => handleOnChange({ target: { name: "dob", value: date } })}
          dateFormat="yyyy-MM-dd"
        />
        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Form;
