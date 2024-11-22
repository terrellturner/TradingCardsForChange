import bcrypt from "bcryptjs";

const Users = [
  {
    name: "Admin",
    email: "admin@rellsoft.dev",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Joe Schmoe",
    email: "joe.schmoe@rellsoft.dev",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Don Juan",
    email: "don.juan@rellsoft.dev",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default Users;
