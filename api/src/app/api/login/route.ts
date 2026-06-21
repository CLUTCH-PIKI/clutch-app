import { NextResponse } from 'next/server';
import { UserRepository } from '../../../repositories/UserRepository';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = UserRepository.findByEmail(email);
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user;
    void _; // Silence warning
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
