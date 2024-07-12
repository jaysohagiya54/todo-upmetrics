import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate= useNavigate();
    const[name ,setName] = useState();
    const[email ,setEmail] = useState();
    const[password ,setPassword] = useState();
    const handleSignup = async() => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/register",{
                name,email,password
            });
            if(response.status){
                alert("User registered Successfully.")
                navigate("/signin")
            }
        } catch (error) {
            console.error( error);
            alert("Error occured while signing up.")          
        }
    }
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                <LabelInput type={"text"} label={"Name"} placeholder={"John Doe"} onChange={(e) => setName(e.target.value)} />
                <LabelInput type={"email"} label={"Email"} placeholder={"john@example.com"} onChange={(e) => setEmail(e.target.value)} />
                <LabelInput type={"password"} label={"Password"} placeholder={"123456"} onChange={(e) => setPassword(e.target.value)} />

                  
                  <button type="submit" className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={handleSignup}>Signup</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link to="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Signup

export const LabelInput = ({label,type,onChange,placeholder}) => {
    return (
        <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input type={type} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder={placeholder} required=""  />
    </div>
    )
}