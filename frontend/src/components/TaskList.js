import React, {useState, useEffect} from 'react';
import { api } from '../api';

export default function TaskList({ token }){
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);

  const fetchTasks = async ()=>{
    try{ const data = await api('/tasks','GET',null,token); setTasks(data); }catch(err){ setError(err.data?.message||'Error'); }
  };
  useEffect(()=>{ fetchTasks(); },[]);

  const create = async (t)=>{ try{ await api('/tasks','POST',t,token); fetchTasks(); }catch(err){ setError(err.data?.message||'Error'); } };
  const update = async (id,body)=>{ try{ await api('/tasks/'+id,'PUT',body,token); fetchTasks(); setEditing(null);}catch(err){ setError('Update error'); } };
  const remove = async (id)=>{ if(!confirm('Delete?')) return; try{ await api('/tasks/'+id,'DELETE',null,token); fetchTasks(); }catch(err){ setError('Delete error'); } };

  return (<div>
    <h3>Tasks</h3>
    <TaskForm onCreate={create} />
    {error && <div style={{color:'red'}}>{error}</div>}
    <ul>{tasks.map(t=> (<li key={t._id}>
      <strong>{t.title}</strong> - {t.description} - {t.completed ? 'Done' : 'Open'} (owner: {t.owner?.name||t.owner})
      <div><button onClick={()=>setEditing(t)}>Edit</button> <button onClick={()=>remove(t._id)}>Delete</button></div>
      {editing && editing._id===t._id && <div>
        <input defaultValue={t.title} id={'title-'+t._id} /><br/>
        <input defaultValue={t.description} id={'desc-'+t._id} /><br/>
        <label><input type='checkbox' defaultChecked={t.completed} id={'comp-'+t._id} /> completed</label><br/>
        <button onClick={()=> update(t._id, { title: document.getElementById('title-'+t._id).value, description: document.getElementById('desc-'+t._id).value, completed: document.getElementById('comp-'+t._id).checked })}>Save</button>
      </div>}
    </li>))}</ul>
  </div>);
}

function TaskForm({ onCreate }){
  const [f,setF]=useState({title:'',description:''});
  return (<div style={{marginBottom:10}}>
    <input placeholder='Title' value={f.title} onChange={e=>setF({...f,title:e.target.value})} /> <input placeholder='Description' value={f.description} onChange={e=>setF({...f,description:e.target.value})} />
    <button onClick={()=>{ if(!f.title) return; onCreate(f); setF({title:'',description:''}); }}>Create</button>
  </div>);
}
