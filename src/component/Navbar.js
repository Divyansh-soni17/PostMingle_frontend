import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate =useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
      <div className="flex justify-between bg-blue-400 p-3 md:p-4 items-center">
        <Link to="/" className="font-bold text-red-500 md:text-2xl">PostMingle</Link>
        
        {!localStorage.getItem("token") ? (
          <div className="flex space-x-2">
            <Link to='login' className="bg-green-400 px-2 py-1 rounded-lg md:px-4 md:py-3 md:text-white">
              Login
            </Link>
            <Link to='signup' className="bg-green-400 px-2 py-1 rounded-lg md:px-4 md:py-3 md:text-white">
              Signup
            </Link>
          </div>
        ) : (
          <button onClick={handleLogout}  className="bg-green-400 px-2 py-1 rounded-lg md:px-4 md:py-3 md:text-white">
            Logout
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
