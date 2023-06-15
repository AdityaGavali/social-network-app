import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import { Button } from 'antd';
import {  doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
function Signup() {
  const {loading} = useSelector(store=>store)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email , setemail] = useState('');
  const [password , setpassword] = useState('');
  const [confirmpassword , setconfirmpassword] = useState('');
  const register = async()=>{  
    dispatch({type:'showloading'})
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      const userData = {
        email : user.email,
        profilepicUrl : '',
        About : 'Hi there , I am using SocialXpress'
         
      }
      
      setDoc(doc(db,'users' , user.uid) , userData)
      dispatch({type:'hideloading'})
      toast.success("Registration Successfull")
      navigate('/login')
    })
    .catch((error) => {
      toast.error('Something went wrong (you might have account with this credentials)')
      console.log(error);
      dispatch({type:'hideloading'})
    });
 
  
  }
  useEffect(()=>{
    if(localStorage.getItem("SocialXpress")){
      navigate('/')
    }
  })
  return (
    <div className='h-screen text-center flex md:flex-col justify-center flex-row gap-6 items-center bg-default-layout-bg'>
   {loading && <Loader/>}
   <div>
   <h1 className='text-gold font-bold text-4xl text-center font-serif '>SocialXpress</h1>
      <h3 className='mr-6 text-2xl text-secondary text-center animate-pulse font-serif'>Your Social World in One Place</h3>
     </div>
   <div className='w-96 flex flex-col gap-4 card  max-w-md rounded-2xl overflow-hidden shadow-2xl border-y-light-gray border-y-8 p-4'>
   <h1 className='font-serif text-2xl text-gray'>Let's Start 🚀 </h1>
    <hr className='mb-5' />
    <input type="text" placeholder='Email' value={email} onChange={(e)=>{setemail(e.target.value)}} className=' pl-5 border-2 h-10 focus:border-primary rounded-sm bg-gray '/>
    <input type="password" placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}} className='pl-5 border-2 h-10 focus:border-primary rounded-sm bg-gray'/>
    <input type="password" placeholder='Confirm Password'value={confirmpassword} onChange={(e)=>{setconfirmpassword(e.target.value)}}  className='pl-5 border-2 h-10 focus:border-primary rounded-sm bg-gray '/>
    <div className='flex justify-center'>
     
      <Button className=' bg-bg text-secondary w-28 h-10' onClick={register}>REGISTER</Button>
    </div>
    <hr />

   <Link to='/login' className='font-serif text-left text-gray'>Already have an account? Login</Link>
   
   </div>
   
    </div>
  )
}

export default Signup