'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name:'', email:'', password:'', phone:'', role:'client', whatsapp:'' });
  async function onSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/auth/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) { alert(JSON.stringify(data)); return; }
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('role', data.role);
    alert('Cadastro realizado!');
  }
  return (
    <form onSubmit={onSubmit} className="max-w-lg space-y-3">
      <h2 className="text-xl font-bold">Cadastro</h2>
      <input className="border rounded p-2 w-full" placeholder="Nome" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
      <input className="border rounded p-2 w-full" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
      <input className="border rounded p-2 w-full" placeholder="Senha" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
      <input className="border rounded p-2 w-full" placeholder="Telefone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
      <select className="border rounded p-2 w-full" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
        <option value="client">Cliente</option>
        <option value="pizzaria">Pizzaria</option>
      </select>
      {form.role === 'pizzaria' && <input className="border rounded p-2 w-full" placeholder="WhatsApp da pizzaria" value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} />}
      <button type="submit" className="px-4 py-2 rounded bg-black text-white">Cadastrar</button>
    </form>
  );
}
