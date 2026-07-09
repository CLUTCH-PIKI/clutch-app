import { test, expect } from 'vitest';
import { GET } from './route';

test('GET /api/health returns 200 OK', async () => {
  const response = await GET();
  const data = await response.json();
  
  expect(response.status).toBe(200);
  expect(data.status).toBe('ok');
  expect(data.timestamp).toBeDefined();
});
