import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export async function GET() {
  try {
    execSync('npx prisma generate', { cwd: '/app', stdio: 'pipe' });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
