var HomeView = function (service) {
//var employeeListView;
this.initialize = function () {
// Define a div wrapper for the view (used to attach events)
this.$el = $('<div/>');
// this.$el.on('keyup', '.search-key1', findByFirstName);
// this.$el.on('keyup', '.search-key2', findByLastName);
// this.$el.on('keyup', '.search-key3', findByDepartment);
// this.$el.on('keyup', '.search-key4', findByTitle);
//employeeListView = new EmployeeListView();
};
this.initialize();
this.render = function() {
	this.$el.html(this.template());
	//$('.content', this.$el).html(employeeListView.$el);
	return this;
};


} // HomeView.js in the js directory