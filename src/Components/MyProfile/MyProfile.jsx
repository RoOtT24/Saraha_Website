import axios from "axios";
import copy from "copy-to-clipboard";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import findUser from "../../utils/findUser";
import styles from './MyProfile.module.css'

export default function MyProfile({ token, users }) {
  const [profileUser, setProfileUser] = useState({});
  const [messages, setMessages]= useState([])

  const getUser = () => {
    const decoded = jwtDecode(token);
    setProfileUser(findUser(users, decoded.id));
  };

  function shareProfile(e, url) {
    e.preventDefault()
    copy(url)
  }

  const getMessages = async () => {
    const tokenApi = `tariq__${token}`
    const {data} = await axios.get(`https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/messages`,{headers: {token:tokenApi}})
    if(data.message === 'success')
        setMessages(data.messages)
    else {
            
        }
  }

  useEffect(() => {
   getUser()
   getMessages()
  }, []);
  return (
    <>
      <div>
        <div className="container text-center py-5 my-5 text-center">
          <div className="card pt-5">
            <a href data-toggle="modal" data-target="#profile">
              <img src="/assets/img/avatar.png" className="avatar " alt />
            </a>
            <h3 className="py-2">{profileUser.userName}</h3>
            <button
              data-toggle="modal"
              data-target="#share"
              className="btn btn-default-outline share "
              onClick={(e) => shareProfile(e, `https://sarahaapp.netlify.app/user/${profileUser._id}`)} // link needs to be updated
            >
              <i className="fas fa-share-alt" /> Share Profile
            </button>
          </div>
        </div>
        {/* profile photo Modal */}
        <div
          className="modal fade"
          id="profile"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Change photo
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              {/* <div className="modal-body">
                <div className="container">
                  <form action method="post">
                    <label htmlFor className="text-muted">
                      The file size of the photo should not exceed 7 MB
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      name="photo"
                      id
                    />
                  </form>
                </div>
              </div> */}
              {/* <div className="modal-footer">
                <button type="button" className="btn btn-outline-info">
                  Upload
                </button>
                <button type="button" className="btn btn-outline-danger">
                  Remove Photo
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center my-5 text-center">
       
           
                {
                    messages.length == 0?
                    <div className="row">
                    <div className="col-md-12">
                    <div className="card py-5">
                         <p>You don't have any messages... </p>
                         </div>
                         </div>
                 </div>
                         :
                        messages.map( (message, index)=>{
                            <div className="row" key = {index}>
                            <div className="col-md-12">
                            <div className="card py-5">
                                <p>{message}</p>
                                <div className={styles.deleteButton}><i class="fa-solid fa-trash"></i></div>
                            </div>
                            </div>
                         </div>
                        } )
                }
             
            
        
      </div>
    </>
  );
}
