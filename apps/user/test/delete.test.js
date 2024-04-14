import {app} from "../userService.js";
import supertest from 'supertest';


describe('Test de la méthode DELETE', () => {
  it("DELETE USER => code 200", function (done) {
    var tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGE1YjNiODQ4ODVkOGVmMmNjMTc1NCIsInBzZXVkbyI6Im5vbGFubmQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDk4MTc4MDksImV4cCI6MTc0MTM3NTQwOX0.ZBtxYWZS4aCXhhavaYoIaIiRIqJuNpjvBdj9ofcKvbk"
    var idUser ='65da5b3b84885d8ef2cc1755'
    supertest(app)
      .delete(`/user/delete/${idUser}`)
      .set('Authorization', 'Bearer ' + tokenTest) 
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});
