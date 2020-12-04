import React, {useReducer, useEffect, Fragment} from 'react';
import { StudentsTable } from './components/StudentsTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <StudentsTable/>
    </div>
  );
}

export default App;
