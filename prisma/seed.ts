import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('hermes123', 10);
  const client = await prisma.account.create({
    data: { email: 'cliente@test.com', password, name: 'Cliente Teste', role: 'client' }
  });
  const pizzariaAcc = await prisma.account.create({
    data: { email: 'pizzaria@test.com', password, name: 'Pizzaria Teste', role: 'pizzaria', whatsapp: '5513988039935' }
  });
  const pizzaria = await prisma.pizzaria.create({
    data: { accountId: pizzariaAcc.id, name: 'Pizzaria Teste' }
  });
  const pizzas = [
    { pizzariaId: pizzaria.id, name: 'Margherita', description: 'Molho de tomate, mussarela, manjericão', price: 42.9 },
    { pizzariaId: pizzaria.id, name: 'Calabresa', description: 'Calabresa, cebola, mussarela', price: 46.9 },
    { pizzariaId: pizzaria.id, name: 'Quatro Queijos', description: 'Mussarela, provolone, parmesão, catupiry', price: 52.9 },
    { pizzariaId: pizzaria.id, name: 'Portuguesa', description: 'Presunto, ovos, cebola, azeitona', price: 49.9 },
    { pizzariaId: pizzaria.id, name: 'Chocolate', description: 'Chocolate ao leite, granulado', price: 44.9 },
  ];
  for (const p of pizzas) await prisma.pizza.create({ data: p });
  console.log('Seed ok');
}

main().finally(async ()=>{ await prisma.$disconnect(); process.exit(0); });
