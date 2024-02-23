<template>
    <Nav navPageName="reconsiliation"/>
    <div class="main">
        <div>
            <ul class="nav">
                <li class="uli1_snr">Study Number *</li>
                <li><input type="text" id="studyNumber" v-model="serialNumber" @click="emptyDate"/></li>
            </ul>
            <ul class="nav">
                <li class="uli1_or">Or</li>
            </ul>
            <ul class="nav">
                <li class="uli1_fr">From</li>
                <li class="uli1_tr">To</li>
            </ul>
            <ul class="nav">
                <li class="uli1_drr">Date Range</li>
                <li><datepicker @click="emptyStudyNumber" v-model="fromDate"  :inputFormat="customHeadingFormat" /></li>
                <li>.......</li>
                <li><datepicker @click="emptyStudyNumber" v-model="toDate" :inputFormat="customHeadingFormat"/></li>
            </ul>
        </div>
        <div>
            <ul class="nav">
                <li class="buttonWrapper"><a href="#" class="clickbutton" @click="getDetails">Get Details</a></li>
            </ul>
        </div>
        <div class="tableContainer">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Study name</th>
                        <th>Form title</th>
                        <th>No. Of form printed</th>
                        <th>Printed by</th>
                        <th>Study number</th>
                        <th>Date</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="row,index in tableDat" :key="index">
                        <td>{{row.studyType}}</td>
                        <td>{{row.formTitle}}</td>
                        <td>{{row.formPrinted}}</td>
                        <td>{{row.printedBy}}</td>
                        <td>{{row.studyNumber}}</td>
                        <td>{{row.dateAndTime}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <ul class="nav">
                <li class="buttonWrapper"><a href="#" class="clickbutton" @click="print">Print Details</a></li>
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
    
    return {
        fromDate,
        toDate,
        serialNumber:'',
        tableDat:[],
        customHeadingFormat: 'dd MMM yyyy'
        }
    },
    methods:{
        getDateFormat(inputDate){
            if(inputDate){
                const day =inputDate.getDate().toString().padStart(2, "0");
                const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
                const year = inputDate.getFullYear().toString();
                return year+"-"+month+"-"+day;
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
                if(response.data.length==0){
                    alert("No print details found")
                }else{
                    this.tableDat=response.data;
                }
            }
        },
        emptyStudyNumber(){
            this.serialNumber='';
        },
        emptyDate(){
            this.fromDate='';
            this.toDate='';
        },
        async print(){
            if(this.tableDat.length==0){
                alert("No data to Print")
            }else{
                const response=await api.blobPostAPI("http://localhost:8090/sannova/reconsiliation/print",this.tableDat);
                if(response.length==0){
                    alert("No print found")
                }else{
                    util.downloadFile(response.data,"reconciliation.xls")
                }
             
            }
        }
    }
}
</script>

<style>
.uli1_snr{
    margin-right: 4%;
    height: 25px;
    line-height: 34px;
    text-align: center;
    margin-bottom: 1%;
  }
.uli1_fr{
    margin-right: 7%;
    height: 29px;
    line-height: 34px;
    text-align: center;
    margin-bottom: 1%;
    margin-left: 16%;
}
.uli1_tr{
    margin-right: 7%;
    text-align: center;
    margin-bottom: 1%;
    height: 29px;
    line-height: 34px;
    margin-left: 11%;
}
.uli1_or{
    margin-right: 7%;
    height: 28px;
    line-height: 36px;
    text-align: center;
    margin-bottom: 1%;
}
.uli1_drr{
    margin-right: 7%;
    height: 41px;
    line-height: 41px;
    text-align: center;
    margin-bottom: 1%;
}
.tableContainer {
    max-height: 300px;
    overflow: auto;
}
</style>
