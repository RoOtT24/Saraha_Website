import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const onChange = (e)=>{
        const {value} = e.target
        setEmail(value)
    }

    const submitForm = async (e) =>{
        e.preventDefault()
        if(email && email.length > 8) {
        const {data} = await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/sendCode',{email})
        if(data.message === "success"){
          localStorage.setItem('email',email)
          navigate('/resetcode')
        }
    }
    else 
        toast.warning('please enter your email!');
    
    }
     
  return (
    <div className="container text-center mt-5">
      <div className="user">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">forgetPassword</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        <form onSubmit={submitForm} method="POST" action="/handleLogin">
          <div>
          {/* {
            errors?errors.map( (error,index)=> 
              <div className="alert alert-danger" key={index}>{error}</div>
             ):''
          } */}
          </div>
          <input onChange={onChange}
            className="form-control"
            placeholder="Enter your email"
            type="email"
            name="email"
            value={email}
          />
         <input type="submit" className='btn btn-primary' />
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword