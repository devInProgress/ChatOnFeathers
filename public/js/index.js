$(document).ready(() => {
    const serverUrl = 'http://localhost:3030';

    /*
        Feathers boilerplate
    */
   const socket = io(serverUrl);
//    initialize our feathers client application through socket.io
   const client = feathers();
   client.configure(feathers.socketio(socket));
//    use localStorage to store JWT
    client.configure(feathers.authentication({
        storage: window.localStorage
    }));

    // obtain users service
		const usersService = client.service('/users');
		const messagesService = client.service('/messages');

		class Message {
			constructor(message) {
				this.message = message;
			}
			getMessageHtmlString() {
				return `
					<div class="media">
					<div class="media-left">
							<a href="#">
									<img src="https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/user.png" alt="64x64 user image" class="media-object" style="width: 64px; height: 64px;">
							</a>
					</div>
					<div class="media-body">
							<div class="pull-right">
									<span class="delete-comment" title="Delete Comment?"><i class="fa fa-times" aria-hidden="true"></i></span>
							</div>
							<h4 class="media-heading">John Smith</h4>
							<span class="comment-date">03-04-2016 10:43am</span>
							<br><br>
							${this.message}
					</div>
			</div>
				`
			}
 		}

    const authenticate = async() => {
        try {
            const response = await client.authenticate();
            if(response) {

                // Logout the user if logout button is clicked
                $('#logout-icon').on('click', async() => {
                    try {
                        await client.logout();
                        window.location.href = `${serverUrl}/login.html`;
                    }
                    catch(error) {
                        console.error(error.message);
                    }
								});
								
								// save the message to database if user enters one
								$('#submit-message-form').submit(async(e) => {
									e.preventDefault();
									const $msgElement = $('#msg-text');
									const msg = $msgElement.val();
									$msgElement.val('');
									if(msg.trim().length) {
										try {
											const response = await messagesService.create({
												text: msg
											});
										}
										catch(error) {
											console.log(error.message);
											alert(error.message);
										}
									} else {
										alert('Enter a Valid message');
									}
								});

								// event to check addition of new messages
								messagesService.on('created', (message) => {
									const htmlMessage = new Message(message.text);
									$('#chat-area').append(htmlMessage.getMessageHtmlString());
								});
            }
        }
        catch(error) {
            window.location.href = `${serverUrl}/login.html`;
        }
		}
		authenticate();
});