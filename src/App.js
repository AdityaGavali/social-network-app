import logo from './logo.svg';
import {BrowserRouter , Navigate, Route , Routes} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPost from './pages/AddPost';
import Post from './pages/PostD';
import PostD from './pages/PostD';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
    <ToastContainer/>
    <BrowserRouter>
     <Routes>
      <Route path='/' element = {<ProtectedRouted><Home/></ProtectedRouted>}/>
      <Route path='/post/:id' element = {<ProtectedRouted><PostD/></ProtectedRouted>}/>
      <Route path='/profile/:id' element = {<ProtectedRouted><Profile/></ProtectedRouted>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/addpost' element = {<ProtectedRouted><AddPost/></ProtectedRouted>}/>
     
     </Routes>
     </BrowserRouter>
    </div>
  );
}
function ProtectedRouted({children}){
  if(localStorage.getItem('SocialXpress')){
return children
  }else{
   return  <Navigate to='/login'/>
  }
}
export default App;
