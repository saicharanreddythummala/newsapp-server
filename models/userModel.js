import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  googleId: {
    type: String,
    default: null,
  },
  gPicture: {
    type: String,
    default: null,
  },
  uPicture: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.plugin(findOrCreate);

export const User = mongoose.model('users', UserSchema);
