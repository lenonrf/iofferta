'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication', 'Landingpages',
	function($scope, $location, Authentication, Landingpages) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	
        

        /**
         * Formata a url da imagem para se adequar ao google analytics
         */
        $scope.getImageURL = function(data) {

            var params = $location.$$url.split('&');
            var separador = '?';

            var utm_source = 'Iofferta'
            var utm_medium = 'Vitrine'
            var utm_term = data.nome
            var utm_content = data.nome
            var utm_campaign =  $scope.getCampaing(params);

            if(data.link.indexOf('?') > -1){
                separador = '&';
            }
    
            data.link += separador+'utm_source='+utm_source+'&utm_medium='+utm_medium+'&utm_term='+utm_term+'&utm_content='+utm_content+'&utm_campaign='+utm_campaign;

            //console.log('data.link', encodeURI(data.link));

            return encodeURI(data.link);
        };
        


        /**
         * Vascula a URL a procura do parametro de camapanha
         */
        $scope.getCampaing = function(params) {
            
            var utm_campaign = '';

            for( var i=0; i<params.length; i++ ){

                if(params[i].indexOf('utm_campaign') > -1){
                
                    var campaign = params[i].split('=');
                    utm_campaign = campaign[1];
                }
            }

            return 'Iofferta_'+utm_campaign;

        };





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
			        $scope.selectTopItems();
			}
		};



		$scope.findItems = function() {

			$scope.landingpages = Landingpages.query(function(data){


                for( var i=0; i<data.length; i++ ){

                    data[i].link = $scope.getImageURL(data[i]);

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

                        data[i].link = $scope.getImageURL(data[i]);
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

                        data[i].link = $scope.getImageURL(data[i]);
                        itemsFiltrados.push(data[i]);
                    }

                }

                $scope.categoria = categoria;
                $scope.landingpages = itemsFiltrados;  

            });
        };
	}

]);