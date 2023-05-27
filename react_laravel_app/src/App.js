// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Insert from './webpages/insert';
import Display from './webpages/display';
import Update from './webpages/update';
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <nav>
        <ul>
          <li><a href="/insert">Insert</a></li>
          <li><a href="/display">Display</a></li>
          {/* <li><a href="/update">Update</a></li> */}
        </ul>
      </nav>
<hr class="horizontal"/>
      <BrowserRouter>
        <Routes>
          <Route path="/insert" element={<Insert />}/>
          <Route path="/display" element={<Display />}/>
          <Route path="/update/:id" element={<Update />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
