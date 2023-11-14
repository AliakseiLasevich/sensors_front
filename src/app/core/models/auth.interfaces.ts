export interface AuthRequestInterface {
  login: string;
  password: string;
}

export interface AuthResponseInterface {
  access_token: TokenInterface;
}

export interface TokenInterface {
  token: string;
  expires_in: number;
}
