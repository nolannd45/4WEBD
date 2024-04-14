import supertest from "supertest";
import { app } from '../eventService.js';
// test POST

describe("POST /", function() {
  it("Create Event => code 201", function(done) {
    var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk4MTc4MDksImV4cCI6MTc0MTM3NTQwOX0.ZBtxYWZS4aCXhhavaYoIaIiRIqJuNpjvBdj9ofcKvbk"

    supertest(app)
      .post("/Event/create")
      .set('Authorization', 'Bearer ' + tokenTest) // Adding token to headers
      .send({"name": "Georges V", "location": "Tours", "description": "Cet hôtel est génial", "picture_list": ["event1"]})
      .expect(201)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });

});