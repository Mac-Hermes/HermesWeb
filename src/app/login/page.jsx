'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({ email:'', password:'' });
  async function onSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) { alert(JSON.stringify(data)); return; }
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('role', data.role);
    window.location.href = data.role === 'pizzaria' ? '/pizzaria/dashboard' : '/client';
  }
  return (
    <form onSubmit={onSubmit} className="max-w-lg space-y-3">
      <h2 className="text-xl font-bold">Entrar</h2>
      <input className="border rounded p-2 w-full" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
      <input className="border rounded p-2 w-full" placeholder="Senha" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
      <button type="submit" className="px-4 py-2 rounded bg-black text-white">Entrar</button>
    </form>
  );
}
