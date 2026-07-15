'use client';
import { useEffect } from 'react';

const LOGIN = "/login";

export default function AdminSetup() {
  useEffect(() => {
    const steps = [
      () => fetch('/api/admin/prisma/generate', { method: 'POST' }),
      () => fetch('/api/admin/prisma/migrate', { method: 'POST' }),
      () => fetch('/api/admin/prisma/seed', { method: 'POST' }),
    ];
    (async () => {
      for (const fn of steps) {
        const r = await fn();
        if (!r.ok) throw new Error('step failed');
      }
      alert('Setup completo! Acesse /login.');
    })();
  }, []);
  return <div className="border rounded p-4 text-sm">Configurando projeto. Aguarde...</div>;
}
