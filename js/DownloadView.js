var DownloadView = function (service) {
//var employeeListView;
this.initialize = function () {
// Define a div wrapper for the view (used to attach events)
this.$el = $('<div/>');
this.$el.on('click', 'DownloadImg', downloadImage);
//this.$el.on('keyup', '.search-key2', findByLastName);
//employeeListView = new EmployeeListView();
};
this.initialize();
this.render = function() {
	this.$el.html(this.template());
	//$('.content', this.$el).html(employeeListView.$el);
	return this;
};

function downloadImage() {
		service.downloadImage($.trim($('.search-key1').val()),$.trim($('.search-key2').val()));
	};
// function findByFirstName() {
// service.findByFirstName($('.search-key1').val())
// .done(function(employees) {
// employeeListView.setEmployees(employees);
// });
// };
// function findByLastName() {
// service.findByLastName($('.search-key2').val())
// .done(function(employees) {
// employeeListView.setEmployees(employees);
// });
// };

}