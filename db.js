

const Sequelize = require('sequelize');
const connection = new Sequelize('ifunnymeme', 'admin', '', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'path/to/database.sqlite'
});


const User = connection.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING(100),
    notNull: true,
    unique: true,
  },
  email: {
    type: Sequelize.STRING(100),
    notNull: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(1000),
    notNull: true,
  }
}, {
  timestamps: true
});
// User.sync({
//
//   // Table created
//   force: true
// }).then(() => {
//   return User.create({
//     username: 'test',
//     email: 'test@gmail.com',
//     password: 'test',
//   });
// });

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



module.exports = connection;
module.exports = User;
