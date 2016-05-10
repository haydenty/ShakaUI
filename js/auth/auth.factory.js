myApp.factory('AuthenticationFactory', function ($window) {
    var auth = {
        isLogged: false,
        check: function () {
            if ($window.localStorage.token && $window.localStorage.user) {
                this.isLogged = true;
            } else {
                this.isLogged = false;
                delete this.user;
            }
        }
    }
    return auth;
});

myApp.factory('UserAuthFactory', function ($window, $location, $http, AuthenticationFactory) {
    return {
        login: function (username, password) {
            return $http.post('http://ec2-52-89-103-111.us-west-2.compute.amazonaws.com:3000/login', {
                username: username,
                password: password
            });
        },
        logout: function () {
            if (AuthenticationFactory.isLogged) {
                AuthenticationFactory.isLogged = false;
                delete AuthenticationFactory.user;
                delete AuthenticationFactory.userRole;
                delete $window.localStorage.token;
                delete $window.localStorage.user;
                delete $window.localStorage.userRole;
                $location.path("/login");
            }
        },
        register: function (firstname, lastname, email, username, password) {
            return $http.post('http://ec2-52-89-103-111.us-west-2.compute.amazonaws.com:3000/register', {
                first_name: firstname,
                last_name: lastname,
                email: email,
                username: username,
                password: password
            });
        }
    }
});
myApp.factory('TokenInterceptor', function ($q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.localStorage.token) {
                config.headers['X-Access-Token'] = $window.localStorage.token;
                config.headers['Content-Type'] = "application/json";
            }
            return config || $q.when(config);
        },
        response: function (response) {
            return response || $q.when(response);
        }
    };
});