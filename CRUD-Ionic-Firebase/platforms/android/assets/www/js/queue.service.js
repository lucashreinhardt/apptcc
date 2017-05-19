(function () {

var app = angular.module('queup');

app.factory('Queue', function($firebaseArray){
  var ref = new Firebase('https://advo-8326e.firebaseio.com/');
  return $firebaseArray(ref);
});




})();
