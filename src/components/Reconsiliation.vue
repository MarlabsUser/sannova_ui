<template>
    <Nav navPageName="reconsiliation"/>
    <div class="main">
        <div>
            <ul class="nav">
                <li class="leftli1">Study Number *</li>
                <li class="leftli2"><input type="text" id="studyNumber" v-model="serialNumber" @click="emptyDate"></li>
            </ul>
            <ul class="nav">
                <li class="leftli3">Or</li>
            </ul>
            <ul class="nav">
                <li class="leftli1">Date Range</li>
                <li><Datepicker @click="emptyStudyNumber" v-model="fromDate" :preview-format="format" /></li>
                <li>.......</li>
                <li><Datepicker @click="emptyStudyNumber" v-model="toDate" :preview-format="format"  /></li>
            </ul>
        </div>
        <div>
            <ul class="nav">
                <li class="buttonWrapper"><a href="#" class="clickbutton" @click="getDetails">Get Details</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import Nav from './Navigation.vue'
import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'
import router from '../router'
import util from '@/util';
import api from '../api.js';

export default{
    name:'Reconsiliation',
    components:{
      Nav,
      Datepicker
    },
    data(){
    const fromDate = ''
    const toDate = ''
    const format = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `Selected date is ${year}-${month}-${day} 00:00:00`;
        }
    return {
        fromDate,
        toDate,
        serialNumber:'',
        format
        }
    },
    methods:{
        getDateFormat(inputDate){
            if(inputDate){
                const day = this.fromDate.getDate().toString().padStart(2, "0");
                const month = (this.fromDate.getMonth() + 1).toString().padStart(2, "0");
                const year = this.fromDate.getFullYear().toString();
                return year+"-"+month+"-"+day+" 00:00:00";
            }else{
                return inputDate;
            }
        },
        async getDetails(){
            var validSerial=false;
            if(this.serialNumber!=''){
                const substringValue=this.serialNumber.substring(this.serialNumber.length-4);
                var reg = new RegExp('^[0-9]*$');
                if(!reg.test(substringValue)){
                    validSerial=false;
                }else{
                    validSerial=true;
                }
            } 

            if(this.serialNumber!='' && !validSerial){
                alert("Invalid serialNumber format entered");
            } else if(this.serialNumber=='' &&  this.fromDate=='' && this.toDate==''){
                alert("Please enter serial number or pick date");
            }else if(this.fromDate==''&&this.toDate!=''){
                alert("please enter end date");
            }else  if(this.fromDate !=''&&this.toDate==''){
                alert("please enter end date");
            }else{
                const payload={
                    "serial_number": this.serialNumber,
                    "from_date": this.getDateFormat(this.fromDate),
                    "to-date": this.getDateFormat(this.toDate)
                    }
                const response=await api.postAPI("http://localhost:8090/sannova/reconsiliation",payload,"application/json");
            }
        },
        emptyStudyNumber(){
            this.serialNumber='';
        },
        emptyDate(){
            this.fromDate='';
            this.toDate='';
        }
    }
}
</script>

<style>
  .leftli1{
    margin-right: 7%;
    height: 41px;
    line-height: 41px;
    text-align: center;
    margin-bottom: 1%;
  }
</style>
