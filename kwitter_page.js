//Agrega TUS ANLACES DE FIREBASE

var firebaseConfig = {
  apiKey: "AIzaSyAzGzmpgiOlTANarqphk3JhT1a9UP2L4-0",
  authDomain: "kwiter-778d2.firebaseapp.com",
  databaseURL: "https://kwiter-778d2-default-rtdb.firebaseio.com",
  projectId: "kwiter-778d2",
  storageBucket: "kwiter-778d2.appspot.com",
  messagingSenderId: "819171950780",
  appId: "1:819171950780:web:a5953e9fd17c3b4aea10b9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//almacenamos dentro de las variables
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

//función Send
function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
          name: user_name,
          message: msg,
          like: 0
      });
  
      // actualizamos el valor del cuadro de entrada del mensaje a vacío
      document.getElementById("msg").value = "";
  }

 // actualizamos el valor del cuadro de entrada del mensaje a vacío



function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Inicia código
console.log(firebase_message_id);
console.log(message_data);
name=message_data['name'];
message=message_data['message'];
like=message_data['like'];

name_with_tag="<h4>"+name+"<img class='user_tick' src='tick (1).png'></h4>";
message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>like:"+like+"</span></button><hr>";

row=name_with_tag+message_with_tag+like_button+span_with_tag;
document.getElementById("output").innerHTML+=row;
//Termina código
      } });  }); }
getData();

function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index (1).html");
}

function updateLike(message_id){
  console.log("boton de like precionado"+message_id);
  button_id=message_id;
  likes=document.getElementById(button_id).value;
  update_likes=Number(likes)+1;
  console.log(update_likes);
  firebase.database().ref(room_name).child(message_id).update({like:update_likes});
}