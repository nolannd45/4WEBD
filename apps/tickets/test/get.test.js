import supertest from "supertest";
import { app } from '../ticketsService.js';

describe("GET /", function () {
  it("GET MyTickets => code 200", function (done) {
    var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk4MTc4MDksImV4cCI6MTc0MTM3NTQwOX0.ZBtxYWZS4aCXhhavaYoIaIiRIqJuNpjvBdj9ofcKvbk"
    supertest(app)
      .get("/ticket/myTickets")
      .set('Authorization', 'Bearer ' + tokenTest) 
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});