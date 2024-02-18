<template>
  <Nav navPageName="formSelection"/>
  <div class="main">
    <table class="table table-hover">
        <thead>
            <tr>
                <th>sl.no</th>
                <th>Form Title</th>
                <th>No. Of form</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row,index in tableDate.templateDetails" :key="row.index">
                <td>{{index}}</td>
                <td>{{row.template_name}}</td>
                <td>{{row.formCount}}</td>
            </tr>
        </tbody>
    </table>
    <ul class="nav">
        <li class="buttonWrapper">
          <a href="#"  class="clickbutton" @click="print">Print </a>
        </li>
        <li class="buttonWrapper">
          <a href="#"  class="clickbutton" @click="cancel">cancel</a>
        </li>
      </ul>
  </div>
   
</template>
<script>
import router from '../router'
import util from '@/util';
import Nav from './Navigation.vue'
import axios from 'axios'
import api from '../api.js';
export default{
    name: 'FormPrint',
    data(){
        return {
            tableDate:JSON.parse(localStorage.getItem('form_Print')),
        }
    },
    methods:{
        async print(){
            let response=await api.blobPostAPI("http://localhost:8090/sannova/form_confirmation_details"
            ,this.tableDate,'application/json');
              try{
                const blob = response.data;
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download',this.tableDate.studyNumber+'.zip');
                   document.body.appendChild(link);
                  link.click()
                  window.URL.revokeObjectURL(link);
              }catch(error){
                console.error('error download ',error)
              }
        },
        cancel(){
          router.push({path:'/formSelection'});
        }
    },
    mounted(){
      util.navigate();
    },
    components:{
      Nav
    }
}
</script>

<style >
.leftli1{
    margin-right: 7%;
    height: 41px;
    line-height: 41px;
    text-align: center;
    margin-bottom: 1%;
  }
  .square_btn{
    display: inline-block;
    padding: 0.3em 0.7em;
    text-decoration: none;
    background: #668ad8;
    color: #FFF;
    border-bottom: solid 4px #627295;
    border-radius: 10%;
    margin-top: 6%;
}
.square_btn:active {/*OnClick*/
    -ms-transform: translateY(4px);
    -webkit-transform: translateY(4px);
    transform: translateY(4px);/*Move down*/
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);/*Reduce Shadow*/
    border-bottom: none;
}
</style>