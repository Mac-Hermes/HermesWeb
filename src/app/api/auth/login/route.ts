import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) return NextResponse.json({ error: 'Campos obrigatórios' }, { status: 400 });
    const user = await prisma.account.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    return NextResponse.json({ userId: user.id, email: user.email, name: user.name, role: user.role, phone: user.phone });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
