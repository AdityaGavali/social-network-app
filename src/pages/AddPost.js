import React, { useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import {MdCreateNewFolder} from 'react-icons/md'

function AddPost() {
  const [Image , setImage] = useState("");
  const [Description  ,setDescription] = useState("");
  const onImageChange = (e)=>{
    setImage(e.target.files[0]);
  }
  return (
    <DefaultLayout>
         <div>
          <h1 className='text-2xl text-center font-bold text-secondary flex items-center justify-center gap-2 font-serif'>Create Post<MdCreateNewFolder className='text-3xl'/></h1>
          <div className='flex flex-col gap-8 justify-center items-center'>
            <textarea className='mt-3 border-2 bg-light-gray border-primary w-1/2 rounded-3xl p-3 md:w-full overflow-y-scroll  no-scrollbar' rows='3'></textarea>
            <input type='file' className='text-secondary' onChange={(e)=>{
              onImageChange(e);
            }} />
            {Image && 
            <img src={URL.createObjectURL(Image)} className='mt-5 h-52 w-52 flex justify-center'/>}
          </div>
         </div>
    </DefaultLayout>
  
  )
}

export default AddPost