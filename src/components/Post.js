import React from 'react'
import {TfiCommentsSmiley} from 'react-icons/tfi'
import {AiFillHeart ,AiFillDelete} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
function Post({post}) {
    const navigate = useNavigate()
    const getUserName = ()=>{
        const email = post.user.email
        const username = email.substring(0,email.length-10)
        return username;
    }
  return (
    <div onClick={()=>navigate(`post/${post.id}`)} className='cursor-pointer'>
    <div className='flex flex-col gap-4 max-w-sm rounded-3xl overflow-hidden shadow-2xl border-y-light-gray border-y-8 p-4'>
    <div className='flex items-center'>
    <span className='h-8 w-8 text-center rounded-full bg-gray mr-3 text-xl '>{getUserName()[0]}</span>
  <span className='text-gray'>{getUserName()}</span>
    </div>
    <div className='w-full max-h-36 text-center flex flex-col gap-4 max-w-sm overflow-hidden shadow-2xl'>
    <img src={post.imageURL} alt=""  className='h-50 w-60 mt-2'/>
    </div>
    <div className='text-secondary font-serif text-center'>{post.Description}</div>
    <div className='p-2 flex text-light-gray text-xl justify-between items-center'>
    <div className='flex items-center gap-2'>
    <AiFillHeart/>
    <h1>{post.likes.length}</h1>
    </div>
 <div  className='flex items-center gap-2'>
 <TfiCommentsSmiley/>
 <h1>{post.comments.length}</h1>
 </div>
  
    </div>
    </div>
    </div>
  )
  
}

export default Post