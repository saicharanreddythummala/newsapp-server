import cloudinary from 'cloudinary';
import { User } from '../models/userModel.js';
import { hashPassword, comparePassword, sendToken } from '../utils/helpers.js';

//register a user without oAuth
const registerUser = async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: 'scale',
  });

  const { username, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    fullName: username,
    email,
    password: hashedPassword,
    uPicture: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(200).json({
    success: true,
  });
};


//login without oAuth
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  let user;

  if (username) {
    user = await User.findOne({ fullName: username }).select('+password');
  }

  const isPwdMatched = await comparePassword(password, user.password);

  if (isPwdMatched) {
    sendToken(user, 200, res);
  }
};


//logout
const logoutUser = async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'User logged out',
  });
};

export { registerUser, loginUser, logoutUser };
