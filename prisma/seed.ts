import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  let userBody: Prisma.UserCreateInput;
  userBody = {
    userName: 'admin',
    imageUrl: '/takt.png',
  };

  await prisma.user.upsert({
    where: { userName: 'admin' },
    update: {},
    create: userBody,
  });
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
