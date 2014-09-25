'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'iofferta';
	var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'angularFileUpload','ngCsv', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('sucesso', {
			url: '/sucesso',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('roupas', {
			url: '/roupas',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('eletronicos', {
			url: '/eletronicos',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('top', {
			url: '/top',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
        state('admin', {
			url: '/admin',
			templateUrl: 'modules/landingpages/views/list-landingpages.client.view.html'
		})
        ;
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication', 'Landingpages',
	function($scope, $location, Authentication, Landingpages) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	


		// Find a list of Landingpages
		$scope.find = function() {

			console.log($location.path());

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

        	console.log('AKI');

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
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

(function() {
	describe('HeaderController', function() {
		//Initialize global variables
		var scope,
			HeaderController;

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();

			HeaderController = $controller('HeaderController', {
				$scope: scope
			});
		}));

		it('should expose the authentication service', function() {
			expect(scope.authentication).toBeTruthy();
		});
	});
})();
'use strict';

(function() {
	describe('HomeController', function() {
		//Initialize global variables
		var scope,
			HomeController;

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();

			HomeController = $controller('HomeController', {
				$scope: scope
			});
		}));

		it('should expose the authentication service', function() {
			expect(scope.authentication).toBeTruthy();
		});
	});
})();
'use strict';

// Configuring the Articles module
angular.module('emails').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Emails', 'emails', 'dropdown', '/emails(/create)?');
		Menus.addSubMenuItem('topbar', 'emails', 'download', 'emails');
//		Menus.addSubMenuItem('topbar', 'emails', 'novo email', 'emails/create');
	}
]);
'use strict';

//Setting up route
angular.module('emails').config(['$stateProvider',
	function($stateProvider) {
		// Emails state routing
		$stateProvider.
		state('listEmails', {
			url: '/emails',
			templateUrl: 'modules/emails/views/list-emails.client.view.html'
		}).
		state('createEmail', {
			url: '/emails/create',
			templateUrl: 'modules/emails/views/create-email.client.view.html'
		}).
		state('viewEmail', {
			url: '/emails/:emailId',
			templateUrl: 'modules/emails/views/view-email.client.view.html'
		}).
		state('editEmail', {
			url: '/emails/:emailId/edit',
			templateUrl: 'modules/emails/views/edit-email.client.view.html'
		});
	}
]);
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

            	var date = new Date($scope.emails[i].created);
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
                	a : $scope.emails[i].email,
                	b : dateString
                };
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
				$location.path('sucesso');

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
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('emails');
'use strict';

