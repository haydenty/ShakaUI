myApp.controller("HeaderCtrl", ['$scope', '$location', 'UserAuthFactory',
  function ($scope, $location, UserAuthFactory) {

        $scope.isActive = function (route) {
            return route === $location.path();
        }

        $scope.logout = function () {
            UserAuthFactory.logout();
        }
  }
]);

myApp.controller("HomeCtrl", ['$scope','$http',
  function ($scope, $http) {
        $scope.name = "Home Controller";
        var self = $scope;
        self.latBox = 42.732667;
        self.longBox = -90.487580;
        self.messageBox = "First drop";
        self.CreateDrop = function () {
            $http({
                method: 'POST',
                url: 'http://ec2-52-89-103-111.us-west-2.compute.amazonaws.com:3000/api/v1/drop',
                headers: {
                     'Content-Type': 'application/json', //TODO can i use the TokenInterceptor
                    'X-Access-Token': sessionStorage.token                  
                },
                data: {
                    latitude: self.latBox,
                    longitude: self.longBox,
                    note: self.messageBox
                }
            }).then(function successCallback(response) {
                self.responseText = "Success";
            }, function errorCallback(response) {
                self.responseText = "Failed: " + response.message;
            });

        };
      self.GetCurrentLocation = function () {
          if (navigator.geolocation) {    navigator.geolocation.getCurrentPosition(self.showPosition);
    } 
          else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
      };
      
      self.showPosition = function(position){
        self.latBox = position.coords.latitude;
          self.longBox = position.coords.longitude;
      };
  }
]);

myApp.controller("EventListCtrl", ['$scope', 'dataFactory',
  function ($scope, dataFactory) {
        $scope.events = [];

        dataFactory.getEvents().then(function (data) {
            $scope.events = data.data;
        });

  }
]);