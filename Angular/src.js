var app = angular.module("myApp", []);

app.controller("modalController", ($scope) => {
  $scope.show = false;
  $scope.text = "";
  $scope.ask = false;
  $scope.buttonText = "";

  $scope.openModal = (text) => {
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
});
