myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
  function ($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
        $scope.user = {
            username: '',
            password: '', //pass123 - bobmarley
            verifypassword: '',
            email: '',
            firstname: '',
            lastname: ''
        };
      $scope.errorMessage = '';

        $scope.login = function () {

            var username = $scope.user.username,
                password = $scope.user.password;

            if (username !== undefined && password !== undefined) {
                UserAuthFactory.login(username, password).success(function (data) {

                    AuthenticationFactory.isLogged = true;
                    AuthenticationFactory.user = data.user.username;
                    AuthenticationFactory.userRole = data.user.role;

                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.user = data.user.username; // to fetch the user details on refresh
                    $window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh

                    $location.path("/");

                }).error(function (status) {
                    alert('Oops something went wrong!');
                });
            } else {
                alert('Invalid credentials');
            }

        };

        $scope.register = function () {
            var username = $scope.user.username,
                password = $scope.user.password,
                vpassword = $scope.user.verifypassword,
                email = $scope.user.email,
                firstname = $scope.user.firstname,
                lastname = $scope.user.lastname;
            if (password == vpassword) {
                if (username !== '' && password !== '' && firstname !== '' && lastname !== '') {
                    UserAuthFactory.register(firstname, lastname, email, username, password).success(function (data) {
                        $scope.login();
                    }).error(function (status) {
                        alert('Oops something went wrong, when we tried to create your account try again please' + status);
                    });
                }
                else {
                 $scope.errorMessage = 'Make sure to fill everything in, cheers!';
                }
            } else {
            $scope.errorMessage = "Passwords don't match";
            }
        };

  }
]);