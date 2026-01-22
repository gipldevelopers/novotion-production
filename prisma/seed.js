const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const adminEmail = 'admin@novotionservices.com';
    const adminPassword = 'novotion$admin5555';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            password: hashedPassword,
            role: 'ADMIN',
            name: 'Novotion Admin',
        },
        create: {
            email: adminEmail,
            password: hashedPassword,
            role: 'ADMIN',
            name: 'Novotion Admin',
        },
    });

    console.log('Seed completed. Admin user created/updated:');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
