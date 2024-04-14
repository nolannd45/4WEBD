import supertest from "supertest";
import { app } from '../eventService.js';

describe("PATCH /", function () {
  it("Update Event => code 200", function (done) {
    var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk4MTc4MDksImV4cCI6MTc0MTM3NTQwOX0.ZBtxYWZS4aCXhhavaYoIaIiRIqJuNpjvBdj9ofcKvbk"
    var IdEvent = "65e5041e3dbbdc5ea66a1236";
    supertest(app)
      .patch(`/Event/update/${IdEvent}`)
      .set("Authorization", "Bearer " + tokenTest) // Adding token to headers
      .send({ "location": "Tours" })
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

});
