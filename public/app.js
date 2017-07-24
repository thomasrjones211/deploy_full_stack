angular.module('my-app', []).controller('Acontroller', function($http) {
	var vm = this;

	$http.get('/catNames')
	.then(function(res) {
		console.log(res);
		vm.catNames = res.data;
	})
	.catch(function(err) {
		console.error(err);
	});
});
