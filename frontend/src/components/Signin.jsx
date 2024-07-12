import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LabelInput } from './Signup';
import { useAuth } from '../auth/AuthContext';

const Signin = () => {
  const { login } = useAuth();
    const navigate= useNavigate();
    const[email ,setEmail] = useState();
    const[forgotEmail ,setForgotEmail] = useState();
  const[newpassword ,setNewpassword] = useState();
    const[password ,setPassword] = useState();
    const [isForgot,setIsForgot] = useState(false);


    const handleSignin = async() => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/login",{
              email,password
            });
            if(response.status){
                alert("User Logged in Successfully.")
                login(response.data.token);
                navigate("/")
            }
        } catch (error) {
            console.error( error);
            alert("Error occured while signin in.")          
        }
    }
    const handleForgotPassword = async() => {
      try {
        const response = await axios.post("http://localhost:3000/api/v1/user/forgot-password",{
                email,newPassword:newpassword
              });
              if(response.status){
                  alert("User password changed Successfully.")
                  navigate("/signin")
              }
            } catch (error) {
              console.error( error);
              alert("Error occured while changing password.")          
          }
      }
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
                  Welcome Back
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                {!isForgot ?<>
                  <LabelInput type={"email"} label={"Email"} placeholder={"john@example.com"} onChange={(e) => setEmail(e.target.value)} />
                <LabelInput type={"password"} label={"Password"} placeholder={"123456"} onChange={(e) => setPassword(e.target.value)} />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      <button className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => setIsForgot(true)}>Forgot Password ? </button>
                  </p>
                  
                  <button type="submit" className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={handleSignin}>Signin</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don't have an account? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</Link>
                  </p>
                </> : <>   <LabelInput type={"email"} label={"Email"} placeholder={"john@example.com"} onChange={(e) => forgotEmail(e.target.value)} />
                <LabelInput type={"password"} label={"New Password"} placeholder={"123456"} onChange={(e) => setNewpassword(e.target.value)} />
            
                  
                  <button type="submit" className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={handleForgotPassword}>Submit</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Have an account? <button to="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500"  onClick={() => setIsForgot(false)}>Login here</button>
                  </p>
                </>}
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Signin

