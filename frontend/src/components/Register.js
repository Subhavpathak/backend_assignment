import React, {useState} from 'react';
import { api } from '../api';

export default function Register({ onAuth }){
  const [form,setForm]=useState({name:'',email:'',password:''});
  const [msg,setMsg]=useState(null);
  const submit=async e=>{
    e.preventDefault();
    try{
      const res = await api('/auth/register','POST',form);
      onAuth(res.token,res.user);
    }catch(err){
      setMsg(err.data?.message || (err.data?.errors?.map(e=>e.msg).join(', ')) || 'Error');
    }
  };
  return (<form onSubmit={submit} style={{padding:10,border:'1px solid #ddd',borderRadius:6}}>
    <h3>Register</h3>
    <input placeholder='Name' value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /><br/>
    <input placeholder='Email' value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /><br/>
    <input placeholder='Password' type='password' value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /><br/>
    <button type='submit'>Register</button>
    {msg && <div style={{color:'red'}}>{msg}</div>}
  </form>);
}
