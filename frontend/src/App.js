import './App.css';
import { useRef, useState } from 'react';

async function testConnection() {
  try {
    const response = await fetch('http://localhost:3001/status');
  
    if (!response.ok) {
      console.log('Request failed. Request status: ' + response.status);
      return false;
    }
  
    return true;
  } catch (err) {
    console.log('An error has occured: ' + err);
    return false;
  }
}

function App() {
  const [statusReady, setStatusReady] = useState(false);
  const [serverSuccess, setServerSuccess] = useState(false);

  testConnection().then(result => {
    setServerSuccess(result); 
    setStatusReady(true);
  });

  if (!statusReady) {
    return (
      <div>
        <p>Loading</p>
      </div>
      );
  }

  if (!serverSuccess) {
    return (
    <div>
      <p>Connection to server failed.</p>
    </div>
    );
  }

  return (
    <div>
      <p>Success!</p>
    </div>
  );
}

export default App;
