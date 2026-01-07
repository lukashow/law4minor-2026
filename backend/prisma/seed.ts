import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import crypto from "crypto";

const connectionString = process.env.DATABASE_URL || "postgresql://admin:password@localhost:5550/law4minor";

// Create pg Pool
const pool = new pg.Pool({ connectionString });

// Create Prisma adapter
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

/**
 * Hash a password using PBKDF2 with unique salt
 * Same algorithm as src/utils/password.ts
 */
async function hashPassword(password: string): Promise<string> {
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

async function seed() {
  console.log("Checking for admin user...");

  // Check if any admin exists
  const existingAdmin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (existingAdmin) {
    console.log("Admin user already exists, skipping seed.");
    return;
  }

  // Create default admin user
  const defaultEmail = process.env.ADMIN_EMAIL || "admin@law4minor.org";
  const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";

  // Hash password with unique salt
  const hashedPassword = await hashPassword(defaultPassword);

  const admin = await prisma.user.create({
    data: {
      email: defaultEmail,
      password: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
      isTeamMember: false,
    },
  });

  console.log(`✅ Admin user created: ${admin.email}`);
  console.log(`   Password: ${defaultPassword}`);
  console.log(`   Hash: ${hashedPassword.substring(0, 30)}...`);
  console.log("   ⚠️  Please change this password after first login!");
}

seed()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
    await prisma.$disconnect();
  });
