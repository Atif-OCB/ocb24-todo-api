import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
  const user = this as unknown as IUser;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as IUser;
  return await bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;