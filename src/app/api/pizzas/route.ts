import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const pizzarias = await prisma.pizzaria.findMany({ include: { pizzas: true } });
    return NextResponse.json(pizzarias);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || '';
    if (!userId) return NextResponse.json({ error: 'Auth required' }, { status: 401 });
    const account = await prisma.account.findUnique({ where: { id: userId } });
    if (!account || account.role !== 'pizzaria') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const pizzaria = await prisma.pizzaria.findFirst({ where: { accountId: userId } });
    if (!pizzaria) return NextResponse.json({ error: 'Configure a pizzaria first' }, { status: 400 });
    const body = await request.json();
    const pizza = await prisma.pizza.create({ data: { ...body, pizzariaId: pizzaria.id } });
    return NextResponse.json(pizza);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
