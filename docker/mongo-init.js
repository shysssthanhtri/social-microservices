db.createUser({
  user: 'users-admin',
  pwd: 'users-admin',
  roles: [
    {
      role: 'readWrite',
      db: 'users',
    },
  ],
});
