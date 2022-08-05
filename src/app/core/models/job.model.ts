import { UserClass, UserEntity } from './user.model';

export interface JobPostingEntity {
  id: string;
  title: string;
  description: string;
  offer: UserEntity;
  wage?: string;
  favoritedBy?: UserEntity[];
  appliedBy?: UserEntity[];
}
export class JobPostingClass implements JobPostingEntity {
  id = '';
  title = '';
  description = '';
  offer = new UserClass();
  wage? = '';
  favoritedBy? = [];
  appliedBy? = [];
}
