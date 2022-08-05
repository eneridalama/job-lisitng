export interface LoginModel {
  email: string;
  password: string;
}
export interface SignUpModel extends LoginModel {
  role: string;
}
export interface UserEntity {
  kind: string;
  idToken: string;
  email: string;
  displayName: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export class UserClass implements UserEntity {
  kind = '';
  idToken = '';
  email = '';
  displayName = '';
  refreshToken = '';
  expiresIn = '';
  localId = '';
  registered? = false;
}
