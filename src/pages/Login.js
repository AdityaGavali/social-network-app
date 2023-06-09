import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
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
        navigate('/')
        toast.success("Login Successfull")
      })
      dispatch({type:'hideloading'})   
      navigate('/')

    })
    .catch((error) => {
      toast.error("Login Failed")
      dispatch({type:'hideloading'})
    });
 
  
  }
  useEffect(()=>{
    if(localStorage.getItem("SocialXpress")){
      navigate('/')
    }
  })
  return (
    <div className='h-screen flex justify-center md:flex-col flex-row gap-10 items-center bg-default-layout-bg '>
    {loading && <Loader/>}
    <div>
      <h1 className='text-gold font-bold text-4xl font-serif text-center '>SocialXpress</h1>
      <h3 className='mr-6 text-2xl text-secondary text-center animate-pulse font-serif'>Your Social World in One Place</h3>

    </div>
   <div className='w-96 flex flex-col gap-4 max-w-sm rounded-3xl overflow-hidden shadow-2xl border-y-light-gray border-y-8 p-4 '>
    <h1 className='font-serif  text-2xl text-gray text-center items-center'>Welcome 📸 </h1>
    <hr className='mb-5' />
    <input type="text" placeholder='Email'  value={email} onChange={(e)=>{setemail(e.target.value)}} className=' pl-5 border-2 h-10 focus:border-primary rounded-sm bg-gray '/>
    <input type="password" placeholder='Password'  value={password} onChange={(e)=>{setpassword(e.target.value)}} className='pl-5 border-2 h-10 focus:border-primary rounded-sm bg-gray '/>
    <div className='flex justify-center'>
      
      <Button className=' bg-bg text-secondary w-28 h-10' onClick={login}>LOGIN</Button>
     
    </div>
    <hr />
   <Link to='/signup' className='font-serif text-gray'>Don't have an account? Register</Link>
   </div>
    </div>
  )
}

export default Login