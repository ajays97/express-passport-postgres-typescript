import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, Unique, Index, Default } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AllowNull } from 'sequelize-typescript';

@Table
export default class User extends Model<User> {
  @AllowNull(false)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  _id!: string;

  @AllowNull(false)
  @Unique
  @Index
  @Column
  username!: string;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @AllowNull(false)
  @Unique
  @Index
  @Column
  email!: string;

  @AllowNull(false)
  @Unique
  @Column
  phone!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @AllowNull(false)
  @Column(DataTypes.ARRAY(DataTypes.STRING))
  roles!: string[];

  @Column(DataTypes.JSON)
  providers?: string;

  @AllowNull(false)
  @CreatedAt
  @Column
  createdAt!: Date;

  @AllowNull(false)
  @UpdatedAt
  @Column
  updatedAt!: Date;
}

export interface IUser {
  _id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: string[];
  password: string;
  providers?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserDTO {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}
