import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');


  const arr : string[] = [];

  const addItem = () => {
    if (inputValue.trim() !== '') {
      setItems((prevItems) => [...prevItems, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className='App'>
        <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addItem}>+</button>
      <h1>
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </h1>
    </div>
  )
}

export default App
