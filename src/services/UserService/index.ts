import { Service } from 'typedi';
import User, { IUser } from '../../models/User';

@Service()
class UserService {
  constructor() {}

  public async createUser(user: Partial<IUser>): Promise<any> {
    return User.create(user);
  }
}

export default UserService;
