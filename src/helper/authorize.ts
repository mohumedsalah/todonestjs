// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

const saltRounds = 10;

export const comparePassword = (Password, hashedPassword) => {
  return bcrypt.compareSync(Password, hashedPassword);
};

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
