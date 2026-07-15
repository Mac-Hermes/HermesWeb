'use client';
import { useState, useEffect } from 'react';

export default function MenuPage() {
  const [pizzas, setPizzas] = useState([]);
  const [form, setForm] = useState({ name:'', price:'', available:'1' });
  async function load() {
    const res = await fetch('/api/pizzas', { headers:{'x-user-id': localStorage.getItem('userId') || ''} });
    const data = await res.json();
    setPizzas(data);
  }
  useEffect(() => load(), []);
  async function create(e) {
    e.preventDefault();
    const res = await fetch('/api/pizzas',{method:'POST',headers:{'Content-Type':'application/json','x-user-id':localStorage.getItem('userId')||''},body:JSON.stringify({name:form.name,price:Number(form.price),available:Number(form.available)})});
    if (res.ok) { alert('Pizza criada'); setForm({name:'',price:'',available:'1'}); load(); }
  }
  async function remove(id) { if (!confirm('Remover?')) return; await fetch(`/api/pizzas/${id}`,{method:'DELETE',headers:{'x-user-id':localStorage.getItem('userId')||''}}); load(); }
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Cardápio</h2>
      <form onSubmit={create} className="flex gap-2 flex-wrap">
        <input className="border rounded p-2 w-48" placeholder="Nome" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input className="border rounded p-2 w-24" placeholder="Preço" type="number" step="0.01" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required />
        <select className="border rounded p-2" value={form.available} onChange={e=>setForm({...form,available:e.target.value})}>
          <option value="1">Disponível</option>
          <option value="0">Indisponível</option>
        </select>
        <button className="px-3 py-2 rounded bg-black text-white text-sm">Adicionar</button>
      </form>
      <div className="space-y-2">
        {pizzas.map(p => <div key={p.id} className="border rounded p-3 flex items-center justify-between"><div><p className="font-semibold">{p.name}</p><p className="text-sm">R$ {p.price.toFixed(2)}</p></div><button onClick={()=>remove(p.id)} className="text-red-600 text-xs">Remover</button></div>)}
      </div>
    </div>
  );
}
