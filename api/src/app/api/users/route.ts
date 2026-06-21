import { NextResponse } from 'next/server';
import { UserRepository } from '../../../repositories/UserRepository';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = UserRepository.findByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const user = UserRepository.createUser({ email, password, name });
    
    // Don't return password
    const { password: _, ...userWithoutPassword } = user;
    void _; // Silence warning
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
