import React from 'react';
import TaskList from './TaskList';
export default function Dashboard({ token, user, onLogout }){
  return (<div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div>Welcome, {user?.name} ({user?.role})</div>
      <div><button onClick={onLogout}>Logout</button></div>
    </div>
    <hr/>
    <TaskList token={token} />
  </div>);
}
