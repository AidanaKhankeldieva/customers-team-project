import React, {useReducer, useEffect, Fragment} from 'react';
import { StudentsTable } from './components/student_table/StudentsTable';
import './App.css';
import SimpleList from './components/student_table/sidenav/SimpleList';

function App() {
  return (
    <div className="App">
      <SimpleList/>
      <StudentsTable/>
    </div>
  );
}

export default App;
