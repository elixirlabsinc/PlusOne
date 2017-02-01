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
                User_DateCreated DATE,
                User_DateUpdated DATE
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
                Interest_DateCreated DATE,
                Interest_DateUpdated DATE
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
      },
      (callback) => {
        db.query(
          `
            CREATE TABLE IF NOT EXISTS User_Interest
            (
                User_Interest_Id VARCHAR(36) NOT NULL PRIMARY KEY,
                User_Id VARCHAR(36),
                Interest_Id VARCHAR(36),
                User_Interest_DateCreated DATE,
                User_Interest_DateUpdated DATE,
                FOREIGN KEY (User_Id) REFERENCES User (User_Id),
                FOREIGN KEY (Interest_Id) REFERENCES Interest (Interest_Id)
            );
          `,
          (err, rows) => {
            if (err) {
              throw err;
            } else {
              console.log("User_Interest table created...");
              return callback();
            }
          }
        );
      },
      (callback) => {
        db.query(
          `
            CREATE TABLE IF NOT EXISTS Chat_Room
            (
                Chat_Room_Id VARCHAR(36) NOT NULL PRIMARY KEY,
                Chat_Room_Name VARCHAR(100)
            );
          `,
          (err, rows) => {
            if (err) {
              throw err;
            } else {
              console.log("Chat_Room table created...");
              return callback();
            }
          }
        );
      },
      (callback) => {
        db.query(
          `
            CREATE TABLE IF NOT EXISTS Chat_User
            (
                Chat_User_Id VARCHAR(36) NOT NULL PRIMARY KEY,
                Chat_Room_Id VARCHAR(36),
                User_Id VARCHAR(36),
                FOREIGN KEY (Chat_Room_Id) REFERENCES Chat_Room (Chat_Room_Id),
                FOREIGN KEY (User_Id) REFERENCES User (User_Id)
            );
          `,
          (err, rows) => {
            if (err) {
              throw err;
            } else {
              console.log("Chat_User table created...");
              return callback();
            }
          }
        );
      },
      (callback) => {
        db.query(
          `
            CREATE TABLE IF NOT EXISTS Chat_Message
            (
                Chat_Message_Id VARCHAR(36) NOT NULL PRIMARY KEY,
                User_Id VARCHAR(36),
                Chat_Room_Id VARCHAR(36),
                Message TEXT,
                Media_Url TEXT,
                FOREIGN KEY (User_Id) REFERENCES User (User_Id),
                FOREIGN KEY (Chat_Room_Id) REFERENCES Chat_Room (Chat_Room_Id)
            );
          `,
          (err, rows) => {
            if (err) {
              throw err;
            } else {
              console.log("Chat_Message table created...");
              return callback();
            }
          }
        );
      },
      (callback) => {
        db.query(
          `
            CREATE TABLE IF NOT EXISTS Match
            (
                Match_Id VARCHAR(36) NOT NULL PRIMARY KEY,
                Match_Name VARCHAR(100)
            );
          `,
          (err, rows) => {
            if (err) {
              throw err;
            } else {
              console.log("Match table created...");
              return callback();
            }
          }
        );
      },
      (callback) => {
        db.query(
          `
            CREATE TABLE IF NOT EXISTS Match_User
            (
                Match_User_Id VARCHAR(36) NOT NULL PRIMARY KEY,
                User_Id VARCHAR(36),
                FOREIGN KEY (User_Id) REFERENCES User (User_Id)
            );
          `,
          (err, rows) => {
            if (err) {
              throw err;
            } else {
              console.log("Match_User table created...");
              return callback();
            }
          }
        );
      },
      (callback) => {
        db.query(
          `
            CREATE TABLE IF NOT EXISTS Report
            (
                Report_Id VARCHAR(36) NOT NULL PRIMARY KEY,
                Report_Message TEXT
            );
          `,
          (err, rows) => {
            if (err) {
              throw err;
            } else {
              console.log("Report table created...");
              return callback();
            }
          }
        );
      },
      (callback) => {
        db.query(
          `
            CREATE TABLE IF NOT EXISTS Report_User
            (
                Report_User_Id VARCHAR(36) NOT NULL PRIMARY KEY,
                User_Id VARCHAR(36),
                Report_User_Type VARCHAR(10),
                FOREIGN KEY (User_Id) REFERENCES User (User_Id)
            );
          `,
          (err, rows) => {
            if (err) {
              throw err;
            } else {
              console.log("Report_User table created...");
              return callback();
            }
          }
        );
      },
      (callback) => {
        db.query(
          `
            CREATE TABLE IF NOT EXISTS Log
            (
                Log_Id VARCHAR(36) NOT NULL PRIMARY KEY,
                Log_Message VARCHAR(100),
                User_Id VARCHAR(36), 
                Action VARCHAR(100),
                FOREIGN KEY (User_Id) REFERENCES User (User_Id)
            );
          `,
          (err, rows) => {
            if (err) {
              throw err;
            } else {
              console.log("Log table created...");
              return callback();
            }
          }
        );
      },
      (callback) => {
        db.query(
          `
            CREATE TABLE IF NOT EXISTS Schedule
            (
                Schedule_Id VARCHAR(36) NOT NULL PRIMARY KEY,
                Schedule_Name VARCHAR(100),
                Schedule_Message TEXT
            );
          `,
          (err, rows) => {
            if (err) {
              throw err;
            } else {
              console.log("Schedule table created...");
              return callback();
            }
          }
        );
      },
      (callback) => {
        db.query(
          `
            CREATE TABLE IF NOT EXISTS Schedule_User
            (
                Schedule_User_Id VARCHAR(36) NOT NULL PRIMARY KEY,
                User_Id VARCHAR (36), 
                FOREIGN KEY (User_Id) REFERENCES User (User_Id)
            );
          `,
          (err, rows) => {
            if (err) {
              throw err;
            } else {
              console.log("Schedule_User table created...");
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
