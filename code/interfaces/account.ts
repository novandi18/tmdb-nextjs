export interface Account {
  avatar: AccountAvatar;
  id: number;
  name: string;
  username: string;
}

export interface AccountAvatar {
  gravatar: {
    hash: string;
  };
  tmdb: {
    avatar_path: string;
  };
}