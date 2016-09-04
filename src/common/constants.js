/**
 * Created by Jared on Sep 03, 2016.
 */


var GET = {'get': {method: 'GET', isArray: true,crypt: true}};
var GETObject = {'get': {method: 'GET', isArray: false,crypt: true}};
var POST = {'post': {method: 'POST',crypt: true}};
var RootAPIUrl = "http://localhost:3000/";
var SessionLocalStorageKey = 'sessionId';

var API = {
    User : {
        Get: {
            Logout : "user/logout"
        },
        Post: {
            Auth: "user/auth"
        }
    },
    Video : {
        Get : {
            Videos : "videos",
            Video :  "video"
        },
        Post : {
            Rate : "video/ratings"
        }
    }
};