'use strict';

// Rsvps controller
angular.module('rsvps').controller('RsvpsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Rsvps',
	function($scope, $stateParams, $location, Authentication, Rsvps ) {
		$scope.authentication = Authentication;

            $scope.totalItems = 64;
          $scope.currentPage = 4;

          $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
          };

          $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
          };

          $scope.maxSize = 5;
          $scope.bigTotalItems = 175;
          $scope.bigCurrentPage = 1;


        // Create new Email
		$scope.create = function() {

            // Create new Email object
			var rsvp = new Rsvps ({
				rsvp: this.rsvp
			});

			// Redirect after save
			rsvp.$save(function(response) {

                $location.path('rsvps/' + response._id);



				// Clear form fields
				$scope.rsvp = '';


			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


//        $scope.getRsvps = [{a: 1, b:2}, {a:3, b:4}];

        $scope.getRsvps = function(){

            console.log($scope.rsvps);
            //return $scope.rsvps;

            var dados = [];


            for(var i in $scope.rsvps){

            	var date = new Date($scope.rsvps[i].created);
                // GET YYYY, MM AND DD FROM THE DATE OBJECT
				var yyyy = date.getFullYear().toString();
				var mm = (date.getMonth()+1).toString();
				var dd  = date.getDate().toString();

				// CONVERT mm AND dd INTO chars
				var mmChars = mm.split('');
				var ddChars = dd.split('');

				// CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
				var dateString = (ddChars[1]?dd:'0'+ddChars[0]) + '/' +  (mmChars[1]?mm:'0'+mmChars[0]) + '/' +  yyyy;

                dados[i] = {
                	a : $scope.rsvps[i].rsvp,
                	b : dateString
                };
            }

            return dados;//[{a: 1, b:2}, {a:3, b:4}];
        };




        // Create new Email
		$scope.createEmailOnHome = function() {
			// Create new Email object
			var rsvp = new Rsvps ({
				rsvp: this.rsvp
			});

			// Redirect after save
			rsvp.$save(function(response) {

                $scope.rsvpCreated = true;
				$location.path('sucesso');

				// Clear form fields
				$scope.rsvp = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Email
		$scope.remove = function( rsvp ) {
			if ( rsvp ) { rsvp.$remove();

				for (var i in $scope.rsvps ) {
					if ($scope.rsvps [i] === rsvp ) {
						$scope.rsvps.splice(i, 1);
					}
				}
			} else {
				$scope.rsvp.$remove(function() {
					$location.path('rsvps');
				});
			}
		};

		// Update existing Email
		$scope.update = function() {
			var rsvp = $scope.rsvp ;

			rsvp.$update(function() {
				$location.path('rsvps/' + rsvp._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Rsvps
		$scope.find = function() {
			$scope.rsvps = Rsvps.query();
		};


        // Find a list of Rsvps
		$scope.findLimit = function(limitArg) {

			$scope.rsvps = Rsvps.query();
		};


		// Find existing Email
		$scope.findOne = function() {
			$scope.rsvp = Rsvps.get({
				rsvpId: $stateParams.rsvpId
			});
		};
	}
]);