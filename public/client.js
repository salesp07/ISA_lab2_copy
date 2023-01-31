// function getNumberInfo(number) {
// 	const API_URL = `http://numbersapi.com/${number}`;
// 	fetch(API_URL).then(response => response.text()).then(data => {
// 		console.log(data);
// 	}).catch(error => {
// 		console.log(error);
// 	});
// }
// getNumberInfo(12)


$(document).ready(function() {
	$('#chatbot-form').submit(function(event) {
		event.preventDefault();
		const message = $('#chatbot-input').val();
		$.ajax({
			type: 'POST',
			url: '/chatbot',
			data: {
				message: message
			},
			success: function(response) {
				$('#chatbot-response').text(response.text);
				let newMessage = $('<div>', {
					class: 'message'
				}).text(response.text);
				let removeButton = $('<button>', {
					class: 'remove-button'
				}).text('Remove');
				newMessage.append(removeButton);
				$('#chat-history').append(newMessage);
			}
		});
	});

	$(document).on('click', '.remove-button', function() {
		$(this).parent().remove();
	});
});

