db.createUser({
  user: 'service-admin',
  pwd: 'service-admin',
  roles: [
    {
      role: 'readWrite',
      db: 'service',
    },
  ],
});
