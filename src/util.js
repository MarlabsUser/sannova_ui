import router from './router'
const DEFAULT_FORM_STATE = {
    isbn: 'http://localhost:8090/sannova',
    title: '',
    author: '',
    description: '',
    creationDate: ''
   };
export default {

    navigate() { 
        let userinfo=JSON.parse(localStorage.getItem('user_info'));
    
        if(userinfo==null){
            router.push({path:'/'});
        }
    },
    afterloginNavigation(){
        let userinfo=JSON.parse(localStorage.getItem('user_info'));
     
        if(userinfo){
            if(userinfo.data.roleName=='admin'){
                router.push({path:'/uploadTemplate'});
            }else if (userinfo.data.roleName=='default') {
                router.push({path:'/formSelection'});
            }else if (userinfo.data.roleName=='qe') {
                router.push({path:'/reconsiliation'});
            }else{
                router.push({path:'/'});
            }
        }
    }
  }