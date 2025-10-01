import React, {useState} from 'react';
import { api } from '../api';

export default function Login({ onAuth }){
  const [form,setForm]=useState({email:'',password:''});
  const [msg,setMsg]=useState(null);
  const submit=async e=>{
    e.preventDefault();
    try{
      const res = await api('/auth/login','POST',form);
      onAuth(res.token,res.user);
    }catch(err){ setMsg(err.data?.message || 'Error'); }
  };
  return (<form onSubmit={submit} style={{padding:10,border:'1px solid #ddd',borderRadius:6}}>
    <h3>Login</h3>
    <input placeholder='Email' value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /><br/>
    <input placeholder='Password' type='password' value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /><br/>
    <button type='submit'>Login</button>
    {msg && <div style={{color:'red'}}>{msg}</div>}
  </form>);
}
