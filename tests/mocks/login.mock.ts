const validUsername = 'Hagar';
const validPassword = 'chang3m3';
const hashedPassword = '$2a$10$lQGsGScdxhjGRuYVJX3PX.347IWLNiSk6hOiMmjxlzLEI32lg5LMW';

const validLoginBody = { username: validUsername, password: validPassword };
const noUserLoginBody = { username: '', password: validPassword };
const noPasswordLoginBody = { username: validUsername, password: '' };
const notExistingUserBody = { username: 'notfound@email.com',  password: validPassword };
const existingUserWithWrongPassBody = { username: validUsername, password: 'wrong_pass' };

const existingUser = {
  username: validUsername,
  vocation: 'Guerreiro',
  level: 10,
  password: hashedPassword,
};

export default {
  noUserLoginBody,
  validLoginBody,
  noPasswordLoginBody,
  notExistingUserBody,
  existingUserWithWrongPassBody,
  existingUser,
};