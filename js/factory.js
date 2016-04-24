myApp.factory('dataFactory', function ($http) {
    /** https://docs.angularjs.org/guide/providers **/
    var urlBase = 'http://ec2-52-89-103-111.us-west-2.compute.amazonaws.com:3000/api/v1/drops';
    var _eventFactory = {};

    _eventFactory.getEvents = function () {
        return $http.get(urlBase);
    };

    return _eventFactory;
});