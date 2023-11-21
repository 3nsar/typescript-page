import { useState } from 'react';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from './config/firebase';
import "./App.css"

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  // Firebase
  const postRef = collection(db, 'todo');

  const addItem = async () => {
    if (inputValue.trim() !== '') {
      // Add item to Firebase
      const docRef = await addDoc(postRef, { text: inputValue });

      // Update local state
      setItems((prevItems) => [...prevItems, { id: docRef.id, text: inputValue }]);
      setInputValue('');
    }
  };

  const deleteItem = async (id: string) => {
    // Delete item from Firebase
    await deleteDoc(doc(postRef, id));

    // Update local state
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addItem}>+</button>
      <h1>
        {items.map((item) => (
          <div key={item.id}>
            <div className='todo-block'>
              <p>{item.text}</p>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </h1>
    </div>
  );
}

export default App;
