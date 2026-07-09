import { UserController } from '../../../controllers/UserController';

export async function POST(request: Request) {
  return UserController.createUser(request);
}

export async function PATCH(request: Request) {
  return UserController.updateUser(request);
}
