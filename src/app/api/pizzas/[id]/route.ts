import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const pizzas = await prisma.pizza.findMany({ include: { pizzaria: true } });
    return NextResponse.json(pizzas);
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 400 }); }
}

export async function POST(request: Request) {
  try {
    const userId = request.headers.get('x-user-id') || undefined;
    const currentUser = userId ? await prisma.account.findUnique({ where: { id: userId }}) : null;
    let pizzariaId = (request.headers.get('x-user-id') as string);
    if (!pizzariaId) return NextResponse.json({ error: 'Auth required' }, { status: 401 });
    const pizzaria = await prisma.pizzaria.findFirst({ where: { accountId: pizzariaId }});
    if (!pizzaria) return NextResponse.json({ error: 'Pizzaria not configured' }, { status: 400 });
    const body = await request.json();
    const pizza = await prisma.pizza.create({ data: { ...body, pizzariaId: pizzaria.id } });
    return NextResponse.json(pizza);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
