'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [list, setList] = useState([]);
  useEffect(() => { fetch('/api/pizzas').then(r=>r.json()).then(setList).catch(()=>{}); }, []);
  return (
    <main>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Pizzarias disponíveis</h2>
        <button className="underline text-sm" onClick={() => fetch('/api/pizzas').then(r=>r.json()).then(setList).catch(()=>{})}>Atualizar</button>
      </div>
      {list.length === 0 && <p className="mt-4 text-sm text-gray-500">Cadastre uma pizzaria para aparecer aqui.</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {list.map(p => (
          <div key={p.id} className="border rounded-xl p-4">
            <h3 className="font-bold text-lg">{p.name}</h3>
            {p.description && <p className="text-sm mt-1">{p.description}</p>}
            <p className="text-xs mt-2 text-gray-500">{p.pizzas?.length || 0} pizzas</p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Link href={`/client/#/pizzaria/${p.id}`} className="px-3 py-1 rounded bg-black text-white text-sm">Ver cardápio</Link>
              {p.whatsapp && <a className="px-3 py-1 rounded bg-green-600 text-white text-sm" href={`https://wa.me/${p.whatsapp.replace(/\+/g,'')}`} target="_blank">WhatsApp da loja</a>}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
