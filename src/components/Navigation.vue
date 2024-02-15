<template>
<div class="sidenav">
  <a href="#">SONNAV</a>
  <a v-if="formData.documentTemplateUpload" href="#" >Upload Template</a>
  <a v-if="formData.formSelection" href="#">Form Selection</a>
  <a v-if="formData.studyReconcillation" href="#">Reconsiliation</a>
</div>
</template>

<script>


export default{
    name: 'Nav',
    data()
        {
          var obj = JSON.parse(localStorage.getItem("user_info"));
          console.log(obj.data.authorization)
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
          let userinfo=localStorage.getItem('user_info');
          console.log(userinfo)
          if(userinfo==null){
            this.$router.push({path: '/'})
          }
    } 
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

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

</style>