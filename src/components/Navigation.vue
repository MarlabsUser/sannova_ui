<template>
<div class="sidenav">
  <h2 class="customlogo">SONNAVA</h2>
  <ul class="navsidelist">
    <li :class="uploadTemplate ? 'navlistActive' : 'navlist'" v-if="formData.documentTemplateUpload" @click="navRedirection('uploadTemplate')">Upload Template</li>
    <li :class="viewTemplate ? 'navlistActive' : 'navlist'" v-if="formData.viewTemplate" @click="navRedirection('viewTemplate')">View Template</li>
    <li :class="formSelection ? 'navlistActive' : 'navlist'" v-if="formData.formSelection" @click="navRedirection('formSelection')">Form Selection</li>
    <li :class="reconsiliation ? 'navlistActive' : 'navlist'" v-if="formData.studyReconcillation" @click="navRedirection('reconsiliation')">Reconciliation</li>
  </ul>
  <button type="button" class="logoutS" v-on:click="logout">Logout</button>
</div>
</template>

<script>
import router from '../router'
import util from '../util.js'
export default{
    props: [ 'navPageName'],
    name: 'Nav',
    data()
        {
          var obj = JSON.parse(localStorage.getItem("user_info"));
          var authorization = JSON.parse(obj.data.authorization);
            return {
                uploadTemplate: false,
                formSelection: false,
                reconsiliation: false,
                viewTemplate: false,
                formData: {
                    documentTemplateUpload: authorization.document_template_upload,
                    formSelection: authorization.form_selection,
                    studyReconcillation: authorization.study_reconcillation,
                    viewTemplate: authorization.view_template,
                }              
            }

        },
        mounted(){
          util.navigate();
          this.setSelectedNav();
        },
        methods: {
          logout: function() {
            localStorage.clear();
            util.navigate();
          },
          navRedirection(formName){
            router.push({path:'/'+formName});
          },
          setSelectedNav(){
            if(this.navPageName=='uploadTemplate'){
              this.uploadTemplate=true;
            }else if(this.navPageName=='formSelection'){
              this.formSelection=true;
            }else if(this.navPageName=='reconsiliation'){
              this.reconsiliation=true;
            }else if(this.navPageName=='viewTemplate'){
              this.viewTemplate=true;
            }
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
  width: 16%;
  position: fixed;
  z-index: 1;
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


.logoutS {
  display: block;
    width: 100%;
    border: none;
    padding: 14px 28px;
    font-size: 16px;
    position: absolute;
    bottom: 10px;
    background-color: #082540;
    text-align: center;
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
}

.main {
  margin-left: 18%;
    margin-top: 1%;
    position: fixed;
    height: 96%;
    width: 80%;
    border: 0.1px solid black;
    padding: 1%;
    max-height: 96%;
    overflow: auto;
    box-shadow: 4px 4px 16px 4px rgba(0,0,0,0.2);
    transition: 0.3s;
}

.customlogo{
  background-color: #03325c;
    text-align: center;
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
}

ul.navsidelist{
  list-style-type: none;
    padding: 0;
    margin: 0;
}
li.navlist{
  padding: 3% 5%;
  color: aqua;
}

li.navlist:hover{
background-color: #03325c;
}

li.navlistActive{
  padding: 3% 5%;
  color: aqua;
  background-color: #03325c;
}

li.navlistActive:hover{
background-color: #03325c;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

</style>