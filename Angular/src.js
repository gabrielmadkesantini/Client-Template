var app = angular.module("myApp", []);

// app.directive("firstDirective", () => {
//   return {
//     require: "ngModel",
//     link: () =>{

//     }
//   };
// });

app.controller("modalController", [
  "$scope",
  "$rootScope",
  ($scope, $rootScope) => {
    $scope.show = false;
    $scope.text = "";
    $scope.ask = false;
    $scope.buttonText = "";

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
          $scope.show = !$scope.show;
          $scope.buttonText = "Salvar";
      }
    };
  },
]);

app.controller("formController", [
  "$scope",
  "$rootScope",
  ($scope, $rootScope) => {
    $scope.showButtons = false;
    $scope.master = {};
    $scope.savedClients = [];
    if ($scope.savedClients.length != 0) {
      $scope.showButtons = !$scope.showButtons;
    }
    $scope.reset = () => {
      $scope.user = {};
      $scope.updateValues = {};
    };
    $scope.save = (user, updateValues) => {
      console.log(updateValues);

      $scope.master = angular.copy(user);
      if (updateValues) {
        if (
          user.name != updateValues.name ||
          user.code != updateValues.code ||
          user.address != updateValues.address
        ) {
          const specificIndex = $scope.savedClients.findIndex(
            (e) => e.code === updateValues.code
          );
          console.log(user);
          $scope.savedClients[specificIndex] = $scope.user;
        } else {
          if (updateValues == 0) {
            $scope.savedClients.push($scope.user);
          }
        }
      } else {
        $scope.savedClients.push($scope.user);
      }

      $scope.reset();
    };
    $scope.openUpdate = () => {
      console.log($rootScope.name);

      if ($rootScope.name != "") {
        $scope.user = $scope.savedClients.find(
          (e) => e.name == $rootScope.name
        );

        $scope.updateValues = $scope.savedClients.find(
          (e) => e.name == $rootScope.name
        );

        console.log($scope.user);
      }
    };

    $scope.update = (name) => {};
  },
]);
