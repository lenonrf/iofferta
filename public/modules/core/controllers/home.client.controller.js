'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication', 'Landingpages',
	function($scope, $location, Authentication, Landingpages) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	


		// Find a list of Landingpages
		$scope.find = function() {

			switch($location.path()) {
			    case '/roupas':
			        $scope.selectCategoria('roupas');
			        break;
			    case '/eletronicos':
			        $scope.selectCategoria('eletronicos');
			        break;
			    case '/top':
			        $scope.selectTopItems('top');
			        break;
			    default:
			        $scope.findItems();
			}
		};



		$scope.findItems = function() {

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
          
		};




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










	}

]);