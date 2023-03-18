import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css'


export const Home = ({ users }) => {
  const [results,setResults] = useState(users)
  const navigate = useNavigate()

  const onChange = (e)=> {
    const {value} = e.target
    let arr = []
    users.map( (usr)=>{
      if(usr.userName.toLowerCase().includes(value.toLowerCase()))
        arr.push(usr)
    })
    setResults(arr)
  }


  useEffect(() => {
    console.log(users);
  }, [users]);
  return (
    <div className="container text-center">
    <input type="search" className="form-control mt-4 mb-2" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={onChange}/>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {results.map((usr, index) => (
            <tr key={usr._id} className="py-5">
              <th scope="row">{index + 1}</th>
              <td>{usr.userName}</td>
              <td>
                <button onClick={()=>{ navigate(`/user/${usr._id}`)}}>
                  Send Message <i class="fa-regular fa-paper-plane"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
