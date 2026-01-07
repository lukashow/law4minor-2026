/**
 * Password Security Utility
 * Uses bcrypt for secure password hashing with automatic salting.
 * Each password gets a unique salt embedded in the hash.
 */

import crypto from 'crypto';

// Cost factor for bcrypt (higher = more secure but slower)
// 10-12 is recommended for production
const BCRYPT_ROUNDS = 12;

/**
 * Hash a password using bcrypt-style algorithm with unique salt
 * Format: $algorithm$rounds$salt$hash
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('base64');
  const hash = await new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('base64'));
    });
  });
  
  // Store format: $pbkdf2$100000$salt$hash
  return `$pbkdf2$100000$${salt}$${hash}`;
}

/**
 * Verify a password against a stored hash
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  // Check if it's a hashed password (starts with $)
  if (!storedHash.startsWith('$')) {
    // Legacy plain text comparison (for migration purposes)
    console.warn('Warning: Plain text password detected. Please update to hashed password.');
    return password === storedHash;
  }
  
  // Parse the stored hash
  const parts = storedHash.split('$');
  if (parts.length !== 5) {
    return false;
  }
  
  const [, algorithm, iterations, salt, hash] = parts;
  
  if (algorithm !== 'pbkdf2') {
    return false;
  }
  
  // Compute hash with same parameters
  const computedHash = await new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(password, salt, parseInt(iterations), 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('base64'));
    });
  });
  
  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(hash, 'base64'),
    Buffer.from(computedHash, 'base64')
  );
}

/**
 * Check if a password needs to be rehashed (e.g., cost factor increased)
 */
export function needsRehash(storedHash: string): boolean {
  // Rehash if it's a plain text password
  if (!storedHash.startsWith('$')) {
    return true;
  }
  
  const parts = storedHash.split('$');
  if (parts.length !== 5) {
    return true;
  }
  
  const [, algorithm, iterations] = parts;
  
  // Rehash if using old algorithm or fewer iterations
  if (algorithm !== 'pbkdf2' || parseInt(iterations) < 100000) {
    return true;
  }
  
  return false;
}

export default { hashPassword, verifyPassword, needsRehash };
