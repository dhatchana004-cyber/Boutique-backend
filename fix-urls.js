const prisma = require('./src/config/db.js');

async function fixUrls() {
  console.log('Fixing image URLs in the database...');
  
  // 1. Fix Users (avatar)
  const users = await prisma.user.findMany();
  let userCount = 0;
  for (const user of users) {
    if (user.avatar) {
      let newAvatar = user.avatar;
      if (newAvatar.startsWith('http://localhost:5000')) {
        newAvatar = newAvatar.replace('http://localhost:5000', 'https://boutique-backend-7con.onrender.com');
      } else if (newAvatar.startsWith('http://boutique-backend-7con.onrender.com')) {
        newAvatar = newAvatar.replace('http://', 'https://');
      }
      if (newAvatar !== user.avatar) {
        await prisma.user.update({
          where: { id: user.id },
          data: { avatar: newAvatar }
        });
        userCount++;
      }
    }
  }
  console.log(`Fixed ${userCount} user avatars.`);

  // 2. Fix Products (image and images array)
  const products = await prisma.product.findMany();
  let productCount = 0;
  for (const product of products) {
    let updated = false;
    let newImage = product.image;
    let newImages = [...(product.images || [])];

    if (newImage) {
      if (newImage.startsWith('http://localhost:5000')) {
        newImage = newImage.replace('http://localhost:5000', 'https://boutique-backend-7con.onrender.com');
        updated = true;
      } else if (newImage.startsWith('http://boutique-backend-7con.onrender.com')) {
        newImage = newImage.replace('http://', 'https://');
        updated = true;
      }
    }

    for (let i = 0; i < newImages.length; i++) {
      if (newImages[i].startsWith('http://localhost:5000')) {
        newImages[i] = newImages[i].replace('http://localhost:5000', 'https://boutique-backend-7con.onrender.com');
        updated = true;
      } else if (newImages[i].startsWith('http://boutique-backend-7con.onrender.com')) {
        newImages[i] = newImages[i].replace('http://', 'https://');
        updated = true;
      }
    }

    if (updated) {
      await prisma.product.update({
        where: { id: product.id },
        data: { image: newImage, images: newImages }
      });
      productCount++;
    }
  }
  console.log(`Fixed ${productCount} products.`);
  
  console.log('Done.');
}

fixUrls()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
