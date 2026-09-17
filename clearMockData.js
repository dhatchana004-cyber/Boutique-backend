const prisma = require('./src/config/db.js');
const bcrypt = require('bcryptjs');

async function clearMockData() {
  console.log('🧹 Starting database cleanup...');

  // Delete dependent records first (due to foreign key constraints)
  console.log('Deleting cart items, wishlist items, reviews, order items, and payments...');
  await prisma.cartItem.deleteMany({});
  await prisma.wishlist.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.address.deleteMany({});
  
  // Delete mock products
  console.log('Deleting mock products...');
  await prisma.product.deleteMany({});

  // Delete enquiries
  console.log('Deleting mock enquiries...');
  await prisma.enquiry.deleteMany({});

  // Delete all users except ADMIN users
  console.log('Deleting non-admin mock users...');
  await prisma.user.deleteMany({
    where: {
      role: {
        not: 'ADMIN'
      }
    }
  });

  // Ensure Admin user exists
  const adminEmail = 'admin@mail.com';
  const adminPassword = 'admin@123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      role: 'ADMIN'
    },
    create: {
      name: 'Admin User',
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('✅ Database successfully cleared!');
  console.log('----------------------------------------------------');
  console.log('👑 Admin Credentials Preserved:');
  console.log(`   Email:    ${adminEmail}`);
  console.log(`   Password: ${adminPassword}`);
  console.log('----------------------------------------------------');
}

clearMockData()
  .catch((e) => {
    console.error('❌ Error clearing mock data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
