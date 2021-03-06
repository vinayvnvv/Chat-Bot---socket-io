app.controller('mainCtrl', ['$scope', function($scope){

	console.log("called main ctrl");


     $scope.msgs = [];

     var socket = io();

     socket.on('resmsg', function(data) {
     	console.log(data)
     	if($scope.name != data.name )
     	$scope.msgs.push(data);
     	$scope.$apply();
     })

     socket.on('typing', function(data) {
     	if(data.name != $scope.name) { 
     		$scope.typing = true;
     		$scope.typing_name = data.name;
     		$scope.$apply();
     	}
     	setTimeout(function() { $scope.typing = false; $scope.$apply();}, 500);
     })



  $scope.checkInput = function(e) {
  	 
     if(e.keyCode == 13) {
     	var m = {name:$scope.name,msg:$scope.query};
     	$scope.msgs.push(m);
     	socket.emit('newmsg', m);
     	$scope.query = '';
     } else {
     	socket.emit('typing', {name:$scope.name});
     }

  }

}])