'use strict';

// Emails controller
angular.module('emails').controller('EmailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Emails',
	function($scope, $stateParams, $location, Authentication, Emails ) {
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
			var email = new Emails ({
				email: this.email
			});

			// Redirect after save
			email.$save(function(response) {
				
                $location.path('emails/' + response._id);
                
                

				// Clear form fields
				$scope.email = '';
                
                
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
        
        
//        $scope.getEmails = [{a: 1, b:2}, {a:3, b:4}];
        
        $scope.getEmails = function(){
            
            console.log($scope.emails);
            //return $scope.emails;
            
            var dados = [];            
            for(var i in $scope.emails){
                dados[i] = { a : $scope.emails[i].email};
            }
            
            return dados;//[{a: 1, b:2}, {a:3, b:4}];
        };
        
        
        
        
        // Create new Email
		$scope.createEmailOnHome = function() {
			// Create new Email object
			var email = new Emails ({
				email: this.email
			});

			// Redirect after save
			email.$save(function(response) {
                
                $scope.emailCreated = true;
				$location.path('home');

				// Clear form fields
				$scope.email = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Email
		$scope.remove = function( email ) {
			if ( email ) { email.$remove();

				for (var i in $scope.emails ) {
					if ($scope.emails [i] === email ) {
						$scope.emails.splice(i, 1);
					}
				}
			} else {
				$scope.email.$remove(function() {
					$location.path('emails');
				});
			}
		};

		// Update existing Email
		$scope.update = function() {
			var email = $scope.email ;

			email.$update(function() {
				$location.path('emails/' + email._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Emails
		$scope.find = function() {
			$scope.emails = Emails.query();
		};
        
        
        // Find a list of Emails
		$scope.findLimit = function(limitArg) {
            
			$scope.emails = Emails.query();
		};
        

		// Find existing Email
		$scope.findOne = function() {
			$scope.email = Emails.get({ 
				emailId: $stateParams.emailId
			});
		};
	}
]);