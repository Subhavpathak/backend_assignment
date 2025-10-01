import React, {useState} from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')||'null'));
  return (
    <div style={{fontFamily:'Arial',maxWidth:900, margin:'20px auto'}}>
      <h2>Intern Assignment - Frontend</h2>
      {!token ? (
        <div style={{display:'flex',gap:20}}>
          <Register onAuth={(t,u)=>{ setToken(t); setUser(u); localStorage.setItem('token',t); localStorage.setItem('user',JSON.stringify(u)); }} />
          <Login onAuth={(t,u)=>{ setToken(t); setUser(u); localStorage.setItem('token',t); localStorage.setItem('user',JSON.stringify(u)); }} />
        </div>
      ) : (
        <Dashboard token={token} user={user} onLogout={()=>{ setToken(null); setUser(null); localStorage.removeItem('token'); localStorage.removeItem('user'); }} />
      )}
    </div>
  );
}
