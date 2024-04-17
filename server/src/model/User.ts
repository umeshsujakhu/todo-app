import mongoose, { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export default model<IUser>('User', UserSchema);
