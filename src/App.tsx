import { useState } from 'react';
import './App.css';
import { TableEditor } from './components/TableEditor/TableEditor';
import { testItems } from './mocks/items';


function App() {

  const [items, setItems] = useState(testItems);

  return (
    <div className='container'>
      <TableEditor items={items}></TableEditor>
    </div>
  );
}

export default App;
