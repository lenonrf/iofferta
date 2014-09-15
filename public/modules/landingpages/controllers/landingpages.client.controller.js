'use strict';

// Landingpages controller
angular.module('landingpages').controller('LandingpagesController', ['$scope', '$http', '$upload', '$stateParams', '$location', 'Authentication', 'Landingpages',
	function($scope, $http, $upload, $stateParams, $location, Authentication, Landingpages ) {
		
        $scope.authentication = Authentication;
        $scope.loadingImage = 0;
        
        
        if($scope.authentication.user === ''){

            if($location.path() !== '/'){
                $location.path('signin');    
            }
            
        }
        
        $scope.selectTopItems = function(filtro){

            angular.element( document.getElementById('eletronicos') ).addClass('menu');
            angular.element( document.getElementById('eletronicos') ).css('color', '');

            angular.element( document.getElementById('roupas') ).addClass('menu');
            angular.element( document.getElementById('roupas') ).css('color', '');
            
            angular.element( document.getElementById('top') ).css('color', '#219acc');

            $scope.landingpages = Landingpages.query(function(data){

                var itemsFiltrados = [];  

                for( var i=0; i<data.length; i++ ){

                    if(data[i].top){
                        
                        if(data[i].precoPara.indexOf(',') > -1){
                            
                            var str = data[i].precoPara.split(',');

                            data[i].precoParaInteiro = str[0];
                            data[i].precoParaCentavos = ','+str[1];

                        }else{
                            data[i].precoParaInteiro = data[i].precoPara;
                        }


                        itemsFiltrados.push(data[i]);


                    }
                }

                $scope.filtro = filtro;
                $scope.landingpages = itemsFiltrados;  

            });
        };





        $scope.selectCategoria = function(categoria){

            //document.getElementById('top').style.color = "#219acc;";
            angular.element( document.getElementById('top') ).addClass('menu');
            angular.element( document.getElementById('top') ).css('color', '');

            angular.element( document.getElementById('eletronicos') ).addClass('menu');
            angular.element( document.getElementById('eletronicos') ).css('color', '');

            angular.element( document.getElementById('roupas') ).addClass('menu');
            angular.element( document.getElementById('roupas') ).css('color', '');

            angular.element( document.getElementById(categoria) ).css('color', '#219acc');

            //console.log(angular.element( document.getElementById('top')).css('color', 'black'));

            $scope.landingpages = Landingpages.query(function(data){

                var itemsFiltrados = [];  

                for( var i=0; i<data.length; i++ ){

                    if(data[i].categoria === categoria){
                        

                        if(data[i].precoPara.indexOf(',') > -1){
                            
                            var str = data[i].precoPara.split(',');

                            data[i].precoParaInteiro = str[0];
                            data[i].precoParaCentavos = ','+str[1];

                        }else{
                            data[i].precoParaInteiro = data[i].precoPara;
                        }


                        itemsFiltrados.push(data[i]);
                    }

                }

                $scope.categoria = categoria;
                $scope.landingpages = itemsFiltrados;  

            });
        };
        
    
       
        
		// Create new Landingpage
		$scope.create = function() {
			

            var novidadeArg = false;

            if(this.novidade){
                novidadeArg =true;
            }

            var topArg = false;

            if(this.top){
                topArg =true;
            }
            
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
                novidade: novidadeArg,
                top: topArg
			});


            // console.log('OBJ', landingpage);

			// Redirect after save
			landingpage.$save(function(response) {
                
				//$location.path('admin/landingpages/' + response._id);

                $location.path('admin/landingpages');

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
                $scope.top = '';

                
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

            $scope.landingpage.imagem = $scope.imagem;
            
			var landingpage = $scope.landingpage ;

			landingpage.$update(function() {
				$location.path('admin/landingpages');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Landingpages
		$scope.find = function() {

			$scope.landingpages = Landingpages.query(function(data){


                for( var i=0; i<data.length; i++ ){

                    if(data[i].precoPara.indexOf(',') > -1){
                        
                        var str = data[i].precoPara.split(',');

                        data[i].precoParaInteiro = str[0];
                        data[i].precoParaCentavos = ','+str[1];

                    }else{
                        data[i].precoParaInteiro = data[i].precoPara;
                    }
              
                }

            });

            //console.log('ITENS', $scope.landingpages);
		};


    


		// Find existing Landingpage
		$scope.findOne = function() {

            $scope.showImage = true;

			$scope.landingpage = Landingpages.get({ 
				landingpageId: $stateParams.landingpageId
			});
		};



                // Find existing Landingpage
        $scope.findByCategoria = function() {

            $scope.showImage = true;

            $scope.landingpage = Landingpages.get({ 
                categoria: $stateParams.categoria
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

                var location = $location.path();

                if(location !== '/admin/landingpages/create'){
                    if($scope.landingpage.imagem){
                        $scope.landingpage.imagem = $scope.imagem;
                    }
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