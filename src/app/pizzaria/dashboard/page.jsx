'use client';
import { useState, useEffect } from 'react';

export default function PizzariaDashboard() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const id = localStorage.getItem('userId') || '';
    fetch('/api/orders?pizzariaId=PIZZARIA_ID', { headers:{'x-user-id': id} }).then(r=>r.json()).then(setOrders).catch(()=>{});
  }, []);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Pedidos recebidos</h2>
      {!orders.length && <p className="text-sm text-gray-500">Nenhum pedido ainda.</p>}
      {orders.map(o => (
        <div key={o.id} className="border rounded p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{o.client?.name || 'Cliente'}</p>
              <p className="text-xs text-gray-500">#{o.id} • {new Date(o.createdAt).toLocaleString()}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded border">{o.status}</span>
          </div>
          <div className="mt-2 text-sm">{o.items?.map((i,idx)=> <p key={idx}>• {i.pizza?.name} x{i.quantity} = R$ {i.price.toFixed(2)}</p>)}</div>
          <p className="font-bold mt-2">Total: R$ {o.total.toFixed(2)}</p>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 rounded bg-blue-600 text-white text-xs" onClick={() => alert('Implementar update status')}>Preparando</button>
            <button className="px-3 py-1 rounded bg-green-600 text-white text-xs" onClick={() => alert('Implementar update status')}>Pronto</button>
            <button className="px-3 py-1 rounded bg-gray-800 text-white text-xs" onClick={() => alert('Implementar update status')}>Entregue</button>
          </div>
        </div>
      ))}
    </div>
  );
}
