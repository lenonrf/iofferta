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