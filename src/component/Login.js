import React, { useState, useEffect } from "react";
import axios from "axios";
import { userLogin } from "../apis/users-api";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Smallloader from "./Smallloader";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const logindata = await userLogin(email, password);
      if (logindata?.success) {
        const token = logindata.authtoken;
        localStorage.setItem("token", token);
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md my-6 mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Login to PostMingle
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          {loading ? <Smallloader /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
