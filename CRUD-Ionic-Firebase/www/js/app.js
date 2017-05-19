//main wrap da se ne poluta global namespace
(function(){

var app = angular.module('queup', ['ionic','angularMoment','firebase','ion-place-tools']);


app.config(function($stateProvider,$urlRouterProvider){


 $stateProvider.state('home',{
    url:'/home',
     controller:'HomeController',
    templateUrl:'templates/home.html'
  });

  $stateProvider.state('queue',{
    url:'/queue',
    templateUrl:'templates/queue.html'
  });

  $stateProvider.state('edit',{
    url:'/edit/:pessoaId',
    controller:'EditController',
    templateUrl:'templates/editEquipamento.html'
  });

  $stateProvider.state('addEquipamento',{
    url:'/addEquipamento',
    controller:'AddControllerEquipamento',
    templateUrl:'templates/editEquipamento.html'
  });

  $urlRouterProvider.otherwise('/home');

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});



app.controller('HomeController', function($scope,$state,Queue){
  
  $scope.doa = function(){
      $state.go('queue');
  };

});

app.controller('QueueController', function($scope,Queue,$state){
  $scope.queue = Queue;
/*
  $scope.queue.$loaded(function(){
    if($scope.queue.length === 0){
      $scope.queue.$add({
        name:'David Cai',
        status:'Added to queue',
        updatedTime:Firebase.ServerValue.TIMESTAMP
      });
      $scope.queue.$add({
        name:'Denis Koletić',
        status:'Added to queue',
        updatedTime:Firebase.ServerValue.TIMESTAMP
      });
    }
  });
  */

  $scope.add = function(){
    $state.go('addEquipamento');
  };

  $scope.delete = function(equipamento){
    //queueService.deletePerson(personId);
    Queue.$remove(equipamento);
  };

});

app.controller('EditController', function($scope,$state,Queue){
  var equipamento = Queue.$getRecord($state.params.pessoaId);
  //$scope.person = angular.copy(queueService.getPerson($state.params.personId));
 $scope.equipamento = angular.copy(equipamento);


 //console.log($scope.person);
  $scope.save = function(){
  //  queueService.updatePerson($scope.person);
    //$state.go('queue');
    equipamento.nome = $scope.equipamento.nome;
    equipamento.cidade = $scope.equipamento.cidade;
    equipamento.quantidade = $scope.equipamento.quantidade;
    equipamento.estado = $scope.equipamento.estado;
    equipamento.updatedTime = Firebase.ServerValue.TIMESTAMP;
    Queue.$save(equipamento);
    $state.go('queue');
  }

  $scope.delete = function(){
  //  queueService.deletePerson($scope.person.id);
      //$state.go('queue');
      Queue.$remove(equipamento);
      $state.go('queue');
    };
});

app.controller('AddControllerEquipamento', function($scope,$state,Queue){
  $scope.equipamento = {
    nome:'',
    cidade:'',
    quantidade:'',
    estado:'' 
  };

 
 

$scope.showSelectValue = function(mySelect) {
    $scope.equipamento.estado = mySelect;
}
   

$scope.save = function(){
//  queueService.addPerson($scope.person);
  //$state.go('queue');
  $scope.equipamento.updatedTime = Firebase.ServerValue.TIMESTAMP;
  Queue.$add($scope.equipamento);
  $state.go('queue');
}

});


})();
