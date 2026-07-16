'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/pizzas')
      .then((r) => r.json())
      .then((data) => {
        setList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Pizzarias disponíveis</h2>
          <p className="mt-1 text-sm text-slate-500">Peça diretamente pelo WhatsApp.</p>
        </div>
        <button
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-400 hover:text-brand-700 transition-colors"
          onClick={() =>
            fetch('/api/pizzas')
              .then((r) => r.json())
              .then(setList)
          }
        >
          Atualizar
        </button>
      </div>

      {loading && (
        <div className="mt-10 flex justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
        </div>
      )}

      {!loading && list.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-sm text-slate-500">Cadastre uma pizzaria para aparecer aqui.</p>
          <Link
            href="/register"
            className="mt-3 inline-flex rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            Cadastrar pizzaria
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {list.map((p) => (
          <div
            key={p.id}
            className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 transition-all hover:-translate-y-0.5 shadow-card hover:shadow-card-hover"
          >
            <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-brand-100/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-100">
                  {p.pizzas?.length || 0} {p.pizzas?.length === 1 ? 'pizza' : 'pizzas'}
                </span>
              </div>

              {p.description && (
                <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{p.description}</p>
              )}

              <div className="mt-4 flex items-center gap-2">
                <Link
                  href={`/client/#/pizzaria/${p.id}`}
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  Ver cardápio
                </Link>
                {p.whatsapp && (
                  <a
                    href={`https://wa.me/${p.whatsapp.replace(/\+/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
