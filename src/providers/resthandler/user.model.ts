import { EstateModel } from './estate.model';

export class User {
  userID: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  agency: string;
  estates: EstateModel[];
  favorits: EstateModel[];
}
