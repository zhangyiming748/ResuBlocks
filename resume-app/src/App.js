import React from 'react';
import ResumeEditor from './components/ResumeEditor';
import './App.css';

function App() {
  console.log('App 渲染中...');

  return (
    <div className="App" style={{ width: '100%', height: '100vh' }}>
      <ResumeEditor />
    </div>
  );
}

export default App;