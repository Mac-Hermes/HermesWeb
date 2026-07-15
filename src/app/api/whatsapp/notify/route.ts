import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { to, text } = await request.json();
    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID;
    if (!token || !phoneId) return NextResponse.json({ error: 'Missing whatsapp env' }, { status: 500 });
    const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;
    const payload = { messaging_product:'whatsapp', to, type:'text', text:{ body: text } };
    const r = await fetch(url, { method:'POST', headers:{ Authorization:`Bearer ${token}`, 'Content-Type':'application/json' }, body:JSON.stringify(payload) });
    const body = await r.text();
    return NextResponse.json({ ok: r.ok, status: r.status, body }, { status: r.status });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
