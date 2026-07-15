'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientPage() {
  const router = useRouter();
  const [items, setItems] = useState({});
  const [list, setList] = useState([]);
  useEffect(() => { fetch('/api/pizzas').then(r=>r.json()).then(setList).catch(()=>{}); }, []);
  async function checkout(pizzariaId) {
    const array = Object.entries(items).filter(([k,v])=>Number(v)>0).map(([pizzaId,quantity])=>({ pizzaId, quantity }));
    if (!array.length) return alert('Selecione itens');
    const userId = localStorage.getItem('userId');
    const res = await fetch('/api/orders', { method:'POST', headers:{'Content-Type':'application/json','x-user-id': userId || ''}, body: JSON.stringify({ pizzariaId, items: array }) });
    const data = await res.json();
    if (!res.ok) return alert(JSON.stringify(data));
    alert('Pedido criado!');
    setItems({});
    router.push('/client/orders');
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-lg font-semibold">Escolha a pizzaria</h2>
        {list.map(p => (
          <div key={p.id} className="border rounded-xl p-4">
            <h3 className="font-bold text-lg">{p.name}</h3>
            {p.description && <p className="text-sm mt-1">{p.description}</p>}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {p.pizzas?.map(px => {
                const key = px.id;
                const qty = items[key] || 0;
                return (
                  <div key={px.id} className="border rounded-lg p-3 flex flex-col justify-between">
                    <div>
                      <p className="font-semibold">{px.name}</p>
                      {px.description && <p className="text-xs text-gray-500">{px.description}</p>}
                      <p className="text-sm mt-1">R$ {px.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="px-2 border rounded" onClick={()=> setItems({...items,[key]:Math.max(0,(items[key]||0)-1)})}>-</button>
                      <span className="text-sm">{qty}</span>
                      <button className="px-2 border rounded" onClick={()=>setItems({...items,[key]:(items[key]||0)+1})}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <aside className="border rounded-xl p-4 h-fit">
        <h3 className="font-bold">Seu pedido</h3>
        <ul className="mt-2 text-sm space-y-1 list-disc pl-4">
          {list.filter(Boolean).flatMap(p=>p.pizzas?.map(px => ({ ...px, pizzariaId:p.id }))).filter(px => (items[px.id]||0) > 0).map(px => (
            <li key={px.id}>{px.name} x{items[px.id]} = R$ {(px.price*(items[px.id]||0)).toFixed(2)}</li>
          ))}
        </ul>
        <button className="mt-3 w-full px-3 py-2 rounded bg-black text-white text-sm" onClick={()=>checkout(list[0]?.id)}>Fazer pedido</button>
      </aside>
    </div>
  );
}
