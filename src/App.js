import logo from './logo.svg';
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
    <ToastContainer/>
    <BrowserRouter>
     <Routes>
      <Route path='/home' element = {<Home/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/' element = {<Login/>}/>
      <Route path='/signup' element = {<Signup/>}/>
     
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
