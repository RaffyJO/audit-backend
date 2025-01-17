const bcrypt = require("bcrypt");
const prisma = require("../src/db");

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'rafiteguh6@gmail.com',
      password: await bcrypt.hash('11111111', 10),
      name: 'Raffy JO',
    },
  });

  const audit1 = await prisma.audit.create({
    data: {
      title: 'Audit K3 2025',
      area: 'K3',
      start_date: new Date(),
      close_date: new Date(),
      user_id: user.id,
    },
  });

  const audit2 = await prisma.audit.create({
    data: {
      title: 'Audit SDM 2025',
      area: 'SDM',
      start_date: new Date(),
      close_date: new Date(),
      user_id: user.id,
    },
  });

  console.log('Data dummy berhasil ditambahkan!');
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
