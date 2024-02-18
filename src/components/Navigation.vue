<template>
<div class="sidenav">
  <a href="#">SONNAV</a>
  <a v-if="formData.documentTemplateUpload" href="/uploadTemplate" >Upload Template</a>
  <a v-if="formData.formSelection" href="/formSelection">Form Selection</a>
  <a v-if="formData.studyReconcillation" href="/reconsiliation">Reconsiliation</a>
  <button type="button" class="block" v-on:click="logout">Logout</button>
</div>
</template>

<script>

import util from '../util.js'
export default{
    name: 'Nav',
    data()
        {
          var obj = JSON.parse(localStorage.getItem("user_info"));
          var authorization = JSON.parse(obj.data.authorization);
            return {
                formData: {
                    documentTemplateUpload: authorization.document_template_upload,
                    formSelection: authorization.form_selection,
                    studyReconcillation: authorization.study_reconcillation
                },               
            }
        },
        mounted(){
          util.navigate();
        },
        methods: {
          logout: function() {
            console.log("logiut")
            localStorage.clear();
            util.navigate();
          }
        },
        
}
</script>

<style>
body {
  font-family: "Lato", sans-serif;
 
}

.sidenav {
  height: 100%;
  width: 200px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 20px;
  text-align: left;
}

.sidenav a {
  padding: 6px 6px 6px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.block {
  display: block;
  width: 100%;
  border: none;
  background-color: #a7c8ff;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  position: absolute;
  bottom: 10px;
}

.main {
  margin-left: 18%; /* Same as the width of the sidenav */
  margin-top: 2%;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

</style>