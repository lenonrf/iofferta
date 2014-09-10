'use strict';

// Landingpages controller
angular.module('landingpages').controller('LandingpagesController', ['$scope', '$http', '$upload', '$stateParams', '$location', 'Authentication', 'Landingpages',
	function($scope, $http, $upload, $stateParams, $location, Authentication, Landingpages ) {
		
        $scope.authentication = Authentication;
        $scope.loadingImage = 0;
        
        
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
                imagem: this.imagem,
                desconto: this.desconto,
                novidade: this.novidade
			});


            console.log('OBJ', landingpage);

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
                $scope.desconto = '';
                $scope.novidade = '';

                
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

        
        
        
        
        
		// Remove existing Landingpage
		$scope.remove = function( landingpage ) {
            
            console.log(landingpage);
            
            
			if ( landingpage ) { 
                
                landingpage.$remove();

				for (var i in $scope.landingpages ) {
					if ($scope.landingpages [i] === landingpage ) {
						$scope.landingpages.splice(i, 1);
					}
				}
                
                $location.path('admin/landingpages');
                                
                                
			} else {
				$scope.landingpage.$remove(function() {
					$location.path('admin/landingpages');
				});
			}
		};
        
        
        
        
        
        
        

		// Update existing Landingpage
		$scope.update = function() {

            console.log('IMAGEM', $scope.imagem);

            $scope.landingpage.imagem = $scope.imagem;
            
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


        
        $scope.findByNovidade = function() {
            $scope.landingpage = Landingpages.get({ 
                novidade: true
            });
        };



		// Find existing Landingpage
		$scope.findOne = function() {

            $scope.showImage = true;

			$scope.landingpage = Landingpages.get({ 
				landingpageId: $stateParams.landingpageId
			});
		};
        
        
        
        
        
        
        
        
        
        
    // -----------------------------------------------------------------
        
        
        
     $scope.onFileSelect = function($files) {

        

        if($files.length === 0){

            //console.log($scope.imagem);
            $scope.deleteFile();


        }else{

            var file = $files[0];

            $scope.upload = $upload.upload({
                
                url: '/admin/landingpages/upload',
                method: 'POST',            
                data: { myObj: $scope.landingpages },
                file: file,
              
            }).progress(function(evt) {

                $scope.loadingImage = parseInt(100.0 * evt.loaded / evt.total);
              
            }).success(function(data, status, headers, config) {

                
                $scope.imagem = data.fileName;
                $scope.showImage = true;

                if($scope.landingpage.imagem){
                    $scope.landingpage.imagem = $scope.imagem;
                }

            }); 

        } 
        
      };


      $scope.deleteFile = function() {

            /*

            console.log('FUNCTION');

            $http({

                url:'/admin/landingpages/upload', 
                method: 'DELETE',
                params: { 'imagem': $scope.imagem }
            
            }).success(function(data, status, headers, config) {

                console.log('SUCCESS');
            */
                document.getElementById('imagemId').value = '';
                $scope.imagem = '';
                $scope.loadingImage = 0;
                $scope.showImage = false;
            /*
            }).error(function(data, status, headers, config) {

                console.log('ERROR');
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
            });
            */
          
      };





    }
]);