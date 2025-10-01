const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

export async function api(path, method='GET', body=null, token=null){
  const headers = { 'Content-Type': 'application/json' };
  if(token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(()=> ({}));
  if(!res.ok) throw { status: res.status, data };
  return data;
}
