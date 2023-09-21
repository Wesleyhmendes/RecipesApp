export type UserInfoType = {
  email: string;
  password: string;
};

export type FetchType = {
  userSearch: string;
  searchType: 'ingredient' | 'name' | 'firstLetter' | string;
};
