import supertest from "supertest";
import { app } from '../eventService.js';

describe("GET /", function () {
  it("GET Event => code 200", function (done) {
    supertest(app)
      .get("/Event/read")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("GET EventbyId => code 200", function (done) {
    supertest(app)
      .get("/Event/this/65e4cbd12d34b38342b18af9")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

});