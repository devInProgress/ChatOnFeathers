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

    // Get user credentials

    const getCredentials = () => {
        const user = {
            email: $('#email').val(),
            password: $('#password').val()
        }
        return user;
    }

    // Handle form submittal

    $('new-user-form').submit((e) => {
        e.preventDefault();
        const userCredentials = getCredentials();
        console.log()
    });
});