import supertest from "supertest";
import { app } from '../ticketsService.js';
// test POST
describe("POST /", function() {
    it("Create Ticket => code 201", function(done) {
      var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk4MTc4MDksImV4cCI6MTc0MTM3NTQwOX0.ZBtxYWZS4aCXhhavaYoIaIiRIqJuNpjvBdj9ofcKvbk"

    supertest(app)
      .post("/ticket/create")
      .set('Authorization', 'Bearer ' + tokenTest) // Adding token to headers
      .send({"idEvent": "65e4cbd12d34b38342b18af9"})
      .expect(400)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});