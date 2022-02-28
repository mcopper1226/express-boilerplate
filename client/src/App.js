import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

async function fetchData() {
  const endpoint = 'http://localhost:8080/api';
  try {
    const res = fetch(endpoint).then((response) => response.json());
    return res;
  } catch (err) {
    console.log(err);
  }
}

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    const promise = fetchData();
    promise.then((res) => {
      setData(res.data);
    });
  }, []);
  console.log(data);
  return (
    <div className='App'>
      <header className='App-header'>
        <h1> US Population By Year</h1>
        <p>Data fetched from api</p>
        {data &&
          data.map((item) => (
            <div key={item.Year}>
              Year: {item.Year}
              <div>Population: {item.Population}</div>
            </div>
          ))}
      </header>
    </div>
  );
}

export default App;
