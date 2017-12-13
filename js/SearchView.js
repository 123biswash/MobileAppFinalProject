var SearchView = function (service) {
var imageListView;
this.initialize = function () {
// Define a div wrapper for the view (used to attach events)
this.$el = $('<div/>');
// this.$el.on('keyup', '.search-key1', findByFirstName);
// this.$el.on('keyup', '.search-key2', findByLastName);
this.$el.on('keyup', '.search-key3', findByTag);
//this.$el.on('keyup', '.search-key4', findByTitle);
imageListView = new ImageListView();
};
this.initialize();
this.render = function() {
	this.$el.html(this.template());
	$('.content', this.$el).html(imageListView.$el);
	return this;
};

function findByTag(){
		service.findByTag($.trim($('.image-tag').val())).done(function(files){
			var empty_array = [];
			if ($.trim($('.image-tag').val()).length > 0){
				imageListView.setImages(files);
			}else{
				imageListView.setImages(empty_array);
			}
		});


	};
}