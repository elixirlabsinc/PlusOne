const async = require('async');

module.exports = (db) => {
  async.series(
    [
      (callback) => {
        db.query(
          `
            CREATE TABLE IF NOT EXISTS User
            (
                User_Id VARCHAR(36) NOT NULL PRIMARY KEY,
                User_Type VARCHAR(10),
                User_Email VARCHAR(100),
                User_FacebookId VARCHAR(100),
                User_TwitterId VARCHAR(100),
                User_PinterestId VARCHAR(100),
                User_Password VARCHAR(100),
                User_DateCreated VARCHAR(30),
                User_DateUpdated VARCHAR(30)
            );
          `,
          (err, rows) => {
            if (err) {
              throw err;
            } else {
              console.log("User table created...");
              return callback();
            }
          }
        );
      },
      (callback) => {
        db.query(
          `
            CREATE TABLE IF NOT EXISTS Interest
            (
                Interest_Id VARCHAR(36) NOT NULL PRIMARY KEY,
                Interest_Name VARCHAR(100),
                Interest_DateCreated VARCHAR(30),
                Interest_DateUpdated VARCHAR(30)
            );
          `,
          (err, rows) => {
            if (err) {
              throw err;
            } else {
              console.log("Interest table created...");
              return callback();
            }
          }
        );
      }
    ],
    () => {
      console.log("Table propogation complete...")
    }
  )
}
