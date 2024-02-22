<template>
    <h1 class="logo">Sannova</h1>
    <div class="login-form">
  <form    @submit.prevent="login">
    <h1>Login</h1>
    <div class="content">
      <div class="input-field">
        <input type="UserName" placeholder="Username" v-model="formData.firstname">
      </div>
      <div class="input-field">
        <input type="password" placeholder="Password" autocomplete="new-password" v-model="formData.password">
      </div>
    </div>
    <div class="action">
      <button>Login</button>
    </div>
  </form>
</div>
</template>

<script>
import axios from 'axios'
import util from '../util.js'
import api from '../api.js';
    export default{
        name: 'Login',
        data()
        {
            return {
                formData: {
                    firstname:'',
                    password:''
                },               
            }
        },
        methods: {
          login(){
                if(this.formData.firstname.trim().length === 0){
                  alert("Please enter the username.")
                }else if(this.formData.password.trim().length === 0){
                  alert("Please enter the password.")
                }else{
                  axios.post("http://localhost:8090/sannova/login",this.formData
                  ,{headers: {'Content-Type': 'application/json'}})
                  .then(response => {
                    localStorage.setItem("user_info",JSON.stringify(response))
                    util.afterloginNavigation();
                  })
                  .catch(error => {
                    console.log("error",error)
                    alert("Please provide the correct credentials.")
                  });
                }
              },
        },
        mounted(){
          util.navigate();
          util.afterloginNavigation();
        }

    };
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}


.login-form {
  background: #fff;
  width: 500px;
  margin: 65px auto;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
          flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 2px 25px rgba(0, 0, 0, 0.2);
}
.login-form h1 {
  padding: 35px 35px 0 35px;
  font-weight: 300;
}
.login-form .content {
  padding: 35px;
  text-align: center;
}
.login-form .input-field {
  padding: 12px 5px;
}
.login-form .input-field input {
  font-size: 16px;
  display: block;
  font-family: 'Rubik', sans-serif;
  width: 100%;
  padding: 10px 1px;
  border: 0;
  border-bottom: 1px solid #747474;
  outline: none;
  -webkit-transition: all .2s;
  transition: all .2s;
}
.login-form .input-field input::-webkit-input-placeholder {
  text-transform: uppercase;
}
.login-form .input-field input::-moz-placeholder {
  text-transform: uppercase;
}
.login-form .input-field input:-ms-input-placeholder {
  text-transform: uppercase;
}
.login-form .input-field input::-ms-input-placeholder {
  text-transform: uppercase;
}
.login-form .input-field input::placeholder {
  text-transform: uppercase;
}
.login-form .input-field input:focus {
  border-color: #222;
}
.login-form .action {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
          flex-direction: row;
}
.login-form .action button {
  width: 100%;
  border: none;
  padding: 18px;
  font-family: 'Rubik', sans-serif;
  cursor: pointer;
  text-transform: uppercase;
  background: #772ef4;
  color: #cdf8f9;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 0;
  letter-spacing: 0.2px;
  outline: 0;
  -webkit-transition: all .3s;
  transition: all .3s;
}
.login-form .action button:hover {
  background: #535de6;
}
.login-form .action button:nth-child(2) {
  background: #5f8ce0;
  color: #fff;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 4px;
}
.login-form .action button:nth-child(2):hover {
  background: #4380f3;
}
.logo {
    color: rgb(37, 4, 76);
    font-size: 100px;
}
</style>