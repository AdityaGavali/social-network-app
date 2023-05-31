import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { getDocs , collection , query } from 'firebase/firestore';
import { db } from "../firebase";
import { useDispatch } from 'react-redux';
import Post from '../components/Post';
function Home() {
  const [data,setData] = useState([]);
  const dispatch = useDispatch()
  const getData = async()=>{
    dispatch({type:'showloading'})
    const q = query(collection(db, "posts"))
    const temp = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push({...doc.data(),id:doc.id})
    });
   setData(temp);
   dispatch({type:'hideloading'})
  }
  useEffect(()=>{
    getData()
  } , [])
  return (
     <DefaultLayout>
     <div className='grid grid-cols-4 md:grid-cols-1 gap-7'>
    {
      data.map((post)=>{
        return<Post post = {post}/>
      })
    }
    </div>
     </DefaultLayout>
    
  )
}

export default Home