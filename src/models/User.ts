import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  phone: string;
  password: string;
  role: 'rider' | 'driver';
  profile: {
    name: string;
    photo?: string;
    rating: number;
  };
  vehicle?: {
    type: 'bike' | 'car' | 'suv';
    plate: string;
    model: string;
  };
  isActive: boolean;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['rider', 'driver'],
    required: true,
  },
  profile: {
    name: { type: String, required: true },
    photo: String,
    rating: { type: Number, default: 5.0 },
  },
  vehicle: {
    type: {
      type: String,
      enum: ['bike', 'car', 'suv'],
    },
    plate: String,
    model: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function (this: IUser) {
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);