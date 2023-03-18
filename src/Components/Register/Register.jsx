import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomeInput from '../Common/CustomeInput';

function Register() {
  const [user, setUser] = useState({
    name:'',
    email:'',
    password:'',
    cPassword:'',
  })
  const [errors,setErrors] = useState({
    name:'',
    email:'',
    password:'',
    cPassword:'',
  });

  const [valid,setValid] = useState(false)
  const navigate = useNavigate()
  const schema = Joi.object({
      email:Joi.string().required(),
      password:Joi.string().min(3).required(),
      name:Joi.string().min(3).max(30).required(),
      cPassword:Joi.any().valid(user.password).required().messages({
        "any.only":"Does not match password"
        })
    });

    const validateInput = (input, inputSchema)=> {
      return inputSchema.validate(input);
    }
    

  const onChange = (e)=> {
    const {name, value} = e.target;
    setUser( {...user, [name]:value} );
    const validation =  validateInput(value, schema.extract(name));
    if(validation.error){
      // handle errors
      setErrors({...errors, [name] : validation.error});
    }
    else {
      let error = {...errors};
      delete error[name] 
      setErrors({...error})
  }

}

  const submitForm = async (e)=> {
    e.preventDefault();
    if(Object.keys(errors).length ===0){
      const {data} = await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup',user);
      if(data.message === 'success'){
        toast.success('Registered Successfully, Please Confirm Your Email!')
        navigate('/login')
      }else{
        // handle errors
        console.log( data.err[0][0].path[0] )
        console.log(data.err[0][0].message)
 
        const value = data.err[0][0].message ;
        setErrors({...errors , [data.err[0][0].path[0]]:value});
      }
    }
  }

  useEffect(() => {
    if(Object.keys(errors).length === 0)
    setValid(true)
    else
    setValid(false)
  }, [errors]);

  return (
    <div className="container text-center mt-5">
    <div className="user">
      <i className="fas fa-user-secret user-icon" />
      <h4 className="login">Register</h4>
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
        <CustomeInput error={errors.name} name='name' text='Enter Your Name' type='text' onChange={onChange}/>
        <CustomeInput error={errors.email} name='email' text='Enter Your Email' type='email' onChange={onChange}/>
        <CustomeInput error={errors.password} name="password" text='Enter Your Password' type="password" onChange={onChange}/>
        <CustomeInput error={errors.cPassword} name="cPassword" text="Confirm Your Password" type="password" onChange={onChange}/>
        {

        }
        {
       valid?<button className="btn btn-default-outline mt-4 w-100 rounded submit">
          Register
        </button>:<button className="btn btn-default-outline mt-4 w-100 rounded submit disabled">
          Register
        </button>
}
       
      </form>
    </div>
  </div>
  );
}

export default Register;