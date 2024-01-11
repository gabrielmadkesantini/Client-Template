var app = angular.module("myApp", ["ngRoute"]);

app.config(($routeProvider) => {
  $routeProvider
      when("/", {
        templateUrl : "views/home.html"
    })
    .when("/clients", {
      templateUrl: "views/clients.html",
    })
    .when("/companies", {
      templateUrl: "views/companies.html",
    });
 });

app.controller("modalController", [
  "$scope",
  "$rootScope",
  ($scope, $rootScope) => {
    $scope.show = false;
    $scope.text = "";
    $scope.showUpdate = false;
    $scope.ask = false;
    $scope.buttonText = "";
    console.log($scope.show);
    $scope.openModal = (text, name) => {
      $rootScope.name = name;
      console.log(name);
      switch (text) {
        case "delete":
          $scope.text = "Deseja mesmo deletar este cliente?";
          $scope.buttonText = "Sim";
          $scope.ask = !$scope.ask;
          break;
        case "add":
          $scope.text = "Criar cliente";
          $scope.show = !$scope.show;
          $scope.buttonText = "Criar Cliente";
          break;
        default:
          $scope.text = "Editar Cliente";
          $scope.showUpdate = !$scope.showUpdate;
          $scope.buttonText = "Salvar";
      }
    };
  },
]);

app.controller("formController", [
  "$scope",
  "$rootScope",
  ($scope, $rootScope) => {
    $scope.search = "";
    $scope.customFilter = () => {};
    $scope.showButtons = false;
    $scope.master = {};
    $scope.savedClients = [
      {
        name: "Artur Fim Zortea",
        code: "2334424",
        address: "Bento Gonçalves, RS",
      },
    ];
    if ($scope.savedClients.length != 0) {
      $scope.showButtons = !$scope.showButtons;
    }
    $scope.reset = () => {
      $scope.user = {};
      $scope.updateValues = {};
    };
    $scope.save = (user) => {
      // console.log(master);
      // console.log($rootScope.name);

      if ($rootScope.name != "") {
        currentUser = $scope.savedClients.find(
          (e) => e.name == $rootScope.name
        );
      }
      console.log(currentUser);
      console.log(user);

      if (Object.keys(user).length > 2) {
        $scope.master = angular.copy(user);
        $scope.savedClients.push(user);
      }

      $scope.reset();
    };

    $scope.delete = () => {
      console.log($rootScope.name);
      const specificIndex = $scope.savedClients.findIndex(
        (e) => e.name == $rootScope.name
      );
      $scope.savedClients.splice(specificIndex, 1);
      $scope.reset();

      console.log(specificIndex);
    };

    $scope.update = () => {
      reset();
    };

    $scope.openUpdate = () => {
      if ($rootScope.name != "") {
        $scope.user = $scope.savedClients.find(
          (e) => e.name == $rootScope.name
        );
      }
    };
  },
]);
