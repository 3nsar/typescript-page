import { useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

function Todo() {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  // Firebase
  const postRef = collection(db, 'todo');

  // Fetch data from Firebase when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(postRef);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    };

    fetchData();
  }, [postRef]);

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
    <div className="todo-container">
      
      <h1>TODO LIST</h1>
      <div className="todo-bar">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addItem}>+</button>
      </div>

      <div className='cards-container'>
        {items.map((item) => (
          <div key={item.id} className='card'>
              <p>{item.text}</p>
              <button onClick={() => deleteItem(item.id)}>Delete</button> 
          </div>
        ))}
      </div>
    </div>
  );
}

  export default Todo;