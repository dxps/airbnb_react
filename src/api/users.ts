import { getDatabaseTable } from './helpers';

type User = {
  id: number;
  avatarUrl: string;
  bio: string;
  email: string;
  firstName: string;
  lastName: string;
  initials: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export const getUserById = (id: number): User | undefined => {
  const users = getDatabaseTable<User[]>('users');
  if (!users) {
    console.log('No users table found');
    return;
  }

  return users.find((user) => user.id === id);
};

export const getUser = (data: {
  email: string;
  password: string;
}): User | undefined => {
  const { email, password } = data;

  const users = getDatabaseTable<User[]>('users');
  if (!users) {
    console.log('No users table found');
    return;
  }

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  return user;
};
