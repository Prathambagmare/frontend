import React, { useCallback, useEffect, useState } from 'react';
import { unstable_HistoryRouter, useNavigate } from 'react-router-dom';

import './Perpe.ttf'

import axios from 'axios';
import './login.css'
import App from '../App';

function LoginPage(){

    let nav = useNavigate();


   
    let [tokenss,setTokens]=useState(true);

    console.log(sessionStorage.getItem("token"));

    useEffect(()=>{
        console.log(tokenss);
    },[tokenss])


    
async function getToken(username,password){
        let bodyFormData = new FormData();
        bodyFormData.set('grant_type',"password");
        bodyFormData.set('username',username);
        bodyFormData.set('password',password);
        bodyFormData.set('client_id',"the_grand_shine");
        bodyFormData.set('client_secret',"by_pratham");



    //   await axios.post("http://localhost:8180/auth-api/oauth/token",bodyFormData,{
    //      headers: {
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Credentials": "true",
    //                 "Accept":"*",
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //               }
    //     }).then((response)=> sessionStorage.setItem("token",response.data.access_token));
  

    
//   const token = await axios.post("http://localhost:8180/auth-api/oauth/token",bodyFormData,{
//         headers: {
//            "Access-Control-Allow-Origin": "*",
//            "Access-Control-Allow-Credentials": "true",
//                    "Accept":"*",
//                    'Content-Type': 'application/x-www-form-urlencoded',
//                  }
//        }).then((response)=> {return response.data.access_token});

       try{
        const token = await axios.post("http://localhost:8180/auth-api/oauth/token",bodyFormData,{
            headers: {
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Credentials": "true",
                       "Accept":"*",
                       'Content-Type': 'application/x-www-form-urlencoded',
                     }
           }).then((response)=> {return response.data.access_token});
           localStorage.setItem("token",token);
           console.log(localStorage.getItem("token"));
           console.log("aa")
           
    }catch(error){
     
        setTokens(false);
        console.log("zz")
        console.log(localStorage.getItem("token"))
        setTokens(false);
        console.log(tokenss)
    }
 

    }



    async function checUser(username,password){
        const bod = {
            username: username,
            password: password
         };

         let token1 = localStorage.getItem("token");
         console.log(token1)
        const config = {
            headers: { Authorization: `Bearer ${token1}` }
        };

      await axios.post("http://localhost:8180/auth-api/login/getLoginUser",bod,config).then(function (response) {
            localStorage.setItem("uname",response.data.username);
            localStorage.setItem("name",response.data.fullName);
            localStorage.setItem("age",response.data.age);
            localStorage.setItem("gender",response.data.gender);
            localStorage.setItem("role",response.data.roles[0]);
            
          });
          console.log(localStorage.getItem("uname"));
    }
    

   async function checkVal(){

        const username = document.getElementById('username').value;
        const password = document.getElementById('pass').value






        const msg = document.getElementById('login-empty-msg')
        const msg2 = document.getElementById('login-wrong-msg')



        if(username.length==0||password.length==0){
            msg.style.display="block"
        }else{
            msg.style.display="none"
            
            await getToken(username,password);
            console.log("below");
            console.log(localStorage.getItem("token"));
            
console.log("Cc")
console.log(tokenss)


   
            if(localStorage.getItem("token")!=null){
                console.log("not Null")
                localStorage.setItem("isAuth",true)

              
             
                await checUser(username,password);


     
        nav('/home')
            }else{
              //  getUser(username,password);
            
                msg2.style.display="block"
            }
            
        }
    }

    return(
        <div className='log-pg-main'>
            <div className='log-pg-inr-cnt'>
                <div className='log-pg-cl1'>
                    <div className='containerr'>
                <img src="/grandShine.png" alt="grandShine" className='main-logo' />
         
                </div>
                <div className='containerr'>
                <h1 className='rtwi'>The Grand Shine</h1>
                </div>
            
                </div>
               
                <div className='log-pg-cl2'>

                    <div className='log-pg-cl2-contents'>
                    <h2>Login</h2>
                        
                        <div className='log-pg-uname'>
                            Username <input id="username" className='log-pg-inp'></input>
                        </div>
                        <div className='log-pg-uname'>
                            Password <input id="pass" type="password" className='log-pg-inp'></input>
                        </div>
                        <div className='log-pg-cl2-ops'>
                            <div className='log-pg-cl2-ops-l'><input type='checkbox'></input>Remember me</div>
                            <div className='log-pg-cl2-ops-r'>Forgot password?</div>
                        </div>
                        <div className='log-pg-empty-msg' id='login-empty-msg'>*Fields can't be empty</div>
                        <div className='log-pg-empty-msg' id='login-wrong-msg'>*Invalid Username or Password</div>
                        <div className='log-pg-cl2-lgbtn' onClick={checkVal}>
                            <button>Login</button>
                        </div>
                        
                    </div>
                   
                </div>
            </div>    
        </div>
    )
}

export default LoginPage;