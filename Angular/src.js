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
    $scope.saveContact = (contact, isUpdate) => {
      console.log($scope.user.contacts);
      if (contact) {
        $scope.contacts.push(contact);
      }

      console.log(
        "newcontact" + $scope.contacts,
        "contatos atuais" + $scope.user.contacts
      );
    };

    $scope.confirmChanges = () => {
      $scope.user.contacts = $scope.contacts;
      console.log($scope.user.contacts);
    };

    $scope.deleteContact = (number, isFromUpdate) => {
      if (isFromUpdate) {
        const specificIndex = $scope.contacts.findIndex((e) => e == number);
        $scope.contacts.splice(specificIndex, 1);
      } else {
        const specificIndex = $scope.contacts.findIndex((e) => e == number);
        $scope.contacts.splice(specificIndex, 1);
      }
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
      console.log($scope.master);
      console.log("reset");
      $scope.contacts = [];
      $scope.user = angular.copy($scope.master);
      $scope.updateValues = angular.copy($scope.master);
    };
    $scope.save = (user, comp, reset) => {
      if (reset) {
        user = angular.copy($scope.master);
      }

      if ($rootScope.name != "") {
        currentUser = $scope.savedClients.find(
          (e) => e.name == $rootScope.name
        );
      }

      if (Object.keys(user).length > 2) {
        if (comp) {
          console.log($scope.contacts);
          if ($scope.savedCompanies.length > 0) {
            $scope.user.contacts = $scope.contacts;
          }
          $scope.savedCompanies.push(user);
        } else {
          $scope.savedClients.push(user);
        }
      }

      $scope.reset();
    };

    $scope.delete = (isComp) => {
      console.log($rootScope.name);

      if (isComp) {
        const specificIndex = $scope.savedCompanies.findIndex(
          (e) => e.name == $rootScope.name
        );
        $scope.savedCompanies.splice(specificIndex, 1);
        $scope.reset();
      } else {
        const specificIndex = $scope.savedClients.findIndex(
          (e) => e.name == $rootScope.name
        );
        $scope.savedClients.splice(specificIndex, 1);
        $scope.reset();
      }

      console.log(specificIndex);
    };

    $scope.update = () => {};

    $scope.openUpdate = (isComp) => {
      if (isComp) {
        $scope.user = $scope.savedCompanies.find(
          (e) => e.name == $rootScope.name
        );

        $scope.contacts = angular.copy($scope.user.contacts);
      } else if ($rootScope.name) {
        $scope.user = $scope.savedClients.find(
          (e) => e.name == $rootScope.name
        );
      }
    };
  },
]);
