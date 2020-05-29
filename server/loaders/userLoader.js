const User = require("../database/models/userSchema");

module.exports.batchUsers = async (userIds) => {
  console.log("keys====", userIds);
  const users = await User.find({ _id: { $in: userIds } });

  //return the user in the correct sequence
  return userIds.map((userId) => users.find((user) => user.id === userId));
};
