import axios from 'axios';
import copy from 'copy-to-clipboard';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import findUser from '../../utils/findUser';

export default function UserProfile({users}) {
    const {id} = useParams()
    const [input, setInput] = useState('')
    const [user,setUser] = useState(findUser(users,id))
    // console.log(user)
    // console.log(id)
    const onChange = (e)=>{
        const {value} = e.target
        setInput(value)
    }
    

    const onSubmit = async (e)=>{
        e.preventDefault()
        const result = await axios.post(`https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`,{message: input})

    }

    function shareProfile(e, url) {
      e.preventDefault()
      copy(url)
    }

  return (
    <>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card py-5 mb-5">
          <a href data-toggle="modal" data-target="#profile">
            <img src="/assets/img/avatar.png" className="avatar " alt />
          </a>
          <h3 className="py-2">{user.userName}</h3>
          <div className="container w-50 m-auto">
            <form action method="post" onSubmit={onSubmit}>
              <textarea
                className="form-control"
                name
                id
                cols={10}
                rows={9}
                placeholder="Write Your Message"
                defaultValue={input}
                onChange={onChange}
              />
              <button className="btn btn-outline-info mt-3">
                <i className="far fa-paper-plane" /> Send
              </button>
            </form>
          </div>
        </div>
        
        <button
          data-toggle="modal"
          data-target="#share"
          className="btn btn-default-outline share "
          onClick={(e)=> shareProfile(e, window.location)}
        >
          <i className="fas fa-share-alt" /> Share Profile
        </button>
      </div>
    </>
  );
}
