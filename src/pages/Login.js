import { Button } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth ,db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
function Login() {
  const {loading} = useSelector(store=>store)
  const navigate = useNavigate();
  const dispatch = useDispatch()
    const [email , setemail] = useState('');
  const [password , setpassword] = useState('');
  const login = async()=>{  
    dispatch({type:'showloading'})
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    
      const user = userCredential.user;
     getDoc(doc(db,'users' , user.uid))
      .then((user) =>{
        localStorage.setItem('SocialXpress' , JSON.stringify({...user.data(), id  : user.id}))
        toast.success("Login Successfull")
      })
      dispatch({type:'hideloading'})   
      navigate('/home')

    })
    .catch((error) => {
      toast.error("Login Failed")
      dispatch({type:'hideloading'})
    });
 
  
  }
  return (
    <div className='h-screen flex justify-center flex-col lg:flex-row gap-10 items-center  bg-gray '>
    {loading && <Loader/>}
    <div>
      <h1 className='text-primary font-bold text-4xl font-serif text-center '>SocialXpress</h1>
      <h3 className='mr-6 text-2xl text-center animate-pulse font-serif'>Your Social World in One Place</h3>

    </div>
   <div className='w-96 flex flex-col gap-4 max-w-sm rounded overflow-hidden shadow-lg p-4 bg-secondary '>
    <h1 className='font-serif text-2xl'>Enter Your credentials here</h1>
    <hr className='mb-5' />
    <input type="text" placeholder='Email'  value={email} onChange={(e)=>{setemail(e.target.value)}} className=' pl-5 border-2 h-10 focus:border-primary rounded-sm '/>
    <input type="password" placeholder='Password'  value={password} onChange={(e)=>{setpassword(e.target.value)}} className='pl-5 border-2 h-10 focus:border-primary rounded-sm '/>
    <div className='flex justify-center'>
      
      <Button className=' bg-primary text-secondary w-28 h-10' onClick={login}>Login</Button>
     
    </div>
    <hr />
   <Link to='/signup' className='font-serif'>Don't have an account? Sign up</Link>
   </div>
    </div>
  )
}

export default Login