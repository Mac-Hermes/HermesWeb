import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password, name, role, phone } = await request.json();
    if (!email || !password || !name || !role) return NextResponse.json({ error: 'Campos obrigatórios' }, { status: 400 });
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.account.create({
      data: { email, password: hashed, name, role, phone }
    });
    return NextResponse.json({ userId: user.id, email: user.email, name: user.name, role: user.role });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
