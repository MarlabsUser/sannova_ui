<template>
  <Nav navPageName="uploadTemplate"/>
  <div class="main">
    <div>
      <ul class="nav">
        <li class="uli1_dts">Document Template Setup</li>
        <template v-if="this.selectedStudytype==''">
          <li class="buttonWrapper">
            <label  class="clickbutton" @click="validateUpload()">
               Upload
            </label>
          </li>
        </template>
        <template v-else>
          <li class="buttonWrapper">
            <label  class="clickbutton" @change="handleFileUpload( $event )">
              <input type="file" multiple />
              <i class="fa fa-cloud-upload"></i> Upload
            </label>
          </li>
        </template>
        <template v-if="template_ids.length==0"><li class="buttonWrapper"><a href="#" class="clickbutton" @click="validateDelete">Delete</a></li></template>
        <template v-else><li class="buttonWrapper"><a href="#" class="clickbutton" @click="deleteFiles">Delete</a></li></template>
        
      </ul>
    </div>
    
    <div>
      <ul class="nav">
        <li class="uli1_sst">Select Study types *</li>
        <li>
          <div class="studyStyle">
            <div v-for="study in studyitem" :key="study.study_id">
              <input type="radio" :id=study.study_id name="study" :value=study.study_id v-model="selectedStudytype" @change="getFileDetail">
              <label :for=study.study_id>{{study.study_name}}</label><br>
            </div>
        </div>
        </li>
      </ul>
    </div>

    <div class="showfileStyle">
      <div class="headerp"><p>All uploaded files</p></div>
      <div class="tableContainer_ut">
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
    <div>
      <ul class="nav">
        <li class="buttonWrapper"><a href="#" class="clickbutton" @click="viewTemplates">View Template</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Nav from './Navigation.vue'
import axios from 'axios'
import util from '../util.js'
import api from '../api.js';
import router from '../router'
import { toast } from 'vue3-toastify'

export default{
  name:'UploadTemplate',
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
        async getStudyTypes(){
          let response=await api.getAPI("http://localhost:8090/sannova/study_types");
          this.studyitem=response.data;
        },
        async handleFileUpload(event ){
            let formData = new FormData();
            formData.append('study_id', this.selectedStudytype);
            for (const singleFile of event.target.files) {
              formData.append('file', singleFile);
            }

            await axios.post("http://localhost:8090/sannova/upload_template",formData,{headers: {'Content-Type': 'multipart/form-data'}})
                .then(response => {
                      toast("Templates were uploaded successfully.",{
                        autoClose: 3000,
                        type: toast.TYPE.SUCCESS,
                        newestOnTop: true,
                        theme: toast.THEME.COLORED,
                      });
                })
                .catch(error => console.log(error));
            this.getFileDetail();
            event.target.value = ''
        },
        validateUpload(){
          toast("Please select study type",{
                        autoClose: 3000,
                        type: toast.TYPE.WARNING,
                        newestOnTop: true,
                        theme: toast.THEME.COLORED,
                      });
        },
        validateDelete(){
          toast("Please select the uploaded files.",{
                        autoClose: 3000,
                        type: toast.TYPE.WARNING,
                        newestOnTop: true,
                        theme: toast.THEME.COLORED,
                      });
        },
        async getFileDetail(){
          let response=await api.getAPI("http://localhost:8090/sannova/template_details/"+this.selectedStudytype);
          this.fileDetails=response.data
        },
        async deleteFiles(){
          let element = "";
          for (let index = 0; index < this.template_ids.length; index++) {
            if(index==0){
              element =element+"ids="+this.template_ids[index];
            }else{
              element =element+"&ids="+this.template_ids[index];
            }
          }
          let response=await api.deleteAPI('http://localhost:8090/sannova/delete_template?'+element);
          this.getFileDetail();
          toast("Files were deleted successfully.",{
                        autoClose: 2000,
                        type: toast.TYPE.SUCCESS,
                        newestOnTop: true,
                        theme: toast.THEME.COLORED,
                      });
        },
        viewTemplates(){
          router.push({path:'/viewTemplate'});
        }
    },
  mounted(){
          util.navigate();
          this.getStudyTypes();
    } 
}
</script>
<style>

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
.upload{
  margin-right: 1%;
}
.delete{
  margin-right: 1%;
}

.uli1_dts{
    margin-right: 2%;
    height: 41px;
    line-height: 41px;
    text-align: center;
    margin-bottom: 1%;
  }

.uli1_sst{
    margin-right: 7%;
    height: 41px;
    line-height: 41px;
    text-align: center;
    margin-bottom: 1%;
  }

.tableContainer_ut {
    max-height: 290px;
    overflow: auto;
}
.table {
    position: sticky;
    top: 0;
    width: 100%;
}

</style>