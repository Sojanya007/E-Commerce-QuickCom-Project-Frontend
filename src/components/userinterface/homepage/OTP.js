import React from "react";
import { postData, serverURL } from "../../../services/FetchNodeAdminServices";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import  { useState,useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { MuiOtpInput } from 'mui-one-time-password-input'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
 
export default function SignIn(){
    const [otp, setOtp] = useState('');
    const navigate=useNavigate()
      const dispatch=useDispatch()
      
    const location=useLocation()
    const mobileno=location?.state?.phonenumber
    const genOTP=location?.state?.genOTP

    const handleChange = (newValue) =>{
        setOtp(newValue)
    }
   const handleVerify=async()=>{

  if(otp==genOTP)
  {

    var response=await postData('userinterface/check_user_mobileno',{mobileno})
    if(response.status)
    { dispatch({type:"ADD_USER",payload:[response.data.userid,response.data]})
   
    var res=await postData('userinterface/check_user_address',{userid:response.data.userid})
    //alert(res.status)
      if(res.status)
      { //alert(JSON.stringify (res?.data))
         var userDataWithAddress={...response.data,...res?.data[0]}  
      dispatch({type:"ADD_USER",payload:[response.data.userid,userDataWithAddress]})
      }
      


    navigate('/cart')
    }
    else
    {
        navigate("/userregistration",{state:{mobileno}})
    }
}
else
{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid OTP!",
        
      });
}
   }
    
     
    return(
         <div>
            <Grid container>
                <Grid style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:600}}>
                    <Paper elevation={6} style={{marginTop:100,marginRight:650,width:450,height:600,backgroundColor:'rgba(0, 0, 0, 0)',display:'flex',flexDirection:'column',alignItems:'center',borderRadius:25}}>
                    
                    <div style={{marginTop:30,marginRight:375}}>
                        <img src={`${serverURL}/images/leftarrow.png`} style={{width:20,height:20}}/>
                    </div>

                     <div style={{marginTop:20,marginRight:150,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,textTransform:'none',fontSize:'1.8rem' ,lineHeight:'1.1666666667'}}>
                        OTP verification
                     </div>
                     <div style={{marginTop:15,marginRight:147,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,textTransform:'none',fontSize:'1rem',letterSpacing:'-.08px',lineHeight:'1.5'}}>
                        Enter the OTP sent to you on   <div style={{display:'flex'}}>{mobileno}
                        <div style={{fontWeight:'bold',marginLeft:5,color:"#0a2885"}}> Change number </div> </div>
                        </div>
                        <div style={{marginTop:40}}>
                        <MuiOtpInput value={otp} length={5} onChange={handleChange} style={{width:'400px'}}/>
                        </div>
                        <div style={{marginLeft:300}}>
                            <Button style={{fontWeight:'bold',color:"#0a2885",marginTop:5}}>Resend OTP</Button>
                        </div>
                        <div>
                        <Button style={{border:'1px solid  #bdc3c7',width:410,marginTop:80,height:50,borderRadius:25,backgroundColor:"#0078ad",color:"white",fontWeight:'bold',fontSize:18}} onClick={handleVerify}>
                         Verify
                       </Button>
                        </div>

                        <div style={{display:'flex',marginTop:40}}>
                            <div style={{fontSize:15}}>By continuing, you agree to our</div> <div style={{marginLeft:2.5,color:"#0a2885"}}> Terms and Conditions of</div>
                        </div>

                        <div style={{fontSize:15,color:"#0a2885"}}>
                            Use, Privacy Policy and Retail Account Privacy Policy.
                        </div>
                    </Paper>
                </Grid>
            </Grid>
         </div>
      


    )
}

 