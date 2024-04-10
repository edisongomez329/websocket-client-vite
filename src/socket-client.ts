import {Manager, Socket} from 'socket.io-client'

let socket: Socket;

export const connectSocketServer = () => {
    const manager = new Manager('https://study-nest-8de33969871a.herokuapp.com/socket.io/socket.io.js');
    const socket = manager.socket('/');
    console.log(socket);
    addListeners();
};

export const connectSocketServerAuth = (token: string) => {
    
    const manager = new Manager('https://study-nest-8de33969871a.herokuapp.com/socket.io/socket.io.js', {
        extraHeaders: {
            hola: 'mundo',
            authentication: token
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');
    addListeners();
    //getToken('admin@gmail.com', '123456Aa')
};

export const getToken = async (userEmail: string, pwd: string) => {
    const response = await fetch('https://study-nest-8de33969871a.herokuapp.com/api/auth/login', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: userEmail, password: pwd})
    });

    const tokenResponse = await response.json();
    console.log(tokenResponse);
    connectSocketServerAuth(tokenResponse.token);
}

const addListeners = () => {

    const clientsConnected = document.querySelector('#clientsConnected')!;
    const serverStatusLabel = document.querySelector('#server-status')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl  = document.querySelector<HTMLUListElement>('#messagesUl')!;

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'conectado';
    });
    
    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'desconectado';
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = "";
        clients.forEach(clientId => {
            clientsHtml +=  `<li>${clientId}</li>` 
        });
        clientsConnected.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if(messageInput.value.trim().length <= 0)
            return;

        socket.emit('message-from-client', {
            id: 'Id', 
            message: messageInput.value
        })

        messageInput.value = '';
    })

    socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
   
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;

        messagesUl.append(li);
    });
};