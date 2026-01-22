const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function sync() {
    console.log('Starting Purchase-Payment Linker...');

    const users = await prisma.user.findMany({
        include: {
            purchases: true,
            payments: {
                where: { status: 'SUCCESS' }
            }
        }
    });

    for (const user of users) {
        if (user.purchases.length > 0 && user.payments.length > 0) {
            console.log(`Linking ${user.purchases.length} purchases for user: ${user.email}`);

            // Link the latest successful payment to all existing purchases for this user
            // This is a recovery fix for existing disconnected dev data
            const latestPayment = user.payments[0];

            await prisma.purchase.updateMany({
                where: {
                    userId: user.id,
                    paymentId: null
                },
                data: {
                    paymentId: latestPayment.id
                }
            });
        }
    }

    console.log('Data Linkage Complete.');
}

sync()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
