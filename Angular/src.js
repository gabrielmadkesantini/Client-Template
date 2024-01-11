var app = angular.module("myApp", ["ngRoute"]);

app.config(($routeProvider) => {
  $routeProvider
    .when("/", {
      templateUrl: "views/home.html",
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
          $scope.text = "Deseja mesmo deletar ";
          $scope.buttonText = "Sim";
          $scope.ask = !$scope.ask;
          break;
        case "add":
          $scope.text = "Criar ";
          $scope.show = !$scope.show;
          $scope.buttonText = "Criar ";
          break;
        default:
          $scope.text = "Editar ";
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
    $rootScope.contacts = [];
    $scope.saveContact = (contact) => {
      console.log(contact);

      if (contact) {
        $rootScope.contacts.push(contact);
        console.log($rootScope.contacts);
      }
    };

    $scope.deleteContact = (number) => {
      const specificIndex = $rootScope.contacts.findIndex((e) => e == number);
      $rootScope.contacts.splice(specificIndex, 1);
    };
    $scope.savedCompanies = [
      {
        name: "Tramontina",
        code: "123456",
        contacts: ["99145453", "99145453", "99145453", "99145453", "99145453"],
        address: "Carlos Barbosa",
      },
    ];
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
      if ($rootScope.name != "") {
        currentUser = $scope.savedClients.find(
          (e) => e.name == $rootScope.name
        );
      }
      console.log(currentUser);
      console.log(user);

      if (Object.keys(user).length > 2) {
        if (comp) {
          if ($scope.savedComapanies.length > 0) {
            $scope.user.contacts = $rootScope.contacts;
          }
          $scope.master = angular.copy(user);
          $scope.savedCompanies.push(user);
        } else {
          $scope.master = angular.copy(user);
          $scope.savedClients.push(user);
        }
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
