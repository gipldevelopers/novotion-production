const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const adminEmail = 'admin@novotionservices.com';
    const adminPassword = 'novotion$admin5555';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Use upsert to ensure we only ever have ONE admin entry for this specific email
    // If the email exists (even as a USER), it will be 'promoted' to ADMIN.
    // If it doesn't exist, it will be created as the system ADMIN.
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

    console.log('-----------------------------------------------');
    console.log('ADMIN SEED OPERATION SUCCESSFUL');
    console.log(`Status: ${admin.createdAt.getTime() === admin.updatedAt.getTime() ? 'CREATED' : 'UPDATED/PROMOTED'}`);
    console.log(`Admin Email: ${adminEmail}`);
    console.log(`Admin Password: ${adminPassword}`);
    console.log('-----------------------------------------------');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
