import { NextResponse } from 'next/server';
import { UserRepository } from '../repositories/UserRepository';

export class UserController {
  static async createUser(request: Request) {
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
      
      const { password: _, ...userWithoutPassword } = user;
      void _;
      return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  static async updateUser(request: Request) {
    try {
      const body = await request.json();
      const { id, ...updates } = body;

      if (!id) {
        return NextResponse.json({ error: 'User ID is required in the request body' }, { status: 400 });
      }

      const user = UserRepository.findById(id);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const updatedUser = UserRepository.updateUser(id, updates);
      if (!updatedUser) {
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
      }

      const { password: _, ...userWithoutPassword } = updatedUser;
      void _;
      return NextResponse.json(userWithoutPassword);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }
}
