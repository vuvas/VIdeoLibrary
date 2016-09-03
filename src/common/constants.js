/**
 * Created by Jared on Sep 03, 2016.
 */

var GETObject = {'get': {method: 'GET', isArray: false,crypt: true}};
var GET = {'get': {method: 'GET', isArray: true,crypt: true}};
var POST = {'post': {method: 'POST',crypt: true}};
var RootAPIUrl = "http://localhost:6778/api/";

var API = {
    Get : {
        AllRestaurants : "Values/GetAllRestaurants"
    },
    Post : {
        SaveRestaurant : "Values/SaveRestaurant"
    }
};