import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function getUserIdFromToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('login')?.value;

    if (!token) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    return payload.userId;
  } catch (err) {
    console.error('Token decode error:', err);
    return null;
  }
}
