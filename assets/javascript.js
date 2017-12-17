//--- JavaScript for ______---//

$(document).ready(function() {
	$('#images, #modalImg').on('click', 'img', giphy.clickImage);
	$('#images').on('dblclick', 'img', giphy.modal.generateImg);
	giphy.start();
});

var buttonsArray = ['greateful dead', 'music', 'coding', 'snow',
	'dogs', 'cats'];
var key = 'K3xJ8kOAPnBvxMLp5ICKimJoaQt74W9R';
var queryURL = 'https://api.giphy.com/v1/gifs/search?&api_key=' + key + '&limit=10';

var giphy = {

	start: function() {
		var addButton = $('<button>');
		addButton.attr('id', 'addButton');
		addButton.text('add');
		$(addButton).on('click', giphy.addButton);
		$('form').append(addButton);
		giphy.renderButtons();
	},

	renderButtons: function() {


		$('#buttons').empty();


		for (var i = 0; i < buttonsArray.length; i++) {

		  var a = $('<li>');
		  var b = $('<button>');
		  $(b).on('click', giphy.clickButton);
		  b.addClass('button');
		  b.data('name', buttonsArray[i]);
		  b.text(buttonsArray[i]);
		  $(a).html(b);
		  $('#buttons').append(a);
		}
	},

	addButton: function(event) {
		event.preventDefault();
		var input = $('#input').val();
		if (input != '') {
			buttonsArray.push(input);
			giphy.renderButtons();
		}
		$('#input').val('');

	},

	clickButton: function(event) {
		event.preventDefault();
		var query = $(this).data('name');
		queryURL += '&q=' + query;
		$.ajax({
			url: queryURL,
			method: 'GET'
		}).done(function(response) {
			var status = response.meta.status;
			if (status === 200) {
				giphy.renderImages(response.data);
			} else {
				alert('GIPHY query unsuccessful. Try again.');
			}
		});
	},

	renderImages: function(data) {
		console.log(data);
		$('#images').empty();
		$.each(data, function (i){
			var urlStill = data[i].images.original_still.url;
			var urlAnim = data[i].images.original.url;
			var title = data[i].title;
			var img = $('<img>');
			img.attr('src', urlStill);
			img.attr('data-still', urlStill);
			img.attr('data-anim', urlAnim);
			img.attr('data-title', title);
			$('#images').append(img);
		});
	},

	clickImage: function() {
		var img = $(this);
		var src = img.attr('src');
		var urlStill = img.attr('data-still')
		var urlAnim = img.attr('data-anim')
		if (src === urlStill) {
			img.attr('src', urlAnim);
		} else {
			img.attr('src', urlStill);
		}
	},

	modal: {

		generateImg: function() {
			var urlAnim = $(this).attr('data-anim')
			var urlStill = $(this).attr('data-still')
			var title = $(this).attr('data-title')
			var img = $('<img>');
			img.attr('src', urlAnim);
			img.attr('data-still', urlStill);
			img.attr('data-anim', urlAnim);
			$('#modalImg').html(img);
			$('#modalTitle').html(title);
			giphy.modal.show();
		},

		show: function() {
			var modal = $('.modal')[0];
			var close = $('#close');

			modal.style.display = "block"

			close.on('click', giphy.modal.hide);
		},

		hide: function() {
			$('.modal')[0].style.display = "none"
		},
	},
}
