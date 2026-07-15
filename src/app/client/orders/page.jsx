'use client';
import { useState, useEffect } from 'react';

export default function ClientOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem('userId') || '';
    fetch('/api/orders?clientId=' + userId, { headers:{'x-user-id': userId} }).then(r=>r.json()).then(setOrders).catch(()=>{});
  }, []);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Meus pedidos</h2>
      {orders.map(o => (
        <div key={o.id} className="border rounded p-4">
          <div className="flex justify-between">
            <p className="font-semibold">{o.pizzaria?.name || 'Pizzaria'}</p>
            <span className="text-xs px-2 py-1 rounded border">{o.status}</span>
          </div>
          <p className="text-sm text-gray-500">#{o.id} • {new Date(o.createdAt).toLocaleString()}</p>
          <div className="mt-2 text-sm">
            {o.items?.map((i,idx)=> <p key={idx}>• {i.pizza?.name} x{i.quantity} = R$ {i.price.toFixed(2)}</p>)}
          </div>
          <p className="font-bold mt-2">Total: R$ {o.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
