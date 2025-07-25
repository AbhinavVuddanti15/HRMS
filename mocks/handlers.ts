
import { rest } from 'msw';

export const handlers = [
  rest.post('/api/signup', async (req, res, ctx) => {
    const { email, password, confirmPassword } = await req.json();
    if (!email || !password || !confirmPassword) {
      return res(ctx.status(400), ctx.json({ message: 'All fields required' }));
    }
    if (password !== confirmPassword) {
      return res(ctx.status(400), ctx.json({ message: 'Passwords do not match' }));
    }
    return res(ctx.status(201), ctx.json({ message: 'Signup successful' }));
  }),

   rest.post('/api/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (email === 'test@gmail.com' && password === 'password123') {
      return res(ctx.status(200), ctx.json({ message: 'Login successful' }));
    }
    return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
  }),

];
