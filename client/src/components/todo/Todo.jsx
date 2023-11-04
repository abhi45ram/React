import React, { useEffect, useState } from 'react'
import './Todo.css';
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { authActions } from '../../store';
let id = sessionStorage.getItem("id");
const Todo = () => {
    const [Inputs , setInputs] = useState({title: "",body: ""});
    const [Array , setArray] = useState([]);

   
    

    const show = () => {   
        document.getElementById("textarea").style.display = "block";
    };
    const change = (e) => {
        const {name,value} = e.target;
        setInputs({...Inputs , [name]:value});
    };
    const submit = async() =>{
      if(Inputs.title === "" || Inputs.body === ""){
            toast.error("Title or Body Should Not be Empty");
        }else{
            if (id){
              await axios.post("http://localhost:3000/api/v2/addTask",{title:Inputs.title,body:Inputs.body,id:id}).then((response) =>{
                console.log(response);
              });
              
              setInputs({title: "", body: ""});
              toast.success("Your Task is Added");
              
            }
            else{
                setArray([...Array,Inputs]);
                setInputs({title: "", body: ""});
                toast.success("Your Task is Added");
                toast.error("Your Task is Not saved! Please Sign Up");
            }
           
        }
       
    }
    const del = (id) => {
        Array.splice(id , "1");
        setArray([...Array]);
    }
    const dis = (value) => {

        document.getElementById("todo-update").style.display = value;
    };
    useEffect(() => {
        const fetch = async () => {
          await axios.get(`http://localhost:3000/api/v2/getTasks/${id}`).then((response) =>{
             setArray(response.data.list);
          })
        };
      
       fetch();
      }, []);

  return (
    <>
    <div className='todo'>
        <ToastContainer/>
        <div className='todo-main container d-flex justify-content-center align-items-center my-4 flex-column'>
            <div className='d-flex flex-column todo-inputs-div w-50'>
                <input 
                type='text'
                placeholder='Title'
                className='my-2 p-2 todo-inputs'
                onClick={show}
                name='title'
                value={Inputs.title}
                onChange={change}
                />
                <textarea 
                id='textarea'
                type="text"
                placeholder='BODY'
                name='body'
                value={Inputs.body}
                onChange={change}
                className='p-2 todo-inputs'/>
                
            </div>
           <div className='w-50 d-flex justify-content-end my-3'>
           <button className='home-btn px-2 py-1' onClick={submit}>Add</button>
           </div>
        </div>
        <div className='todo-body'>
            <div className='container-fluid'>
                <div className='row '>
                {Array && Array.map((item , index) =>(
                    <div className='col-lg-3 col-10 mx-5 my-2' key={index}> <TodoCards title={item.title} body={item.body} id={index} delid={del} display={dis}/> </div>
                    ))}
                </div>
                
            </div>
        </div>
    </div>
    <div className='todo-update' id='todo-update'>
        <div className='container update'><Update display={dis}/></div>
        </div>


    </>
  )
}

export default Todo