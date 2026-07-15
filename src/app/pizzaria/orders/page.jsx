'use client';
import { useState, useEffect } from 'react';

export default function PizzariaOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const id = localStorage.getItem('userId') || '';
    fetch('/api/orders?pizzariaId=PIZZARIA_ID', { headers:{'x-user-id': id} }).then(r=>r.json()).then(setOrders).catch(()=>{});
  }, []);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Todos pedidos</h2>
      {orders.map(o => (
        <div key={o.id} className="border rounded p-4">
          <p className="font-semibold">{o.client?.name || 'Cliente'} • #{o.id}</p><p className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleString()}</p>
          <p className="text-sm mt-1">Status: {o.status} • Total: R$ {o.total.toFixed(2)}</p>
          <div className="text-sm mt-1">{o.items?.map((i,i2)=> <p key={i2}>• {i.pizza?.name} x{i.quantity}</p>)}</div>
        </div>
      ))}
    </div>
  );
}
