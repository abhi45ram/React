import React, { useState } from 'react'
import './SignUp.css';
import HeaderComp from './HeaderComp';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
const Signup = () => {
    const  history = useNavigate();
    const [Inputs , setInputs] = useState({
        email: "",
        username: "",
        password: "",
    });
    const change  = (e) => {
      const {name , value } = e.target;
      setInputs({...Inputs , [name]: value});
    }
    const submit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/api/v1/register",Inputs).then((response) =>  {
            if(response.data.message === "User AlReady Exits"){
                alert(response.data.message);
            }else{
                alert(response.data.message);
                setInputs({
                    email: "",
                    username: "",
                    password: "",
                });
                history('/Signin');
            }
                 
        })       
    }
        return (
        <div className='signup'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6 column d-flex justify-content-center align-items-center '>
                        <div className='d-flex flex-column w-100 p-5'>
                        <div className='login d-flex justify-content-center align-items-center'><b>Sign Up</b></div>

                            <input className="p-2 my-3 input-signup" type='email' name="email" placeholder='Enter Your Email'onChange={change} 
                             value={Inputs.email}
                            />

                            <input className="p-2 my-3 input-signup" type='username' name="username" placeholder='Enter Your username'
                            onChange={change} value={Inputs.username}
                            />

                            <input className="p-2 my-3 input-signup " type='password' name="password" placeholder='Enter Your password ' onChange={change}
                             value={Inputs.password}
                            />
                            <button className='btn-signup p-2' onClick={submit}>SignUp</button>

                        </div>
                    </div>
                    <div className='col-lg-5 column col-left d-flex justify-content-center align-items-center ' style={{ height: "100vh" }}>
                     <HeaderComp first="Sign" second="Up"></HeaderComp>
                        {/* <div className="text-center sign-up-heading">
                            <img src="https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_960_720.png" alt="Sign Up" />
                        </div> */}
                        {/* <h1 className='text-center sign-up-heading'>
                            Sign <br /> Up
                        </h1> */}

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Signup