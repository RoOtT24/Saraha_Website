import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const ResetPassword = () => {
    const navigate = useNavigate()
    const [input,setInput] = useState({
        newPassword:'',
        code:''
    })
    
    const submitForm = async (e)=>{
        e.preventDefault()
        const email = localStorage.getItem('email')
        console.log("input => ",{...input,email})
        const {data} = await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/forgetPassword',{...input,email})
        console.log("data => ",data)
        if(data.message === 'success'){
            toast.success('Sign In With The New Password')
            localStorage.removeItem('email')
            navigate('/login')
        }
        else{
            toast.warning('Invalid Input, try again!')
        }
    }
    const onChange = (e)=>{
        const {name, value} = e.target
        setInput({...input , [name]:value})
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
        {

        }
        </div>
        <input onChange={onChange}
          className="form-control"
          placeholder="Enter The Code"
          type="text"
          name="code"
          value={input.code}
        />
        <input onChange={onChange}
          className="form-control my-4 "
          placeholder="Enter Your New Password"
          type="password"
          name='newPassword'
        />
      <input type="submit" className='btn btn-primary' />
      </form>
    </div>
  </div>
  )
}
