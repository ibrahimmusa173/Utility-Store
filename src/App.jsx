import { Routes, Route } from 'react-router-dom';
// import Home from './Pages/Home';
// import Getdata from './Pages/Generals/Getdata';
// import Putdata from './Pages/Generals/Putdata';
// import UpdateUser from './Pages/UpdateUser/UpdateUser';


 import UtilityStore from './Pages/UtilityStore/UtilityStore';
 import Team from './Pages/Team/Team';
import DataFetch from './Pages/DataFetch/DataFetch';
import DataPost from './Pages/DataPost/DataPost';

function App() {

  return (
    <>
   
      
            <Routes>

              {/* <Route path="/" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/> */}

                <Route path="/" element={<UtilityStore/>}/>
                <Route path="/UtilityStore" element={<UtilityStore/>}/>
                 <Route path="/Team" element={<Team/>}/>
                  <Route path="/DataFetch" element={<DataFetch/>}/>
                   <Route path="/DataPost" element={<DataPost/>}/> 

              {/* <Route path="/getdata" element={<Getdata/>}/>
              <Route path="/putdata" element={<Putdata/>}/>
              <Route path="/putdata/:id" element={<Putdata/>} /> */}
               {/* <Route path="/UpdateUser/:id" element={<UpdateUser/>} /> */}






            </Routes>


    </>
  )
}

export default App
