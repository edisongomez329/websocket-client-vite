import './style.css'
import { setupCounter } from './counter.ts'
import { getToken } from './socket-client.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>

  <h1>Web Socket Client</h1>  

   <input id="inputUserEmail" placeholder="Correo electrónico" />
   <input id="inputPwd" type="password" placeholder="Contraseña" />
   <button type="button" id="btnConnect">Connect</button>
   

    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    
    <span id="server-status"></span>

    <ul id="clientsConnected">
      <li></li>
    </ul>

    <form id="message-form">
      <input type="text" id="message-input">
    </form>


    <h3>Messages</h3>
    <ul id="messagesUl"></ul>

  </div>
`
setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
const btnConnect = document.querySelector<HTMLButtonElement>("#btnConnect")!;
const inputUserEmail = document.querySelector<HTMLInputElement>("#inputUserEmail")!;
const inputPwd = document.querySelector<HTMLInputElement>("#inputPwd")!;

btnConnect.addEventListener('click', () => {
  
  if(inputUserEmail.value.trim().length <= 0 || inputPwd.value.trim().length <= 0)
    return;
  
    getToken(inputUserEmail.value, inputPwd.value)
})
