import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import {TfiCommentsSmiley} from 'react-icons/tfi'
import {AiFillHeart ,AiFillDelete} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate, useParams } from 'react-router-dom'
function PostD() {
  
  const navigate = useNavigate()
  const getUserName = ()=>{
      const email = post.user.email
      const username = email.substring(0,email.length-10)
      return username;
  }
  const [post , setPost] = useState(null)
  const params = useParams();
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch({type: 'showloading'})
   getDoc(doc(db,'posts' , params.id)).then((res)=>{
    setPost({...res.data() , id: res.id})
    dispatch({type: 'hideloading'})
   }).catch(()=>{
    dispatch({type: 'hideloading'})
   })
  },[])
  return (
    <DefaultLayout>
    {
      post &&(
       <div className='flex justify-center w-full'>
       <div onClick={()=>navigate(`post/${post.id}`)} className='cursor-pointer'>
    <div className='flex flex-col gap-4 max-w-sm rounded-3xl overflow-hidden shadow-2xl border-y-light-gray border-y-8 p-4'>
    <div className='flex items-center'>
    <span className='h-8 w-8 text-center rounded-full bg-gray mr-3 text-xl '>{getUserName()[0]}</span>
  <span className='text-gray'>{getUserName()}</span>
    </div>
    <div className='w-full text-center flex flex-col gap-4 max-w-sm overflow-hidden shadow-2xl '>
    <img src={post.imageURL} alt=""  className=' w-[500px] max-h-[500px]'/>
    </div>
    <div className='p-2 flex text-light-gray text-xl justify-between items-center'>
    <div className='flex items-center gap-2'>
    <AiFillHeart/>
    <h1>{post.likes.length}</h1>
    </div>
 <div  className='flex items-center gap-2'>
 <TfiCommentsSmiley/>
 <h1>{post.comments.length}</h1>
 </div>
  <AiFillDelete/>
    </div>
    </div>
    </div>
       </div>
      )
    }
    </DefaultLayout>
  )
}

export default  PostD