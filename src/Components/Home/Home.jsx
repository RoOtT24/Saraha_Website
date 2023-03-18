import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pagination from "../../utils/pagination";
import { Pagination } from "../Pagination/Pagination";
import './Home.css'


export const Home = ({ users }) => {
  const [results,setResults] = useState(users)
  const navigate = useNavigate()
  const [pageInfo, setPageInfo] = useState({
    pageNumber:0,
    pageSize:15,
  })

  const changePageNumber = (page)=>{
    setPageInfo({...pageInfo, pageNumber:page})
  }
  const onChange = (e)=> {
    const {value} = e.target
    let arr = []
    users.map( (usr)=>{
      if(usr.userName.toLowerCase().includes(value.toLowerCase()))
        arr.push(usr)
    })
    setResults(arr)
    setPageInfo({...pageInfo , pageNumber:0})
  }


  return (
    <div className="container text-center d-flex flex-column align-items-center">
    <input type="search" className="form-control mt-4 mb-2" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={onChange}/>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {pagination(results, pageInfo.pageNumber, pageInfo.pageSize ).map((usr, index) => (
            <tr key={usr._id} className="py-5">
              <th scope="row">{index+(pageInfo.pageNumber*pageInfo.pageSize) + 1}</th>
              <td>{usr.userName}</td>
              <td>
                <button onClick={()=>{ navigate(`/user/${usr._id}`)}}>
                  Send Message <i className="fa-regular fa-paper-plane"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination users={results} {...pageInfo} changePageNumber={changePageNumber}/>
    </div>
  );
};
