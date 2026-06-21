import { NextResponse } from 'next/server';
import { UserRepository } from '../../../../repositories/UserRepository';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const user = UserRepository.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedUser = UserRepository.updateUser(id, body);
    if (!updatedUser) {
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

    const { password: _, ...userWithoutPassword } = updatedUser;
    void _; // Silence warning
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
