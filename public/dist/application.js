'use strict';
var ApplicationConfiguration = function () {
    var applicationModuleName = 'mean', applicationModuleVendorDependencies = [
        'ngResource',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'angularFileUpload',
        'ngCsv',
        'ui.utils'
      ], registerModule = function (moduleName, dependencies) {
        angular.module(moduleName, dependencies || []), angular.module(applicationModuleName).requires.push(moduleName);
      };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies), angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]), angular.element(document).ready(function () {
  '#_=_' === window.location.hash && (window.location.hash = '#!'), angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
}), ApplicationConfiguration.registerModule('core'), ApplicationConfiguration.registerModule('emails'), ApplicationConfiguration.registerModule('landingpages'), ApplicationConfiguration.registerModule('users'), angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/'), $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    }).state('sucesso', {
      url: '/sucesso',
      templateUrl: 'modules/core/views/home.client.view.html'
    }).state('roupas', {
      url: '/roupas',
      templateUrl: 'modules/core/views/home.client.view.html'
    }).state('eletronicos', {
      url: '/eletronicos',
      templateUrl: 'modules/core/views/home.client.view.html'
    }).state('top', {
      url: '/top',
      templateUrl: 'modules/core/views/home.client.view.html'
    }).state('admin', {
      url: '/admin',
      templateUrl: 'modules/landingpages/views/list-landingpages.client.view.html'
    });
  }
]), angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication, $scope.isCollapsed = !1, $scope.menu = Menus.getMenu('topbar'), $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    }, $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = !1;
    });
  }
]), angular.module('core').controller('HomeController', [
  '$scope',
  '$location',
  'Authentication',
  'Landingpages',
  function ($scope, $location, Authentication, Landingpages) {
    $scope.authentication = Authentication, $scope.find = function () {
      switch (console.log($location.path()), $location.path()) {
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
    }, $scope.findItems = function () {
      $scope.landingpages = Landingpages.query(function (data) {
        for (var i = 0; i < data.length; i++)
          if (data[i].precoPara.indexOf(',') > -1) {
            var str = data[i].precoPara.split(',');
            data[i].precoParaInteiro = str[0], data[i].precoParaCentavos = ',' + str[1];
          } else
            data[i].precoParaInteiro = data[i].precoPara;
      });
    }, $scope.selectTopItems = function (filtro) {
      console.log('AKI'), angular.element(document.getElementById('eletronicos')).addClass('menu'), angular.element(document.getElementById('eletronicos')).css('color', ''), angular.element(document.getElementById('roupas')).addClass('menu'), angular.element(document.getElementById('roupas')).css('color', ''), angular.element(document.getElementById('top')).css('color', '#219acc'), $scope.landingpages = Landingpages.query(function (data) {
        for (var itemsFiltrados = [], i = 0; i < data.length; i++)
          if (data[i].top) {
            if (data[i].precoPara.indexOf(',') > -1) {
              var str = data[i].precoPara.split(',');
              data[i].precoParaInteiro = str[0], data[i].precoParaCentavos = ',' + str[1];
            } else
              data[i].precoParaInteiro = data[i].precoPara;
            itemsFiltrados.push(data[i]);
          }
        $scope.filtro = filtro, $scope.landingpages = itemsFiltrados;
      });
    }, $scope.selectCategoria = function (categoria) {
      angular.element(document.getElementById('top')).addClass('menu'), angular.element(document.getElementById('top')).css('color', ''), angular.element(document.getElementById('eletronicos')).addClass('menu'), angular.element(document.getElementById('eletronicos')).css('color', ''), angular.element(document.getElementById('roupas')).addClass('menu'), angular.element(document.getElementById('roupas')).css('color', ''), angular.element(document.getElementById(categoria)).css('color', '#219acc'), $scope.landingpages = Landingpages.query(function (data) {
        for (var itemsFiltrados = [], i = 0; i < data.length; i++)
          if (data[i].categoria === categoria) {
            if (data[i].precoPara.indexOf(',') > -1) {
              var str = data[i].precoPara.split(',');
              data[i].precoParaInteiro = str[0], data[i].precoParaCentavos = ',' + str[1];
            } else
              data[i].precoParaInteiro = data[i].precoPara;
            itemsFiltrados.push(data[i]);
          }
        $scope.categoria = categoria, $scope.landingpages = itemsFiltrados;
      });
    };
  }
]), angular.module('core').service('Menus', [function () {
    this.defaultRoles = ['*'], this.menus = {};
    var shouldRender = function (user) {
      if (!user)
        return this.isPublic;
      if (~this.roles.indexOf('*'))
        return !0;
      for (var userRoleIndex in user.roles)
        for (var roleIndex in this.roles)
          if (this.roles[roleIndex] === user.roles[userRoleIndex])
            return !0;
      return !1;
    };
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId])
          return !0;
        throw new Error('Menu does not exists');
      }
      throw new Error('MenuId was not provided');
    }, this.getMenu = function (menuId) {
      return this.validateMenuExistance(menuId), this.menus[menuId];
    }, this.addMenu = function (menuId, isPublic, roles) {
      return this.menus[menuId] = {
        isPublic: isPublic || !1,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      }, this.menus[menuId];
    }, this.removeMenu = function (menuId) {
      this.validateMenuExistance(menuId), delete this.menus[menuId];
    }, this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
      return this.validateMenuExistance(menuId), this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: null === isPublic || 'undefined' == typeof isPublic ? this.menus[menuId].isPublic : isPublic,
        roles: null === roles || 'undefined' == typeof roles ? this.menus[menuId].roles : roles,
        position: position || 0,
        items: [],
        shouldRender: shouldRender
      }), this.menus[menuId];
    }, this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
      this.validateMenuExistance(menuId);
      for (var itemIndex in this.menus[menuId].items)
        this.menus[menuId].items[itemIndex].link === rootMenuItemURL && this.menus[menuId].items[itemIndex].items.push({
          title: menuItemTitle,
          link: menuItemURL,
          uiRoute: menuItemUIRoute || '/' + menuItemURL,
          isPublic: null === isPublic || 'undefined' == typeof isPublic ? this.menus[menuId].items[itemIndex].isPublic : isPublic,
          roles: null === roles || 'undefined' == typeof roles ? this.menus[menuId].items[itemIndex].roles : roles,
          position: position || 0,
          shouldRender: shouldRender
        });
      return this.menus[menuId];
    }, this.removeMenuItem = function (menuId, menuItemURL) {
      this.validateMenuExistance(menuId);
      for (var itemIndex in this.menus[menuId].items)
        this.menus[menuId].items[itemIndex].link === menuItemURL && this.menus[menuId].items.splice(itemIndex, 1);
      return this.menus[menuId];
    }, this.removeSubMenuItem = function (menuId, submenuItemURL) {
      this.validateMenuExistance(menuId);
      for (var itemIndex in this.menus[menuId].items)
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items)
          this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL && this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
      return this.menus[menuId];
    }, this.addMenu('topbar');
  }]), angular.module('emails').run([
  'Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', 'Emails', 'emails', 'dropdown', '/emails(/create)?'), Menus.addSubMenuItem('topbar', 'emails', 'download', 'emails');
  }
]), angular.module('emails').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('listEmails', {
      url: '/emails',
      templateUrl: 'modules/emails/views/list-emails.client.view.html'
    }).state('createEmail', {
      url: '/emails/create',
      templateUrl: 'modules/emails/views/create-email.client.view.html'
    }).state('viewEmail', {
      url: '/emails/:emailId',
      templateUrl: 'modules/emails/views/view-email.client.view.html'
    }).state('editEmail', {
      url: '/emails/:emailId/edit',
      templateUrl: 'modules/emails/views/edit-email.client.view.html'
    });
  }
]), angular.module('emails').controller('EmailsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Emails',
  function ($scope, $stateParams, $location, Authentication, Emails) {
    $scope.authentication = Authentication, $scope.totalItems = 64, $scope.currentPage = 4, $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    }, $scope.pageChanged = function () {
      console.log('Page changed to: ' + $scope.currentPage);
    }, $scope.maxSize = 5, $scope.bigTotalItems = 175, $scope.bigCurrentPage = 1, $scope.create = function () {
      var email = new Emails({ email: this.email });
      email.$save(function (response) {
        $location.path('emails/' + response._id), $scope.email = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }, $scope.getEmails = function () {
      console.log($scope.emails);
      var dados = [];
      for (var i in $scope.emails) {
        var date = new Date($scope.emails[i].created), yyyy = date.getFullYear().toString(), mm = (date.getMonth() + 1).toString(), dd = date.getDate().toString(), mmChars = mm.split(''), ddChars = dd.split(''), dateString = (ddChars[1] ? dd : '0' + ddChars[0]) + '/' + (mmChars[1] ? mm : '0' + mmChars[0]) + '/' + yyyy;
        dados[i] = {
          a: $scope.emails[i].email,
          b: dateString
        };
      }
      return dados;
    }, $scope.createEmailOnHome = function () {
      var email = new Emails({ email: this.email });
      email.$save(function () {
        $scope.emailCreated = !0, $location.path('sucesso'), $scope.email = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }, $scope.remove = function (email) {
      if (email) {
        email.$remove();
        for (var i in $scope.emails)
          $scope.emails[i] === email && $scope.emails.splice(i, 1);
      } else
        $scope.email.$remove(function () {
          $location.path('emails');
        });
    }, $scope.update = function () {
      var email = $scope.email;
      email.$update(function () {
        $location.path('emails/' + email._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }, $scope.find = function () {
      $scope.emails = Emails.query();
    }, $scope.findLimit = function () {
      $scope.emails = Emails.query();
    }, $scope.findOne = function () {
      $scope.email = Emails.get({ emailId: $stateParams.emailId });
    };
  }
]), angular.module('emails').factory('Emails', [
  '$resource',
  function ($resource) {
    return $resource('emails/:emailId', { emailId: '@_id' }, { update: { method: 'PUT' } });
  }
]), angular.module('landingpages').run([
  'Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', 'Cadastro de Ofertas', 'landingpages', 'dropdown', 'admin/landingpages(/create)?'), Menus.addSubMenuItem('topbar', 'landingpages', 'listar', 'admin/landingpages'), Menus.addSubMenuItem('topbar', 'landingpages', 'nova', 'admin/landingpages/create');
  }
]), angular.module('landingpages').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('listLandingpages', {
      url: '/admin/landingpages',
      templateUrl: 'modules/landingpages/views/list-landingpages.client.view.html'
    }).state('createLandingpage', {
      url: '/admin/landingpages/create',
      templateUrl: 'modules/landingpages/views/create-landingpage.client.view.html'
    }).state('viewLandingpage', {
      url: '/admin/landingpages/:landingpageId',
      templateUrl: 'modules/landingpages/views/view-landingpage.client.view.html'
    }).state('editLandingpage', {
      url: '/admin/landingpages/:landingpageId/edit',
      templateUrl: 'modules/landingpages/views/edit-landingpage.client.view.html'
    });
  }
]), angular.module('landingpages').controller('LandingpagesController', [
  '$scope',
  '$http',
  '$upload',
  '$stateParams',
  '$location',
  'Authentication',
  'Landingpages',
  function ($scope, $http, $upload, $stateParams, $location, Authentication, Landingpages) {
    $scope.authentication = Authentication, $scope.loadingImage = 0, '' === $scope.authentication.user && '/' !== $location.path() && $location.path('signin'), $scope.selectTopItems = function (filtro) {
      angular.element(document.getElementById('eletronicos')).addClass('menu'), angular.element(document.getElementById('eletronicos')).css('color', ''), angular.element(document.getElementById('roupas')).addClass('menu'), angular.element(document.getElementById('roupas')).css('color', ''), angular.element(document.getElementById('top')).css('color', '#219acc'), $scope.landingpages = Landingpages.query(function (data) {
        for (var itemsFiltrados = [], i = 0; i < data.length; i++)
          if (data[i].top) {
            if (data[i].precoPara.indexOf(',') > -1) {
              var str = data[i].precoPara.split(',');
              data[i].precoParaInteiro = str[0], data[i].precoParaCentavos = ',' + str[1];
            } else
              data[i].precoParaInteiro = data[i].precoPara;
            itemsFiltrados.push(data[i]);
          }
        $scope.filtro = filtro, $scope.landingpages = itemsFiltrados;
      });
    }, $scope.selectCategoria = function (categoria) {
      angular.element(document.getElementById('top')).addClass('menu'), angular.element(document.getElementById('top')).css('color', ''), angular.element(document.getElementById('eletronicos')).addClass('menu'), angular.element(document.getElementById('eletronicos')).css('color', ''), angular.element(document.getElementById('roupas')).addClass('menu'), angular.element(document.getElementById('roupas')).css('color', ''), angular.element(document.getElementById(categoria)).css('color', '#219acc'), $scope.landingpages = Landingpages.query(function (data) {
        for (var itemsFiltrados = [], i = 0; i < data.length; i++)
          if (data[i].categoria === categoria) {
            if (data[i].precoPara.indexOf(',') > -1) {
              var str = data[i].precoPara.split(',');
              data[i].precoParaInteiro = str[0], data[i].precoParaCentavos = ',' + str[1];
            } else
              data[i].precoParaInteiro = data[i].precoPara;
            itemsFiltrados.push(data[i]);
          }
        $scope.categoria = categoria, $scope.landingpages = itemsFiltrados;
      });
    }, $scope.create = function () {
      var novidadeArg = !1;
      this.novidade && (novidadeArg = !0);
      var topArg = !1;
      this.top && (topArg = !0);
      var landingpage = new Landingpages({
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
      landingpage.$save(function () {
        $location.path('admin/landingpages'), $scope.nome = '', $scope.descricao = '', $scope.categoria = '', $scope.precoDe = '', $scope.precoPara = '', $scope.link = '', $scope.imagem = '', $scope.desconto = '', $scope.novidade = '', $scope.top = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }, $scope.remove = function (landingpage) {
      if (console.log(landingpage), landingpage) {
        landingpage.$remove();
        for (var i in $scope.landingpages)
          $scope.landingpages[i] === landingpage && $scope.landingpages.splice(i, 1);
        $location.path('admin/landingpages');
      } else
        $scope.landingpage.$remove(function () {
          $location.path('admin/landingpages');
        });
    }, $scope.update = function () {
      $scope.landingpage.imagem = $scope.imagem;
      var landingpage = $scope.landingpage;
      landingpage.$update(function () {
        $location.path('admin/landingpages');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }, $scope.find = function () {
      $scope.landingpages = Landingpages.query(function (data) {
        for (var i = 0; i < data.length; i++)
          if (data[i].precoPara.indexOf(',') > -1) {
            var str = data[i].precoPara.split(',');
            data[i].precoParaInteiro = str[0], data[i].precoParaCentavos = ',' + str[1];
          } else
            data[i].precoParaInteiro = data[i].precoPara;
      });
    }, $scope.findOne = function () {
      $scope.showImage = !0, $scope.landingpage = Landingpages.get({ landingpageId: $stateParams.landingpageId });
    }, $scope.findByCategoria = function () {
      $scope.showImage = !0, $scope.landingpage = Landingpages.get({ categoria: $stateParams.categoria });
    }, $scope.onFileSelect = function ($files) {
      if (0 === $files.length)
        $scope.deleteFile();
      else {
        var file = $files[0];
        $scope.upload = $upload.upload({
          url: '/admin/landingpages/upload',
          method: 'POST',
          data: { myObj: $scope.landingpages },
          file: file
        }).progress(function (evt) {
          $scope.loadingImage = parseInt(100 * evt.loaded / evt.total);
        }).success(function (data) {
          $scope.imagem = data.fileName, $scope.showImage = !0;
          var location = $location.path();
          '/admin/landingpages/create' !== location && $scope.landingpage.imagem && ($scope.landingpage.imagem = $scope.imagem);
        });
      }
    }, $scope.deleteFile = function () {
      document.getElementById('imagemId').value = '', $scope.imagem = '', $scope.loadingImage = 0, $scope.showImage = !1;
    };
  }
]), angular.module('landingpages').factory('Landingpages', [
  '$resource',
  function ($resource) {
    return $resource('admin/landingpages/:landingpageId', { landingpageId: '@_id' }, {
      update: { method: 'PUT' },
      upload: { method: 'POST' }
    });
  }
]), angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              Authentication.user = null, $location.path('signin');
              break;
            case 403:
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]), angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/authentication/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/authentication/signin.client.view.html'
    }).state('forgot', {
      url: '/password/forgot',
      templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
    }).state('reset-invlaid', {
      url: '/password/reset/invalid',
      templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
    }).state('reset-success', {
      url: '/password/reset/success',
      templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
    }).state('reset', {
      url: '/password/reset/:token',
      templateUrl: 'modules/users/views/password/reset-password.client.view.html'
    });
  }
]), angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication, $scope.authentication.user && $location.path('/'), $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        $scope.authentication.user = response, $location.path('/admin/landingpages');
      }).error(function (response) {
        $scope.error = response.message;
      });
    }, $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        $scope.authentication.user = response, $location.path('/admin/landingpages');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]), angular.module('users').controller('PasswordController', [
  '$scope',
  '$stateParams',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $stateParams, $http, $location, Authentication) {
    $scope.authentication = Authentication, $scope.authentication.user && $location.path('/'), $scope.askForPasswordReset = function () {
      $scope.success = $scope.error = null, $http.post('/auth/forgot', $scope.credentials).success(function (response) {
        $scope.credentials = null, $scope.success = response.message;
      }).error(function (response) {
        $scope.credentials = null, $scope.error = response.message;
      });
    }, $scope.resetUserPassword = function () {
      $scope.success = $scope.error = null, $http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        $scope.passwordDetails = null, Authentication.user = response, $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]), angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user, $scope.user || $location.path('/'), $scope.hasConnectedAdditionalSocialAccounts = function () {
      for (var i in $scope.user.additionalProvidersData)
        return !0;
      return !1;
    }, $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    }, $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null, $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        $scope.success = !0, $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    }, $scope.updateUserProfile = function (isValid) {
      if (isValid) {
        $scope.success = $scope.error = null;
        var user = new Users($scope.user);
        user.$update(function (response) {
          $scope.success = !0, Authentication.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
      } else
        $scope.submitted = !0;
    }, $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null, $http.post('/users/password', $scope.passwordDetails).success(function () {
        $scope.success = !0, $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]), angular.module('users').factory('Authentication', [function () {
    var _this = this;
    return _this._data = { user: window.user }, _this._data;
  }]), angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);