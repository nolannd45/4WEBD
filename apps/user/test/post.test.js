import supertest from "supertest";
import {app} from "../userService.js";
// test POST
describe("POST /", function() {
  it("Login => code 200", function(done) {
    supertest(app)
      .post("/login")
      .send({"pseudo": "nolannd", "password": "nolannd"})
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });


  it("Create User => code 201", function(done) {  
      supertest(app)
        .post("/user/create")
        .send({"email": "tes3t@test3.fr", "pseudo": "test3", "password": "test3"})
        .expect(201)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });

});