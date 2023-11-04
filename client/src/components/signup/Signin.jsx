import React, { useState } from 'react'
import './SignUp.css';
import HeaderComp from './HeaderComp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';


const Signin = () => {
    const dispatch = useDispatch();
    const history = useNavigate
    const [Inputs , setInputs] = useState({
        email: "",
       
        password: "",
    });
    const change  = (e) => {
        const {name , value } = e.target;
        setInputs({...Inputs , [name]: value});
      }
      const submit = async (e) => {
          e.preventDefault();
          await axios.post("http://localhost:3000/api/v1/signin",Inputs).then((response) =>  {
                            
            sessionStorage.setItem("id",response.data.others._id);
            dispatch(authActions.login());
             history("/Todo")     
          }) ;      
        };
  return (
    <div className='signup'>
            <div className='container'>
                <div className='row'>
                <div className='col-lg-5 column col-left d-flex justify-content-center align-items-center ' style={{ height: "100vh" }}>
                     <HeaderComp first="Sign" second="In"></HeaderComp></div>
                    <div className='col-lg-6 column d-flex justify-content-center align-items-center '>
                        <div className='d-flex flex-column w-100 p-5'>
                         <div className='login d-flex justify-content-center align-items-center'><b>Sign In</b></div>
                            <input className="p-2 my-3 input-signup" type='email' name="email" placeholder='Enter Your Email' 
                           value={Inputs.email}
                           onChange={change}
                            />

                            <input className="p-2 my-3 input-signup " type='password' name="password" placeholder='Enter Your password '  value={Inputs.password} onChange={change}/>
                            <button className='btn-signup p-2' onClick={submit}>SignIn</button>

                        </div>
                    </div>
                    
                       

                    
                </div>
            </div>
        </div>
  )
}

export default Signin