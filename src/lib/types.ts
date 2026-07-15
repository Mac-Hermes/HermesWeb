export type Account = { id: string; email: string; name: string; role: 'client' | 'pizzaria'; phone?: string | null; whatsapp?: string | null };
export type Pizza = { id: string; name: string; price: number; description?: string | null; imageUrl?: string | null; available: number; pizzariaId: string };
export type Order = { id: string; pizzariaId: string; clientId: string; status: string; total: number; notes?: string | null; createdAt: string; items?: OrderItem[] };
export type OrderItem = { id: string; orderId: string; pizzaId: string; quantity: number; price: number };
