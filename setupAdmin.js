const bcrypt = require('bcryptjs');
const prisma = require('./src/config/db.js');

async function main() {
    const email = 'admin@mail.com';
    const password = 'admin@123'; // Easy password for testing

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: 'ADMIN'
        },
        create: {
            name: 'Admin User',
            email,
            password: hashedPassword,
            role: 'ADMIN'
        }
    });

    console.log('Successfully set up admin user!');
    console.log('Email:', email);
    console.log('Password:', password);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
