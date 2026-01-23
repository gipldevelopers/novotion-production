const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@novotionservices.com";
  const adminPassword = "novotion$admin5555";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Use upsert to ensure we only ever have ONE admin entry for this specific email
  // If the email exists (even as a USER), it will be 'promoted' to ADMIN.
  // If it doesn't exist, it will be created as the system ADMIN.
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      role: "ADMIN",
      name: "Novotion Admin",
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
      name: "Novotion Admin",
    },
  });

  console.log("-----------------------------------------------");
  console.log("ADMIN SEED OPERATION SUCCESSFUL");
  console.log(
    `Status: ${admin.createdAt.getTime() === admin.updatedAt.getTime() ? "CREATED" : "UPDATED/PROMOTED"}`,
  );
  console.log(`Admin Email: ${adminEmail}`);
  console.log(`Admin Password: ${adminPassword}`);
  console.log("-----------------------------------------------");

  // Seed Custom Packages
  const customPackages = [
    {
      id: "custom-starter",
      name: "Custom Starter Package",
      price: 500,
      description:
        "A tailored entry-level solution for professionals looking for immediate career impact and focused guidance.",
      features: [
        "Personalized Career Strategy Development",
        "Direct Access to Senior Mentors (2 sessions)",
        "Customized Interview Preparation",
        "Priority Support via Email",
        "Curated Job Referrals",
      ],
      color: "blue",
      badge: "Starter",
      icon: "Zap",
      isSeed: true,
    },
    {
      id: "custom-elite",
      name: "Custom Elite Package",
      price: 1000,
      description:
        "Our most comprehensive high-end support package designed for rapid career acceleration and executive positioning.",
      features: [
        "Standard Starter Package features",
        "1-on-1 Executive Coaching Sessions (5 sessions)",
        "Unlimited Resume & Profile Refinements",
        "24/7 Priority WhatsApp Support",
        "Direct Introductions to Key Hiring Managers",
        "Salary Negotiation Support for Job Offers",
      ],
      color: "indigo",
      badge: "Popular",
      icon: "Star",
      isSeed: true,
    },
  ];

  for (const pkg of customPackages) {
    await prisma.customPackage.upsert({
      where: { id: pkg.id },
      update: {
        name: pkg.name,
        price: pkg.price,
        description: pkg.description,
        features: pkg.features,
        color: pkg.color,
        badge: pkg.badge,
        icon: pkg.icon,
        isSeed: pkg.isSeed,
      },
      create: pkg,
    });
  }

  console.log("-----------------------------------------------");
  console.log("CUSTOM PACKAGES SEED OPERATION SUCCESSFUL");
  console.log(`Seeded ${customPackages.length} custom packages`);
  console.log("-----------------------------------------------");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
