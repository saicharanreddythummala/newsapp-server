import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//hashing the password
async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

//compare password
async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

//generating token for user
function generateToken(id) {
  return jwt.sign({ id: id }, process.env.SECRET_KEY, {
    expiresIn: `${process.env.TOKEN_EXPIRE}`,
  });
}

//sending a token
function sendToken(user, statusCode, res) {
  const token = generateToken(user._id);

  //cookie options
  const options = {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
}

export { hashPassword, comparePassword, sendToken };
