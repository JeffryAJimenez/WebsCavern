const userResolver = require("./user_resolver");
const adminResolver = require("./admin_resolver");
const postResolver = require("./post_resolver");

module.exports = [userResolver, postResolver, adminResolver];
