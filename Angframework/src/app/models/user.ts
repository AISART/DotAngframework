import {Photo} from './photo';

export interface User {
  id: number;
  userName: string;
  knownAs: string;
  age: number;
  gender: string;
  created: string;
  lastActive: Date | string;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: Photo[];
  roles?: string[];
}

