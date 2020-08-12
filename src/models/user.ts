import crypto from 'crypto';
import  {
  Document,
  Model,
  Schema,
  model,
} from 'mongoose';

export interface UserModelInterface extends Document {
  username: string;
  hashedPassword: string;
  salt: string;
  created: Date;

  password: string;

  encryptPassword: (password: string) => string;
  checkPassword: (password: string) => boolean;
}

const schema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
});

schema.methods.encryptPassword = function (password: string): string {
  return crypto
      .createHmac('sha1', this.salt)
      .update(password)
      .digest('hex');
};
schema.methods.checkPassword = function (password: string): boolean {
  return (this.encryptPassword(password) === this.hashedPassword);
}

schema.virtual('password')
  .set(function (password: string) {
    this.__plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function (): string {
    return this.__plainPassword;
  });

export interface IUser extends Document {
  username: string;
  hashedPassword: string;
  salt: string;
  created: Date;

  password: string;
}

export interface IUserModel extends Model<IUser> {
  encryptPassword: (password: string) => string;
  checkPassword: (password: string) => boolean;
}


export default model<IUser, IUserModel>('User', schema);
