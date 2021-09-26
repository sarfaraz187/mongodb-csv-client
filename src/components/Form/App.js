import React, { useEffect, useState } from "react";
import './index.css';
import axios from 'axios';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    console.log("useEffect triggered !!!!!");
    fetch("/api").then((res) => res.json()).then((data) => console.log(data));
  }, []);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios.post("/upload", formData, {
    }).then(res => { 
      console.log(res.statusText);
    });
  }

  const onChangeHandler= event => {
    if(event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  }

  const handleGetList = () => {
    axios.get("/collection").then(res => { 
      console.log(res);
      if(res.data && res.status === 200) {
        setCollection(res.data);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <div className="layout">
      <div className="container">
        <h3>Upload CSV files here</h3>
        <div className="input-container">
          <input 
            type="file" 
            accept=".csv" 
            placeholder="" 
            onChange={onChangeHandler}/>
          <button className="btn" onClick={handleUpload}>Upload</button>          
        </div>
      </div>
      <div className="container">
        <button className="btn" onClick={handleGetList}>Get List</button>          
        <div className="listData">
          {collection.map(element => {
            return <li>{element.industry}</li>
          })}
          {collection.length === 0 && <p>No data</p>}
        </div>
      </div>
    </div>
  )
}

export default App;