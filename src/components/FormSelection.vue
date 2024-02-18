<template>
  <Nav navPageName="formSelection"/>
  <div class="main">
    <div>
      <ul class="nav">
        <li class="uli1_sn">Study Number *</li>
        <li><button class="button_sn">{{studynumber}}</button></li>
      </ul>
    </div>
    <div>
      <ul class="nav">
        <li class="uli1_sst_fs">Select Study types *</li>
        <li>
          <div class="studyStyle">
          <div v-for="study in studyitem" :key="study.study_id">
            <input type="radio" :id=study.study_id name="study" :value=study.study_id 
            v-model="selectedStudytype"  @change="getFileDetail">
            <label :for=study.study_id>{{study.study_name}}</label><br>
          </div>
        </div>
        </li>
      </ul>
    </div>
    <div><ul class="nav">
        <li class="uli1_ft">From Types *</li>
        <li>
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>select no of<br> Forms.</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="prevent" v-if="rows.length==0">
                <td>
                  <select class="form-select">
                    <option selected>Default Form Select</option>
                </select>
                </td>
                <td><div class="CountForm"><button class="desincbutton" disabled>-</button>0<button disabled class="desincbutton">+</button></div></td>
                <td><a href="#" class="clickbutton" @click="addRow" disabled>Add More</a></td>
                <td><a href="#" class="clickbutton" :id=index @click="removeRow(index)" disabled>Delete</a></td>
              </tr>
              <tr else v-for="row,index in rows" :key="row.index">
                <td :id=index>
                <select class="form-select" @change="addTemplate($event)">
                    <option selected :value="0" :id="index">Default Form Select</option>
                    <option :value="sfile.template_id" v-for="sfile,index in fileDetails" :key="sfile.template_id" :id="index">
                      {{sfile.template_name}}</option>
                </select>
                </td>
                <td>
                  <div class="CountForm">
                  <button class="desincbutton" @click="decrease(row.tCount,index)">-</button>
                  {{row.tCount}}
                  <button class="desincbutton" @click="increase(row.tCount,index)">+</button>
                  </div>
                </td>
                <td class="buttonWrapper"><a href="#" class="clickbutton" @click="addRow">Add More</a></td>
                <td class="buttonWrapper"><a href="#" class="clickbutton" :id=index @click="removeRow(index)">Delete</a></td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </div>
    <div>
      <ul class="nav">
        <li class="buttonWrapper"><a href="#" class="clickbutton" @click="confirm">Confirm</a></li>
      </ul>
    </div>
  </div>
</template>


<script>
import router from '../router'
import util from '@/util';
import api from '../api.js';
import Nav from './Navigation.vue'
import { reactive } from 'vue'

export default{
    name:'FormSelection',
    data(){
      const rows=reactive([]);
      const addRow=()=>{
        rows.push(
            {
            "tCount": 0,
            "studyId": this.selectedStudytype,
            "studyNumber": this.studynumber,
            "template_id": 0,
            "template_name":''
          }
        )
      };
      const removeRow=(index)=>{
        rows.splice(index,1);
        if(rows.length==0){
          this.addRow();
        }
      };
      return {
        rows,
        addRow,
        removeRow,
       studynumber:'',
       studyitem: [],  
       fileDetails: [], 
       selectedStudytype:''
      }
    },
    components:{
      Nav
    },
    methods:{
       async getSerialNumber(){
          let response=await api.getAPI("http://localhost:8090/sannova/study_number");
          this.studynumber=response.data;
        },
        async getStudyTypes(){
          let response=await api.getAPI("http://localhost:8090/sannova/study_types");
          this.studyitem=response.data;
        },
        async getFileDetail(){
          let response=await api.getAPI("http://localhost:8090/sannova/template_details/"+this.selectedStudytype);
          this.fileDetails=response.data
          if(this.fileDetails.length>0){
            this.addRow();
          }else{
            this.rows.splice(0)
          }
        },
        decrease(count,index){
          if(count>0)
            this.rows.at(index).tCount=count-1;
        },
        increase(count,index){
          this.rows.at(index).tCount=count+1;
        },
        addTemplate(event){
          let templateName=this.fileDetails.filter(v=>v.template_id==event.target.value).map(v=>v.template_name);
          let selectedindex=event.target.selectedIndex;
          this.rows.at(this.selectedindex).template_id= event.target.value
          this.rows.at(this.selectedindex).template_name=templateName;
          if(this.selectedindex==0){
            this.rows.at(this.selectedindex).tCount=0;
            this.rows.at(this.selectedindex).template_name='';
          }
        },
        confirm(){
          let userinfo=JSON.parse(localStorage.getItem('user_info'));
          if(this.rows.length !=0){
            const request= this.rows.filter(v=>v.template_id!=0);
            if(request.length!=0){
              const templatePayload= request.map(value=>
                      {return {"formCount": value.tCount,"templateId":value.template_id,"template_name":value.template_name}})
              const finalPyload={
                "studyId": this.selectedStudytype,
                "studyNumber": this.studynumber,
                "username": userinfo.data.userName,
                "templateDetails":templatePayload
              }
              localStorage.setItem("form_Print",JSON.stringify(finalPyload))
              router.push({path:'/formPrint'});
            }
          }
        } 
      },
    mounted(){
      util.navigate();
      this.getSerialNumber();
      this.getStudyTypes();
      }   
    }

</script>

<style>
  .uli1_ft{
    margin-right: 7%;
    height: 41px;
    line-height: 41px;
    text-align: center;
    margin-bottom: 1%;
    margin-top: 7%;
  }
  .uli1_sn{
    margin-right: 7%;
    height: 41px;
    line-height: 41px;
    text-align: center;
    margin-bottom: 1%;
  }
  .button_sn{
    padding: 12%;
    border: none;
  }
  .CountForm{
    border: 2px solid black;
    margin-top: 6%;
  }
  .desincbutton{
    border: none;
    padding: 0 15%;
    background-color: transparent;
  }
  
.prevent{
  pointer-events: none;
}

.uli1_sst_fs{
    margin-right: 4%;
    height: 41px;
    line-height: 41px;
    text-align: center;
    margin-bottom: 1%;
}
  
</style>