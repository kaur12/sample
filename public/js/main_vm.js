// imports always go first - if we're importing anything
import chatMessage from './modules/ChatMessage.js';
const socket = io();


// a packet is any data sent thru the connect event
function setUserId({sID}){
    console.log(sID);
    vm.socketID = sID;
};

function showDisconnectMessage(){
    console.log('a user has disconnected');
};

function appendMessage(message){
    //vm.name.push(name);
    vm.messages.push(message);
};

function appendPlayer(player){
    
    vm.players.push(player);
};

const vm = new Vue({
    data:{
        socketID: '',
        message: '',
        nickname: '',

        players: [],
        messages: []
        },

        methods:{
            //emit message event
            dispatchMessage(){
                console.log('message has been sent');

                socket.emit('chat_message', {
                    content: this.message,
                    name: this.nickname || 'anonymous'
                })

                this.message = '';
            },

            addNewPlayer(){
                console.log('a player has joined the chat');

                socket.emit('playerJoined', {
                    player: this.nickname
                })
            }
        },
        
        mounted: function(){
            console.log('vue has mounted');
        },
        components:{
            newmessage: chatMessage

        }
}).$mount('#app');

socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconnectMessage);
socket.addEventListener('new_message', appendMessage);
socket.addEventListener('newPlayer', appendPlayer);

//login function
const loginPage     = document.querySelector('.loginScreen'),
      loginForm     = document.querySelector('.loginForm'),
      nicknameInput = document.querySelector('#nickname'),
      loginButton   = document.querySelector('.nicknameButton');

      loginButton.addEventListener('click', function(){
        if(nicknameInput.value === ''){
            alert("You need to input a Username")
        }else{
            console.log('New player has joined');
            loginPage.classList.add('hide');
            alert('Welcome, ' + nicknameInput.value);
        }
      });


//player activity bar
const playerBut = document.querySelector('.playerClick'),
      playerNav = document.querySelector('.playerList');

      playerBut.addEventListener('click', function(){
          console.log('player nav toggled');
          playerNav.classList.toggle('showNav');
      })