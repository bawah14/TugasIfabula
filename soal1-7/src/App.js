import logo from './logo.svg';
import './App.css';
import { useState,React } from 'react';
import DataTable from 'react-data-table-component';

function App() {

  const columns = [
    {
      cell: row => (
        <button
          aria-label="delete"
          color="secondary"
          onClick={() => deleteTransaction(row.id)}
        >  delete
        </button>
      )
    },
    {
      name: 'Draft No',
      selector: row => row.id,
    },
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Body',
        selector: row => row.body,
    },
];
  const [name, setName] = useState("");
  
  const [dataApi, setdataApi] = useState([]);
  const [data, setData] = useState([
    {
      label : "myLabel"
    }
  ]);
  function submitAction () {
    setData([
      {
        label : name
      }
    ])
  }

  const convertSHA = async () => {
    //Encode SHA256
    const msgUint8 = new TextEncoder().encode(name);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string

    console.log(hashHex)
    return hashHex;
    
  };

  function deleteTransaction (id) 
  {
    // console.log(id)
    var data = dataApi.filter(function(item)
    {
        return item.id != id
    })
    setdataApi(data)
    alert("Data 1 Deleted")
  }

  const getdataApi = async () => {
    try {
       const response = await fetch("http://jsonplaceholder.typicode.com/posts");
        const data = await response.json()
        setdataApi(data);
        console.log(data)
     } catch (e) {
         console.error(e.toString);
     } 
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {data[0].label}
        </p>
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br/>
        <button onClick={submitAction}>
          Submit
        </button>
        <hr/>
        <button onClick={convertSHA}>
          Generate SHA256
        </button>
        <hr/>
        <button onClick={getdataApi}>
          Consume API
        </button>
        <DataTable
            columns={columns}
            data={dataApi}
            pagination
            dense      
        />
      </header>
    </div>
  );
  const styles = {

  };

  
}



export default App;
