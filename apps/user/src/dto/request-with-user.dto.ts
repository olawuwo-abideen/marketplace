import { Request } from 'express';
import { User } from 'apps/auth/src/schemas/user.schema';


interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
