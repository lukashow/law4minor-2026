import PocketBase from 'pocketbase';

const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';

// Create a singleton PocketBase client
export const pb = new PocketBase(POCKETBASE_URL);

// Admin authentication (for server-side operations)
export async function authenticateAdmin(email: string, password: string) {
  try {
    const authData = await pb.admins.authWithPassword(email, password);
    return authData;
  } catch (error) {
    console.error('Admin authentication failed:', error);
    throw error;
  }
}

// User authentication
export async function authenticateUser(email: string, password: string) {
  try {
    const authData = await pb.collection('users').authWithPassword(email, password);
    return authData;
  } catch (error) {
    console.error('User authentication failed:', error);
    throw error;
  }
}

// Check if PocketBase is available
export async function checkConnection(): Promise<boolean> {
  try {
    await pb.health.check();
    return true;
  } catch {
    return false;
  }
}

export default pb;
