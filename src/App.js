import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Components/Home/Home";
import Loader from "./Components/Loader/Loader";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import Register from "./Components/Register/Register";
import UserProfile from "./Components/userProfile/UserProfile";
import cookie from "react-cookies";
import MyProfile from "./Components/MyProfile/MyProfile";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import { ResetPassword } from "./Components/ResetPassword/ResetPassword";
import { ProtectedRoutes } from "./Components/ProtectedRoutes/ProtectedRoutes";
import Footer from "./Components/Footer/Footer";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(cookie.load("token"));

  const getUsers = async () => {
    const { data } = await axios.get(
      "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/getAllUsers"
    );
    setUsers(data);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      {loading ? (
        <Loader />
      ) : (

        <Routes>
              <Route element={<ProtectedRoutes/>}>
              <Route
                path="/user/:id"
                element={<UserProfile users={users} />}
              ></Route>
              <Route path="/" element={<Home users={users}/>}></Route>
              <Route path="/home" element={<Home users={users} />}></Route>
              <Route
                path="/messages"
                element={<MyProfile token={user} users={users} />}
              ></Route>
              </Route>
          
             
              <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
              <Route
                path="/login"
                element={<Login logUser={setUser} />}
              ></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/resetcode" element={<ResetPassword />}></Route>
            
          

          <Route path="/*" element={<PageNotFound />}></Route>
        </Routes>
      )}
      <Footer/>
    </div>
  );
}

export default App;
