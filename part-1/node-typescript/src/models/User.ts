import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  createdAt: Date;
}
const userSchema = new Schema<IUser>({
  name: String,
  age: Number,
  email: String,
  createdAt: Date,
});

const User = mongoose.model<IUser>('User', userSchema);

export { IUser, User };
