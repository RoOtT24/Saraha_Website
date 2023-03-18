import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from 'react-cookies'
import { toast } from "react-toastify";

const Login = ({logUser}) => {
  const navigate = useNavigate();
  const [errors,setErrors] = useState([])
  const [user, setUser] = useState({
    email:'',
    password:''
  })

  const submitForm = async (e)=>{
    e.preventDefault();
    const errorList = []
    const validation = validateUser()
    if(validation.error){
      // handle error
      validation.error.details.map( (error)=> errorList.push(error.message) )
      setErrors(errorList);
      toast.warn('Login Failed')
    }else {
      // go to backend
      setErrors([]);
      console.log(user)
      const {data} = await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin',user);
      console.log('token = ',data.token)
      if(data.message==="success"){
        // go to Home page and save the cookie
        logUser(data.token)
        const expires = new Date()
        const futureDay = expires.getDate()+1;
        
        expires.setDate(futureDay)
        cookie.save('token' , data.token, {expires});
        toast.success('Welcome :D')
        navigate('/home');

      }else{
        // handle errors
        data.err?.map( (error)=> errorList.push(error[0].message) )
        setErrors(errorList);
        toast.warning('Login Failed')
      }
  
     
    }
  }
  const onChange = (e) => {
    setUser({...user, [e.target.name] : e.target.value});
    //console.log(validateUser())
  }

  const validateUser = ()=>{
    const schema = Joi.object({
      email:Joi.string().required(),
      password:Joi.string().min(3).required()
    });
    return schema.validate(user, {abortEarly:false});
  }

  return (
    <div className="container text-center mt-5">
      <div className="user">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Login</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        <form onSubmit={submitForm} method="POST" action="/handleLogin">
          <div>
          {
            errors?errors.map( (error,index)=> 
              <div className="alert alert-danger" key={index}>{error}</div>
             ):''
          }
          </div>
          <input onChange={onChange}
            className="form-control"
            placeholder="Enter your email"
            type="email"
            name="email"
            // value={user.email}
          />
          <input onChange={onChange}
            className="form-control my-4 "
            placeholder="Enter your Password"
            type="password"
            name="password"
            // value={user.password}
          />
          <button className="btn btn-default-outline my-4 w-100 rounded">
            Login
          </button>
          <p>
            <Link className="text-muted forgot btn" to="/forgetpassword">
              I Forgot My Password
            </Link>
          </p>
          <Link className="btn btn-default-outline" to="/register">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
