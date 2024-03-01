<template>
  <Nav navPageName="formSelection"/>
  <div class="main">
    <div>
      <ul class="nav">
        <li class="uli1_sn">Study Number *</li>
        <li><input v-model="studynumber" placeholder="please add study number"></li>
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
  <br>
    
    <div><ul class="nav">
        <li class="uli1_ft">From Types *</li>
        <li class="tableContainer_forms">
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
              <tr v-for="row,index in rows" :key="index">
                <td class="customformselect">
                  <select class="form-select" @change="updateTemplateDropdown($event,index)" >
                    <option selected :value="0">Default Form Select</option>
                    <option v-for="sfile in fileDetails" :key="sfile.template_id" :value="sfile.template_id">{{sfile.template_name}}</option>
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
                <td class="buttonWrapper"><a href="#" class="clickbutton" @click="removeRow(index)">Delete</a></td>
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
import { toast } from 'vue3-toastify'

export default{
    name:'FormSelection',
    data(){
      const rows=reactive([
         {
            "tCount": 0,
            "studyId": 0,
            "studyNumber": '',
            "template_id": 0,
            "template_name":''
          }
      ]);
      const addRow=()=>{
        rows.push(
            {
            "tCount": 0,
            "studyId": 0,
            "studyNumber": '',
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
       studynumber:"",
       studyitem: [],  
       fileDetails: [], 
       selectedStudytype:''
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
        async getFileDetail(){
         // this.getSerialNumber();
          let response=await api.getAPI("http://localhost:8090/sannova/template_details/"+this.selectedStudytype);
          this.fileDetails=response.data
          if(this.fileDetails.length==0){
            toast("No template is available for selected study types.",{
                        autoClose: 3000,
                        type: toast.TYPE.WARNING,
                        newestOnTop: true,
                        theme: toast.THEME.COLORED,
                      });
          }else{
            this.fileDetails.map(v => Object.assign(v, {status: false}))
          }
        },
        updateTemplateDropdown(event,rowIndex){
            let value=event.target.value;
            const templateObj=value==0?'':this.fileDetails.filter(v=>v.template_id==value).map(v=>v.template_name);
            this.rows[rowIndex].template_id=value;
            this.rows[rowIndex].template_name=templateObj[0];
            this.rows[rowIndex].studyId=this.selectedStudytype;
            this.rows[rowIndex].studyNumber=this.studynumber;
        },
        decrease(count,index){
          if(count>0){
            this.rows[index].tCount=count-1;
          }
        },
        increase(count,index){
          this.rows[index].tCount=count+1;
        },
        async confirm(){
         
          if(this.studynumber.trim().length==0){
            toast("Please enter study number",{
                        autoClose: 2000,
                        type: toast.TYPE.WARNING,
                        newestOnTop: true,
                        theme: toast.THEME.COLORED,
                      });
          }else{
                let userinfo=JSON.parse(localStorage.getItem('user_info'));    
                const finalRequestArray=[];
                for (const key in this.rows) {
                  if(this.rows[key].template_id!=0){
                    let ObjectValue=this.rows[key];
                    if(ObjectValue.tCount!=0){
                      finalRequestArray.push(ObjectValue);
                    }
                  }
                }   
                if(finalRequestArray.length!=0){
                    const templatePayload= finalRequestArray.map(value=>
                            {return {"formCount": value.tCount,"templateId":value.template_id,"template_name":value.template_name}})
                    const finalPyload={
                      "studyId": this.selectedStudytype,
                      "studyNumber": this.studynumber,
                      "username": userinfo.data.userName,
                      "templateDetails":templatePayload
                    }
                    let response = await api.postAPI("http://localhost:8090/sannova/id_generator/generate"
                    ,finalPyload,'application/json')
                    localStorage.setItem("form_Print",JSON.stringify(response.data))
                    router.push({path:'/formPrint'});
                  }else{
                    toast("Please select study types and no of files",{
                        autoClose: 2000,
                        type: toast.TYPE.WARNING,
                        newestOnTop: true,
                        theme: toast.THEME.COLORED,
                      });
                  }
              }
            }
      },
    mounted(){
      util.navigate();
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

.customformselect{
  width: 325px;
}

.tableContainer_forms{
  max-height: 300px;
    overflow: auto;
}
  
</style>