import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pizzariaId = url.searchParams.get('pizzariaId');
    const clientId = url.searchParams.get('clientId');
    if (pizzariaId) {
      const orders = await prisma.order.findMany({ where: { pizzariaId }, include: { client: true, items: { include: { pizza: true } } }, orderBy: { createdAt: 'desc' } });
      return NextResponse.json(orders);
    }
    if (clientId) {
      const orders = await prisma.order.findMany({ where: { clientId }, include: { pizzaria: true, items: { include: { pizza: true } } }, orderBy: { createdAt: 'desc' } });
      return NextResponse.json(orders);
    }
    return NextResponse.json({ error: 'pizzariaId or clientId required' }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pizzariaId, clientId, items, notes } = body;
    if (!pizzariaId || !items?.length) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    const pizzaria = await prisma.pizzaria.findUnique({ where: { id: pizzariaId } });
    if (!pizzaria) return NextResponse.json({ error: 'Pizzaria not found' }, { status: 404 });
    const pizzaIds = items.map((i: any) => i.pizzaId);
    const pizzas = await prisma.pizza.findMany({ where: { id: { in: pizzaIds } } });
    const pizzaMap = new Map(pizzas.map(p => [p.id, p]));
    const validItems: any[] = [];
    let total = 0;
    for (const item of items) {
      const pizza = pizzaMap.get(item.pizzaId);
      if (!pizza) continue;
      const lineAmount = pizza.price * item.quantity;
      total += lineAmount;
      validItems.push({ pizzaId: pizza.id, quantity: item.quantity, price: pizza.price });
    }
    const enrichedClientId = typeof clientId === 'string' && clientId.length > 0 ? clientId : null;
    const order = await prisma.order.create({
      data: { pizzariaId, clientId: enrichedClientId || '', total, notes: notes || null, items: { create: validItems } },
      include: { pizzaria: true, client: true, items: { include: { pizza: true } } }
    });
    try {
      if (pizzaria.whatsapp) {
        const wa = pizzaria.whatsapp.replace(/\D/g, '');
        const client = enrichedClientId ? await prisma.account.findUnique({ where: { id: enrichedClientId } }).catch(() => null) : null;
        const lines = [
          `🍕 Novo pedido #${order.id}`,
          `Cliente: ${client?.name || enrichedClientId || 'Visitante'}`,
          `Itens:`,
          ...validItems.map(v => `• ${pizzaMap.get(v.pizzaId)?.name} x${v.quantity} = R$ ${v.price.toFixed(2)}`),
          `Total: R$ ${total.toFixed(2)}`,
          notes ? `Obs: ${notes}` : ''
        ].filter(Boolean);
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/whatsapp/notify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: wa, text: lines.join('\n') })
        }).catch(() => {});
      }
    } catch (e) {}
    return NextResponse.json(order, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
