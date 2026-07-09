const prisma = require('./src/config/db.js');
const { hashPassword } = require('./src/utils/passwordUtils.js');

async function seedAdmin() {
  const email = 'admin@luxeprecision.com';
  const password = 'AdminPassword123';
  const name = 'Admin User';

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  const hashedPassword = await hashPassword(password);

  if (existingUser) {
    await prisma.user.update({
      where: { email },
      data: {
        name,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
    console.log(`Admin user with email ${email} already existed and has been updated successfully with role ADMIN.`);
  } else {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
    console.log(`New admin user with email ${email} created successfully with role ADMIN.`);
  }
}

seedAdmin()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
