import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Getdata from './Pages/Getdata';
import Putdata from './Pages/Putdata';

function App() {

  return (
    <>
      <h1
        className="text-3xl text-center text-red-700"
      >Welcome to Vite with TailwindCSS and React</h1>
      
            <Routes>

              <Route path="/" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>

              <Route path="/getdata" element={<Getdata/>}/>
              <Route path="/putdata" element={<Putdata/>}/>



            </Routes>


    </>
  )
}

export default App
