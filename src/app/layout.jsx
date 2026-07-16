import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = { title: 'HermesPizza', description: 'Pizzaria online' };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="container">
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
