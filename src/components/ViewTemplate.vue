<template>
  <Nav navPageName="viewTemplate"/>
  <div class="main">
    <div>
      <ul class="nav">
        <li class="uli1_sst_fs">Select Study types *</li>
        <li>
          <div class="studyStyle">
            <div v-for="study in studyitem" :key="study.study_id" @change="getFileDetail">
                <input type="checkbox" :id=study.study_id :name=study.study_name :value=study.study_id v-model="selectedStudytype" >
                <label :for=study.study_id>{{study.study_name}}</label><br>
            </div>
        </div>
        </li>
      </ul>
    </div>
    <div class="showfileStyle">
      <div class="headerp"><p>All uploaded files</p></div>
      <div class="tableContainer">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Document Title</th>
              <th>Uploaded By</th>
              <th>Date / Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in fileDetails" :key="item.template_id">
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
        <li class="uli1_sst_fs">Showing {{totalEntries}} entries </li>
        </ul>
    </div>
  </div>
</template>

<script>

import util from '@/util';
import api from '../api.js';
import Nav from './Navigation.vue'
import { reactive } from 'vue'

export default{
    name:'ViewTemplate',
    data(){
        return {
            studyitem: [],
            selectedStudytype:[],
            fileDetails:[],
            totalEntries:0
        }
    },
    components:{
      Nav
    },
    mounted(){
      util.navigate();
      this.getStudyTypes();
      },
    methods:{
        async getStudyTypes(){
          let response=await api.getAPI("http://localhost:8090/sannova/study_types");
          this.studyitem=response.data;
        },
        async getFileDetail(){
            if(this.selectedStudytype.length==0){
                this.fileDetails=[];
                this.totalEntries=0
            }else{
                let response=await api.getAPI("http://localhost:8090/sannova/template_details/"+this.selectedStudytype);
                this.fileDetails=response.data
                
                if(this.fileDetails.length==0){
                    alert("No template avilable for selected study types.")
                }else{
                    this.totalEntries=this.fileDetails.length
                }
            }
         
        },
      }     
}

</script>