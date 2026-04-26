import { PrismaClient, SubscriptionTier, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password123!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@almijobfinder.dev" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@almijobfinder.dev",
      passwordHash,
      role: UserRole.ADMIN,
      subscriptionTier: SubscriptionTier.PRO
    }
  });

  const demo = await prisma.user.upsert({
    where: { email: "demo@almijobfinder.dev" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@almijobfinder.dev",
      passwordHash,
      subscriptionTier: SubscriptionTier.FREE
    }
  });

  await prisma.resume.create({
    data: {
      userId: demo.id,
      originalFilename: "demo-resume.pdf",
      storagePath: "seed/demo-resume.pdf",
      mimeType: "application/pdf"
    }
  });

  console.log(`Seeded admin ${admin.email} and demo ${demo.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