//Emails service used to communicate Emails REST endpoints
angular.module('emails').factory('Emails', ['$resource',
	function($resource) {
		return $resource('emails/:emailId', 
            { 
                emailId: '@_id'
		    }, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

(function() {
	// Emails Controller Spec
	describe('Emails Controller Tests', function() {
		// Initialize global variables
		var EmailsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Emails controller.
			EmailsController = $controller('EmailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Email object fetched from XHR', inject(function(Emails) {
			// Create sample Email using the Emails service
			var sampleEmail = new Emails({
				name: 'New Email'
			});

			// Create a sample Emails array that includes the new Email
			var sampleEmails = [sampleEmail];

			// Set GET response
			$httpBackend.expectGET('emails').respond(sampleEmails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.emails).toEqualData(sampleEmails);
		}));

		it('$scope.findOne() should create an array with one Email object fetched from XHR using a emailId URL parameter', inject(function(Emails) {
			// Define a sample Email object
			var sampleEmail = new Emails({
				name: 'New Email'
			});

			// Set the URL parameter
			$stateParams.emailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/emails\/([0-9a-fA-F]{24})$/).respond(sampleEmail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.email).toEqualData(sampleEmail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Emails) {
			// Create a sample Email object
			var sampleEmailPostData = new Emails({
				name: 'New Email'
			});

			// Create a sample Email response
			var sampleEmailResponse = new Emails({
				_id: '525cf20451979dea2c000001',
				name: 'New Email'
			});

			// Fixture mock form input values
			scope.name = 'New Email';

			// Set POST response
			$httpBackend.expectPOST('emails', sampleEmailPostData).respond(sampleEmailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Email was created
			expect($location.path()).toBe('/emails/' + sampleEmailResponse._id);
		}));

		it('$scope.update() should update a valid Email', inject(function(Emails) {
			// Define a sample Email put data
			var sampleEmailPutData = new Emails({
				_id: '525cf20451979dea2c000001',
				name: 'New Email'
			});

			// Mock Email in scope
			scope.email = sampleEmailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/emails\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/emails/' + sampleEmailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid emailId and remove the Email from the scope', inject(function(Emails) {
			// Create new Email object
			var sampleEmail = new Emails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Emails array and include the Email
			scope.emails = [sampleEmail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/emails\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEmail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.emails.length).toBe(0);
		}));
	});
}());
'use strict';

// Configuring the Articles module
angular.module('landingpages').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Cadastro de Ofertas', 'landingpages', 'dropdown', 'admin/landingpages(/create)?');
		Menus.addSubMenuItem('topbar', 'landingpages', 'listar', 'admin/landingpages');
		Menus.addSubMenuItem('topbar', 'landingpages', 'nova', 'admin/landingpages/create');
	}
]);
'use strict';

//Setting up route
angular.module('landingpages').config(['$stateProvider',
	function($stateProvider) {
		// Landingpages state routing
		$stateProvider.
		state('listLandingpages', {
			url: '/admin/landingpages',
			templateUrl: 'modules/landingpages/views/list-landingpages.client.view.html'
		}).
		state('createLandingpage', {
			url: '/admin/landingpages/create',
			templateUrl: 'modules/landingpages/views/create-landingpage.client.view.html'
		}).
		state('viewLandingpage', {
			url: '/admin/landingpages/:landingpageId',
			templateUrl: 'modules/landingpages/views/view-landingpage.client.view.html'
		}).
		state('editLandingpage', {
			url: '/admin/landingpages/:landingpageId/edit',
			templateUrl: 'modules/landingpages/views/edit-landingpage.client.view.html'
		});
	}
]);
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
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('landingpages');
'use strict';

//Landingpages service used to communicate Landingpages REST endpoints
angular.module('landingpages').factory('Landingpages', ['$resource',
	function($resource) {
		return $resource('admin/landingpages/:landingpageId', { 
            landingpageId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},
            upload :{
                method: 'POST'
            }
		});
	}
]);
'use strict';

(function() {
	// Landingpages Controller Spec
	describe('Landingpages Controller Tests', function() {
		// Initialize global variables
		var LandingpagesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Landingpages controller.
			LandingpagesController = $controller('LandingpagesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Landingpage object fetched from XHR', inject(function(Landingpages) {
			// Create sample Landingpage using the Landingpages service
			var sampleLandingpage = new Landingpages({
				name: 'New Landingpage'
			});

			// Create a sample Landingpages array that includes the new Landingpage
			var sampleLandingpages = [sampleLandingpage];

			// Set GET response
			$httpBackend.expectGET('landingpages').respond(sampleLandingpages);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.landingpages).toEqualData(sampleLandingpages);
		}));

		it('$scope.findOne() should create an array with one Landingpage object fetched from XHR using a landingpageId URL parameter', inject(function(Landingpages) {
			// Define a sample Landingpage object
			var sampleLandingpage = new Landingpages({
				name: 'New Landingpage'
			});

			// Set the URL parameter
			$stateParams.landingpageId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/landingpages\/([0-9a-fA-F]{24})$/).respond(sampleLandingpage);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.landingpage).toEqualData(sampleLandingpage);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Landingpages) {
			// Create a sample Landingpage object
			var sampleLandingpagePostData = new Landingpages({
				name: 'New Landingpage'
			});

			// Create a sample Landingpage response
			var sampleLandingpageResponse = new Landingpages({
				_id: '525cf20451979dea2c000001',
				name: 'New Landingpage'
			});

			// Fixture mock form input values
			scope.name = 'New Landingpage';

			// Set POST response
			$httpBackend.expectPOST('landingpages', sampleLandingpagePostData).respond(sampleLandingpageResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Landingpage was created
			expect($location.path()).toBe('/landingpages/' + sampleLandingpageResponse._id);
		}));

		it('$scope.update() should update a valid Landingpage', inject(function(Landingpages) {
			// Define a sample Landingpage put data
			var sampleLandingpagePutData = new Landingpages({
				_id: '525cf20451979dea2c000001',
				name: 'New Landingpage'
			});

			// Mock Landingpage in scope
			scope.landingpage = sampleLandingpagePutData;

			// Set PUT response
			$httpBackend.expectPUT(/landingpages\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/landingpages/' + sampleLandingpagePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid landingpageId and remove the Landingpage from the scope', inject(function(Landingpages) {
			// Create new Landingpage object
			var sampleLandingpage = new Landingpages({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Landingpages array and include the Landingpage
			scope.landingpages = [sampleLandingpage];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/landingpages\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleLandingpage);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.landingpages.length).toBe(0);
		}));
	});
}());
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invlaid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/admin/landingpages');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/admin/landingpages');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid){
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);
	
				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [

	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

(function() {
	// Authentication controller Spec
	describe('AuthenticationController', function() {
		// Initialize global variables
		var AuthenticationController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Authentication controller
			AuthenticationController = $controller('AuthenticationController', {
				$scope: scope
			});
		}));


		it('$scope.signin() should login with a correct user and password', function() {
			// Test expected GET request
			$httpBackend.when('POST', '/auth/signin').respond(200, 'Fred');

			scope.signin();
			$httpBackend.flush();

			// Test scope value
			expect(scope.authentication.user).toEqual('Fred');
			expect($location.url()).toEqual('/');
		});

		it('$scope.signin() should fail to log in with nothing', function() {
			// Test expected POST request
			$httpBackend.expectPOST('/auth/signin').respond(400, {
				'message': 'Missing credentials'
			});

			scope.signin();
			$httpBackend.flush();

			// Test scope value
			expect(scope.error).toEqual('Missing credentials');
		});

		it('$scope.signin() should fail to log in with wrong credentials', function() {
			// Foo/Bar combo assumed to not exist
			scope.authentication.user = 'Foo';
			scope.credentials = 'Bar';

			// Test expected POST request
			$httpBackend.expectPOST('/auth/signin').respond(400, {
				'message': 'Unknown user'
			});

			scope.signin();
			$httpBackend.flush();

			// Test scope value
			expect(scope.error).toEqual('Unknown user');
		});

		it('$scope.signup() should register with correct data', function() {
			// Test expected GET request
			scope.authentication.user = 'Fred';
			$httpBackend.when('POST', '/auth/signup').respond(200, 'Fred');

			scope.signup();
			$httpBackend.flush();

			// test scope value
			expect(scope.authentication.user).toBe('Fred');
			expect(scope.error).toEqual(undefined);
			expect($location.url()).toBe('/');
		});

		it('$scope.signup() should fail to register with duplicate Username', function() {
			// Test expected POST request
			$httpBackend.when('POST', '/auth/signup').respond(400, {
				'message': 'Username already exists'
			});

			scope.signup();
			$httpBackend.flush();

			// Test scope value
			expect(scope.error).toBe('Username already exists');
		});
	});
}());
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
