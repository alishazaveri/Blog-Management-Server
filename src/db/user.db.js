export default function makeUsersDb({ db, User }) {
  return {
    getUserByEmailId,
    addUser,
  };

  async function getUserByEmailId({ emailId }) {
    await db.connect();

    const user = await User.findOne({ emailId });

    return user;
  }

  async function addUser({ username, imageUrl, emailId, password }) {
    await db.connect();

    const user = new User({ username, imageUrl, emailId, password });

    await user.save();

    return user;
  }
}
