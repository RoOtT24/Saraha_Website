import React from 'react'

export default function CustomeInput({text, type, name, onChange, error}) {
    
  return (
    <>
    <input onChange={onChange}
    className="form-control mt-4"
    placeholder={text}
    type={type}
    name={name}
  />
  {
    error? <div className='alert alert-danger'>{error.details[0].message.replace('"value"', name)}</div>:''
  }
  </>
  )
}
