const prisma = require('./src/config/db.js');
const { hashPassword } = require('./src/utils/passwordUtils.js');

async function seedUser() {
  const email = 'user';
  const password = 'password';
  const name = 'user';

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
        role: 'USER'
      }
    });
    console.log(`Regular user updated successfully.`);
  } else {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER'
      }
    });
    console.log(`Regular user created successfully.`);
  }
}

seedUser()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
