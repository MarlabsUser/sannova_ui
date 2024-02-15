<template>
  <Nav/>
  <div class="main">
    <div>
      <div class="headerp"><p>Document Template Setup</p></div>
      <div class="uploadh">
        <label class="custom-file-upload">
            <input type="file" multiple @change="handleFileUpload( $event )"/>
            <i class="fa fa-cloud-upload"></i> Upload
      </label>
      </div>
      <div class="custom-file-upload" @click="deleteFiles"> <i class="fa fa-cloud-upload"></i> Delete </div>
    </div>
    <div class="headerp"><p>Study types</p></div>
    <div class="studyStyle">
      <div v-for="study in studyitem" :key="study.study_id">
        <input type="radio" :id=study.study_id name="study" :value=study.study_id 
        v-model="selectedStudytype"  @change="getFileDetail">
        <label :for=study.study_id>{{study.study_name}}</label><br>
      </div>
    </div>
    <div class="showfileStyle">
      <div class="headerp"><p>All uploaded files</p></div>
      <div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Select</th>
              <th>Document Title</th>
              <th>Uploaded By</th>
              <th>Date / Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in fileDetails" :key="item.template_id">
                 <td><input type="checkbox" :id="item.template_id" :value="item.template_id" v-model="template_ids"></td>
                 <td>{{ item.template_name }}</td>
                 <td>{{ item.uploaded_by }}</td>
                 <td>{{ item.created_date }}</td>
            </tr>
          </tbody>
        
          </table>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from './Navigation.vue'
import axios from 'axios'
export default{
  name:'Home',
  data(){
      return {
        studyitem: [],   
        selectedStudytype:'',
        fileDetails: [],
        template_ids: []
        }
    },
  components:{
    Nav
  },
  methods:{
        getStudyTypes(){
            console.log("clicked");
            console.log("call started")
            axios.get("http://localhost:8090/sannova/study_types")
                .then(response => {
                  console.log(response.data)
                  this.studyitem=response.data
                  console.log(this.studyitem)
                })
                .catch(error => console.log(error));
        },
        handleFileUpload(event ){
            console.log(event.target.files)
            let formData = new FormData();
           
            formData.append('study_id', this.selectedStudytype);
            for (const singleFile of event.target.files) {
              formData.append('file', singleFile);
            }
            
            axios.post("http://localhost:8090/sannova/upload_template",
                      formData,
                      {headers: {'Content-Type': 'multipart/form-data'}
                  })
                .then(response => {
                  console.log(response)
                  this.getFileDetail();
                })
                .catch(error => console.log(error));
        },
        getFileDetail(){
          console.log("getFileDetail " )
          console.log( this.selectedStudytype)
            axios.get("http://localhost:8090/sannova/template_details/"+this.selectedStudytype)
                .then(response => {
                  console.log('getFileDetail:',response.data)
                  this.fileDetails=response.data
                })
                .catch(error => console.log(error));
        },
        deleteFiles(){
          console.log("deleteFiles ",this.template_ids[0] )
          let element = "";
          for (let index = 0; index < this.template_ids.length; index++) {
            if(index==0){
              element =element+"ids="+this.template_ids[index];
            }else{
              element =element+"&ids="+this.template_ids[index];
            }
          }
          axios.delete('http://localhost:8090/sannova/delete_template?'+element)
                .then(response => {
                  console.log('deleteFiles:',response.data)
                  this.getFileDetail();
                })
                .catch(error => console.log(error));
        }
    },
  mounted(){
          let userinfo=localStorage.getItem('user_info');
          console.log(userinfo)
          if(userinfo==null){
            this.$router.push({path: '/'})
          }
          this.getStudyTypes();
    } 
}
</script>
<style>
.main {
  margin-left: 18%; /* Same as the width of the sidenav */
}
.studyStyle{
  text-align: left;
}
.headerp{
  text-align: left;
    padding-bottom: 19px;
    padding-top: 15px;
}
input[type="file"] {
    display: none;
}
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
</style>