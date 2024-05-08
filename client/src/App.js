import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import Form from "./component/form.js"
axios.defaults.baseURL="http://localhost:3000/"


function App() {
  const [addSection,setAddSection]=useState(false);
  const [editSection,setEditSection]=useState(false);
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    mobile:"",
    dob:"",
  })
  const [formDataEdit,setFormDataEdit]=useState({
    name:"",
    email:"",
    mobile:"",
    dob:"",
    _id:""
  })

  //array to store the list of data fetched from the server
  const [dataList,setDataList]=useState([]);

  const handleOnChange=(e)=>{
    const {value,name}=e.target
    setFormData((prev)=>{
      return{
        //spread operator to copy previous state
        ...prev,
        [name]:value
      }
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const data=await axios.post("/create",formData)
    console.log(data);
    if(data.data.success)
    {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      setFormData({
        name:"",
        email:"",
        mobile:"",
        dob:"",
      })
    }
  }

  const getFetchData = async()=>{
    const data=await axios.get("/")
    console.log(data);
    if(data.data.success)
    {
      setDataList(data.data.data)
    }

  }
  useEffect(()=>{
    getFetchData()
  },[])

  const handleDelete=async(id)=>{
    const data=await axios.delete("/delete/"+id)
   if(data.data.success)
   {
    getFetchData();
     alert(data.data.message);
   }
  }
  const handleUpdate=async(e)=>{
  e.preventDefault()
  const data=await axios.put("/update",formDataEdit)
  if(data.data.success)
  {
   getFetchData();
    alert(data.data.message);
    setEditSection(false);
  }

  }
  const handleEditOnChange=async(e)=>{

    const {value,name}=e.target
    setFormDataEdit((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }
  const handleEdit=(el)=>{
    setFormDataEdit(el);
    console.log("el is:",el)
    setEditSection(true);
  }
  return (
    <>
    <div className="container">
   <button className="btn add-btn" onClick={()=>{setAddSection(true)}}>ADD</button>
   {
    addSection && (
    <Form 
    handleSubmit={handleSubmit}
    handleOnChange={handleOnChange}
    handleclose={()=>setAddSection(false)}
    rest={formData}
    />

    )
   }
   {
    editSection && (
      <Form 
    handleSubmit={handleUpdate}
    handleOnChange={handleEditOnChange}
    handleclose={()=>setEditSection(false)}
    rest={formDataEdit}
    />
    )
   }
   <div className='tableContainer'>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile Number</th>
          <th>Date of Birth</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {dataList[0]?(
          dataList.map((e1)=>{
            console.log(e1);
            //here i formatted the date to show only date//month/year only not time
            // Parse the date string from the backend and create a Date object
            const dateObject = new Date(e1.dob);

            // Convert the date to local time zone and format it as YYYY-MM-DD
            const formattedDate = dateObject.toLocaleDateString('en-GB', {
                 year: 'numeric',
                 month: '2-digit',
                 day: '2-digit'
            });
    
            return (
              <tr>
                <td>{e1.name}</td>
                <td>{e1.email}</td>
                <td>{e1.mobile}</td>
                <td>{formattedDate}</td>
                <td>
                <button className='btn btn-edit'onClick={()=>{setEditSection(true)
                setFormDataEdit(e1)}}>Edit</button>
                <button className='btn btn-delete' onClick={()=>handleDelete(e1._id)}>Delete</button>
                </td>
              </tr>
            )
          })):(
            <p style={{textAlign:"center"}}>No Data</p>
          )
        }
      </tbody>
    </table>
   </div>
  

    </div>
    </>
  );
}

export default App;
