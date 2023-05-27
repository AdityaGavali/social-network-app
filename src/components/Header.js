import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenuAlt1} from 'react-icons/hi'
function Header() {
  const location = useLocation();
  const [showmenu,setshowmenu] = useState(false);
  const menuItems = [
    {
      title : '🏠Home',
      path : '/'
    },
    {
      title : '➕Post',
      path : '/addpost'
    },
    {
      title : '📥Shares',
      path : '/shares'
    },
    {
      title : '😎Profile',
      path : '/profile'
    },
  ]
  return (
   <div className='p-2   rounded-2xl bg-bg  '>
   {!showmenu &&(
    <div className='md:flex justify-end  hidden text-secondary items-center p-1 -mb-9'>
      <HiMenuAlt1 size={30}  className='cursor-pointer' onClick={()=>{setshowmenu(true)}}/>
    </div>
   )}
   <div className=' flex items-center justify-between'>
   <h1 className='text-2xl px-2 font-bold font-serif text-secondary items-center'>SocialXpress</h1>
   {/* web view */}
    <div className='flex p-1 space-x-10 justify-end text-md font-serif text-secondary items-center md:hidden '>
     
      {menuItems.map((items)=>{
        return<Link to={`${items.path}`} className={`${items.path == location.pathname && 'bg-secondary text-primary rounded-xl p-2'}`} onClick={()=>{
          setshowmenu(false)
        }}>{items.title}</Link>
      })}
    </div>
    {/* mobile view */}
    {showmenu &&(
      <div className='md:flex p-1 space-x-10 justify-end flex-col text-secondary items-end space-y-5 hidden'>
      {menuItems.map((items)=>{
        return<Link to={`${items.path}`} className={`${items.path == location.pathname && 'bg-secondary text-primary rounded-xl p-2'}`}>{items.title}</Link>
      })}
    </div>
    )}</div>
    </div>
  )
}

export default Header