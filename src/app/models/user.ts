import { Email } from './Email';
import { Phone } from './Phone';

export interface User {
  id: string;
  name: string;
  lastName: string;
  emails: Email[];
  phones: Phone[];
}
