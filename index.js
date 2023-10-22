
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnhRDMZl9NTJ5NvFMRLyK7mE9kQz5khP0",
  authDomain: "educarparatransformar-fb.firebaseapp.com",
  databaseURL: "https://educarparatransformar-fb-default-rtdb.firebaseio.com",
  projectId: "educarparatransformar-fb",
  storageBucket: "educarparatransformar-fb.appspot.com",
  messagingSenderId: "486735378938",
  appId: "1:486735378938:web:a13c522d75bb0e8c2a4c43"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//VARS
const btnReg= document.getElementById('btn-reg');
const auth = firebase.auth()
//const database = firebase.database()
const database = getDatabase(app)

//REGISTER FUNCTION

document.getElementById('btn-reg').addEventListener('click',()=>{

    alert('hola')

});

function register(){
  //Tomar todos los inputs
  sup_full_name = document.querySelector('.sup-name');
  sup_email = document.querySelector('.sup-mail');
  sup_password = document.querySelector('.sup-pwd');
  alert('hola')
}

//VALIDAR CAMPOS
if (validate_email(sup_email) == false || validate_password(sup_password) == false){
    alert('La contraseña o el email son incorrectos')
    return
    // Parar el codigo
}
if (validate_field(sup_full_name) == false){
    alert('Nombre inválido')
    return
    // Parar el codigo
}


// Autenticación
auth.createUserWithEmailAndPassword(email, password)
. then(function() {

    //Declarar variable usuario
    var user = auth.currentUser

    //Añadir usuario a la BD de Firebase
    var database_ref = database.ref()

    //Crear datos del usuario
    var user_data = {
        sup_email: sup_email,
        sup_full_name: sup_full_name,
        last_login: Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)



})
. catch (function(error) {
    // Firebase Will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message
    alert(error_message)
})

function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
        }
    }



function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false
    } else {
        return true
        }
    }


function validate_field(field) {
        if (field == null) {
            return false
        }

        if (field.length <= 0) {
            return false
        } else {
        return true
        }
    }