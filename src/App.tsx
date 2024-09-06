import { useState } from 'react';
import './App.css';
import { Editor } from './components/TableEditor/TableEditor';
import { testItems } from './mocks/items';


function App() {

  const [items, setItems] = useState(testItems);

  return (
    <div className='container'>
      <Editor items={items}></Editor>
    </div>
  );
}

export default App;
