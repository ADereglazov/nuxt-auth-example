import db from '../db';

export function user(req, res) {
  const userId = req.user.userId;
  const user = db[userId];

  if (!user) {
    throw new Error('User not found');
  }

  res.json({ user });
}
