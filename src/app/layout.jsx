import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = { title: 'HermesPizza', description: 'Pizzaria online' };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} style={{ color: '#0f172a', background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">🍕 HermesPizza</h1>
            <nav className="flex gap-3 text-sm">
              <a className="underline" href="/">Catálogo</a>
              <a className="underline" href="/register">Cadastrar</a>
              <a className="underline" href="/login">Entrar</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
