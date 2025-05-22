import bcrypt from "bcryptjs";

const Users = [
  {
    firstName: "Admin",
    lastName: "Admineeene",
    email: "admin@rellsoft.dev",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    firstName: "Joey",
    lastName: "Schmoey",
    email: "joe.schmoe@rellsoft.dev",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    firstName: "Don",
    lastName: "Juan",
    email: "don.juan@rellsoft.dev",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default Users;
