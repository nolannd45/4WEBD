function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import axios from "axios";
import { BASE_URL_HOTEL, BASE_URL_TICKET, BASE_URL_LOGIN, BASE_URL_USER } from "../config";
export var API = /*#__PURE__*/ function() {
    "use strict";
    function API() {
        _class_call_check(this, API);
    }
    _create_class(API, null, [
        {
            key: "fetchById",
            value: function fetchById(id) {
                return _async_to_generator(function() {
                    var response;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    axios.get("".concat(BASE_URL_HOTEL, "/this/").concat(id))
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    response.data
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "fetchAllHotel",
            value: function fetchAllHotel() {
                return _async_to_generator(function() {
                    var response;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    axios.get("".concat(BASE_URL_HOTEL, "/read"))
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    response.data
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "userById",
            value: function userById(id) {
                return _async_to_generator(function() {
                    var response;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    axios.get("".concat(BASE_URL_USER, "/readById/").concat(id))
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    response.data
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "createTicket",
            value: //TICKET
            function createTicket(idHotel, startDate, endDate) {
                return _async_to_generator(function() {
                    var token, test, info;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                token = localStorage.getItem("token");
                                info = {
                                    idHotel: idHotel,
                                    dateStart: startDate,
                                    dateEnd: endDate
                                };
                                return [
                                    4,
                                    fetch("".concat(BASE_URL_TICKET, "/create"), {
                                        method: "POST",
                                        body: JSON.stringify(info),
                                        headers: {
                                            Authorization: "Bearer ".concat(token),
                                            "Content-Type": "application/json"
                                        }
                                    }).then(function(responseJson) {
                                        test = responseJson;
                                    }).catch(function(err) {
                                        console.log("caught it!", err);
                                    })
                                ];
                            case 1:
                                _state.sent();
                                if (!test.ok) return [
                                    3,
                                    2
                                ];
                                return [
                                    2,
                                    test
                                ];
                            case 2:
                                return [
                                    4,
                                    test.text().then(function(text) {
                                        return test = text;
                                    })
                                ];
                            case 3:
                                _state.sent();
                                return [
                                    2,
                                    test
                                ];
                            case 4:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "fetchTickets",
            value: function fetchTickets() {
                return _async_to_generator(function() {
                    var token, response, tickets, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                token = localStorage.getItem("token");
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    4,
                                    ,
                                    5
                                ]);
                                return [
                                    4,
                                    fetch("".concat(BASE_URL_TICKET, "/myTickets"), {
                                        method: "GET",
                                        headers: {
                                            Authorization: "Bearer ".concat(token),
                                            "Content-Type": "application/json"
                                        }
                                    })
                                ];
                            case 2:
                                response = _state.sent();
                                return [
                                    4,
                                    response.json()
                                ];
                            case 3:
                                tickets = _state.sent();
                                return [
                                    2,
                                    tickets
                                ];
                            case 4:
                                error = _state.sent();
                                console.log(error.response);
                                return [
                                    2,
                                    error.response
                                ];
                            case 5:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "deleteHotel",
            value: function deleteHotel(hotel) {
                return _async_to_generator(function() {
                    var token, vid, response;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                token = localStorage.getItem("token");
                                vid = {
                                    hotel: hotel
                                };
                                return [
                                    4,
                                    fetch("".concat(BASE_URL_HOTEL, "/delete/").concat(hotel.id), {
                                        method: "DELETE",
                                        body: JSON.stringify(vid),
                                        headers: {
                                            Authorization: "Bearer ".concat(token),
                                            "Content-Type": "application/json"
                                        }
                                    })
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    response.data
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "deleteTicket",
            value: function deleteTicket(id) {
                return _async_to_generator(function() {
                    var token, response;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                token = localStorage.getItem("token");
                                return [
                                    4,
                                    fetch("".concat(BASE_URL_TICKET, "/delete/").concat(id), {
                                        method: "DELETE",
                                        headers: {
                                            Authorization: "Bearer ".concat(token)
                                        }
                                    })
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    response.data
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "login",
            value: //CONNEXION
            function login(pseudo, password) {
                return _async_to_generator(function() {
                    var response, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    axios.post("".concat(BASE_URL_LOGIN), {
                                        pseudo: pseudo,
                                        password: password
                                    })
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    response.data
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    error.response.data
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "register",
            value: //a
            function register(pseudo, email, password) {
                return _async_to_generator(function() {
                    var error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                console.log(pseudo + " " + email + " " + password);
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    3,
                                    ,
                                    4
                                ]);
                                return [
                                    4,
                                    axios.post("".concat(BASE_URL_USER, "/create"), {
                                        email: email,
                                        pseudo: pseudo,
                                        password: password
                                    })
                                ];
                            case 2:
                                _state.sent();
                                return [
                                    3,
                                    4
                                ];
                            case 3:
                                error = _state.sent();
                                console.log(error.response);
                                return [
                                    2,
                                    error.response
                                ];
                            case 4:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "deleteUser",
            value: function deleteUser(id) {
                return _async_to_generator(function() {
                    var token, response;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                token = localStorage.getItem("token");
                                return [
                                    4,
                                    fetch("".concat(BASE_URL_USER, "/delete/").concat(id), {
                                        method: "DELETE",
                                        headers: {
                                            Authorization: "Bearer ".concat(token)
                                        }
                                    })
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    response.data
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "updateUser",
            value: //USER
            function updateUser(user) {
                return _async_to_generator(function() {
                    var token, test;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                token = localStorage.getItem("token");
                                return [
                                    4,
                                    fetch("".concat(BASE_URL_USER, "/update"), {
                                        method: "PATCH",
                                        body: JSON.stringify(user),
                                        headers: {
                                            Authorization: "Bearer ".concat(token),
                                            "Content-Type": "application/json"
                                        }
                                    }).then(function(responseJson) {
                                        test = responseJson;
                                    })
                                ];
                            case 1:
                                _state.sent();
                                return [
                                    2,
                                    test
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return API;
}();

//# sourceMappingURL=API.js.map