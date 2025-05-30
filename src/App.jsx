import { Routes, Route } from 'react-router-dom';
// import Home from './Pages/Home';
import Getdata from './Pages/Getdata';
import Putdata from './Pages/Putdata';
import UpdateUser from './Pages/UpdateUser';


import UtilityStore from '././Pages/UtilityStore/UtilityStore';

function App() {

  return (
    <>
      <h1
        className="text-3xl text-center text-red-700"
      >Welcome to Vite with TailwindCSS and React</h1>
      
            <Routes>

              {/* <Route path="/" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/> */}

                <Route path="/" element={<UtilityStore/>}/>

              <Route path="/getdata" element={<Getdata/>}/>
              <Route path="/putdata" element={<Putdata/>}/>
              <Route path="/putdata/:id" element={<Putdata/>} />
               <Route path="/UpdateUser/:id" element={<UpdateUser/>} />






            </Routes>


    </>
  )
}

export default App
