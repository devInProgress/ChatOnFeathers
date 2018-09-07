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
                })
            }
        }
        catch(error) {
            console.error(error);
            window.location.href = `${serverUrl}/login.html`;
        }
		}
		authenticate();
});