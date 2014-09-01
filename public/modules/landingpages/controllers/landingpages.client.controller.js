'use strict';

// Landingpages controller
angular.module('landingpages').controller('LandingpagesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Landingpages',
	function($scope, $stateParams, $location, Authentication, Landingpages ) {
		
        $scope.authentication = Authentication;
        
        
        if($scope.authentication.user === ''){
            $location.path('signin');
        }
        

       
        
		// Create new Landingpage
		$scope.create = function() {
			// Create new Landingpage object
			var landingpage = new Landingpages ({
                
				nome: this.nome,
                categoria: this.categoria,
                descricao: this.descricao,
                precoDe: this.precoDe,
                precoPara: this.precoPara,
                link: this.link,
                imagem: this.imagem
			});
            
            console.log('this', this);

			// Redirect after save
			landingpage.$save(function(response) {
                
				$location.path('admin/landingpages/' + response._id);

				// Clear form fields
				$scope.nome = '';
                $scope.descricao = '';
                $scope.categoria = '';
                $scope.precoDe = '';
                $scope.precoPara = '';
                $scope.link = ''; 
                $scope.imagem = '';
                
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Landingpage
		$scope.remove = function( landingpage ) {
			if ( landingpage ) { landingpage.$remove();

				for (var i in $scope.landingpages ) {
					if ($scope.landingpages [i] === landingpage ) {
						$scope.landingpages.splice(i, 1);
					}
				}
			} else {
				$scope.landingpage.$remove(function() {
					$location.path('admin/landingpages');
				});
			}
		};

		// Update existing Landingpage
		$scope.update = function() {
			var landingpage = $scope.landingpage ;

			landingpage.$update(function() {
				$location.path('admin/landingpages/' + landingpage._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Landingpages
		$scope.find = function() {
			$scope.landingpages = Landingpages.query();
		};

		// Find existing Landingpage
		$scope.findOne = function() {
			$scope.landingpage = Landingpages.get({ 
				landingpageId: $stateParams.landingpageId
			});
		};
	}
]);