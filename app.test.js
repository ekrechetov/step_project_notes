const supertest = require("supertest");
const server = supertest.agent("http://localhost:3010");
const db = require("./db/config.js");
const MongoClient = require("mongodb").MongoClient;

describe("Main connections testing", function() {
  it("Server is live", done => {
    server.get("/").expect(200, done);
  });

  it("Database connected", done => {
    MongoClient.connect(
      db.uri,
      { useNewUrlParser: true },
      (err, client) => {
        if (!err) {
          done();
        }
      }
    );
  });
});