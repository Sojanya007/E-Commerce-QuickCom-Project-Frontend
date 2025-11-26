import React, { useState } from "react";
import { postData, serverURL } from "../../../services/FetchNodeAdminServices";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

export default function SignIn(){
const [phonenumber,setPhoneNumber]=useState('')
 const [genOTP,setGenOTP]=useState('')
      
       
var navigate=useNavigate()

const fetchSmsApi=async(genOTP)=>{
    var response=await postData("sms/sendotp",{
        otp:genOTP,
        mobileno:phonenumber,
    })
}

const handleNextPage=()=>{
    
        var genOTP=parseInt(Math.random()*89999)+10000
        alert(genOTP)
        fetchSmsApi(genOTP)
    navigate("/otp",{state:{phonenumber,genOTP}})
}
var navigate=useNavigate()
    return(
         <div>
            <Grid container>
                <Grid style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:600}}>
                    <Paper elevation={6} style={{marginTop:100,marginRight:650,width:450,height:600,backgroundColor:'rgba(0, 0, 0, 0)',display:'flex',flexDirection:'column',alignItems:'center',borderRadius:25}}>
                    
                    <div style={{marginTop:30,marginRight:375}}>
                        <CloseIcon style={{width:30,height:30,color:"#0078ad"}}/>
                    </div>

                     <div style={{marginTop:20,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,textTransform:'none',fontSize:'2rem',letterSpacing:'-.72px',lineHeight:'1.1666666667',marginRight:280}}>
                        Sign in
                     </div>
                     <div style={{marginTop:15,marginRight:145,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,textTransform:'none',fontSize:'1rem',letterSpacing:'-.08px',lineHeight:'1.5'}}>
                        Verify your mobile number to   <div>accross your
                        <span style={{fontWeight:'bold'}}> QuickComm </span><span>account</span></div>
                        </div>
                        <div>
                            
                           <Box  component="form"
                          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                         noValidate
                         autoComplete="off"
                         >
                          
                                
                             <TextField onChange={(e)=>setPhoneNumber(e.target.value)} style={{width:400,display:'flex',justifyContent:'center',marginTop:30}} id="standard-basic" label="Mobile number"  defaultValue="+91-" variant="standard" />
                              
                           </Box>
                        </div>
                        <div>
                        <Button style={{border:'1px solid  #bdc3c7',width:410,marginTop:80,height:50,borderRadius:25,backgroundColor:"#0078ad",color:"white",fontWeight:'bold',fontSize:18}} onClick={handleNextPage}>
                        Continue 
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

 