import React from 'react';
import './App.css';
import TaskBoard from './components/TaskBoard';
import Header from './components/Header';

export default function App() {
  return (
    <div className="App">
      <Header title="Trello-Clone" />
      <TaskBoard />
    </div>
  );
}
