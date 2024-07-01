const bcrypt = require('bcryptjs');

async function testPasswordHashing() {
  const plainPassword = '7654321';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  console.log('Plain Password:', plainPassword);
  console.log('Hashed Password:', hashedPassword);

  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  console.log('Password Match:', isMatch);
}

testPasswordHashing().catch(console.error);
