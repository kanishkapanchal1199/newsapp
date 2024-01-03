import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {
  

  const [progress,setProgress]=useState(0);
  
 
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} pageSize={5} country="in" category={"business"}/>}/>
          <Route path="/business" element={<News setProgress={setProgress} pageSize={5} country="in" category={"business"}/>}/>
          <Route path="/entertainment" element={<News setProgress={setProgress} pageSize={5} country="in" category={"entertainment"}/>}/>
          <Route path="/health" element={<News setProgress={setProgress} pageSize={5} country="in" category={"health"}/>}/>
          <Route path="/sport" element={<News setProgress={setProgress} pageSize={5} country="in" category={"sport"}/>}/>
          <Route path="/science" element={<News setProgress={setProgress} pageSize={5} country="in" category={"science"}/>}/>
          <Route path="/technology" element={<News setProgress={setProgress} pageSize={5} country="in" category={"technology"}/>}/>


        </Routes>
        </Router>
        
      </div>
    )
  
}
export default App


