import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();


// create a Super Asmin
// npx ts-node prisma/seed.ts
async function main() {
  const superAdminEmail = "tanvir@.com";
  const hashedPassword = await bcrypt.hash("tanvir123", 10);

  // Check if Super Admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: superAdminEmail },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: superAdminEmail,
        password: hashedPassword,
        address: "Dhaka, Bangladesh",
        role: "SUPER_ADMIN", 
        gender: "male",      
      },
    });
    console.log("✅ Super Admin created successfully!");
  } else {
    console.log("ℹ️ Super Admin already exists, skipping creation.");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
