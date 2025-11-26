import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useLocation } from "react-router-dom";
import { postData } from "../../../services/FetchNodeAdminServices";
import { useDispatch } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";
  

export default function SignIn(){
  const location=useLocation()
  const[mobileno,setMobileno]=useState(location.state.mobileno)
  const[firstName,setFirstName]=useState('')
  const[lastName,setLastName]=useState('')
  const[gender,setGender]=useState('')
  const[emailAddress,setEmailAddress]=useState('')
  const[dob,setDob]=useState('')
  const[snackBar,setSnackBar]=useState({open:false,message:''})
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleSubmit=async()=>{
    var body={mobileno,firstname:firstName,lastname:lastName,emailaddress:emailAddress,gender,dob}
    var response=await postData('userinterface/submit_user_data',body)
    if(response.status)
    { body['userid']=response.userid
       dispatch({type:"ADD_USER",payload:[response?.userid,body]})
        setSnackBar({message:response.message,open:true})
        navigate('/cart')
    }
    else
    {
      setSnackBar({message:response.message,open:true})
    }

  }
const handleClose=()=>{
  setSnackBar({message:'',open:false})
}
    return(
         <div>
            <Grid container>
                <Grid style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:600}}>
                    <Paper elevation={6} style={{marginTop:30,marginRight:650,width:450,height:700,backgroundColor:'rgba(0, 0, 0, 0)',display:'flex',flexDirection:'column',alignItems:'center',borderRadius:25}}>
                    
                    
                     <div style={{marginTop:50,marginRight:100,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,textTransform:'none',fontSize:'1.8rem' ,lineHeight:'1.1666666667'}}>
                        Setup Your Account
                     </div>
                     <div style={{marginTop:15,marginRight:100,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,textTransform:'none',fontSize:'1rem',letterSpacing:'-.08px',lineHeight:'1.5'}}>
                        Seemless Onboarding,quick checkouts,and   
                          
                        </div>
                        <div style={{ marginRight:80,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,textTransform:'none',fontSize:'1rem',letterSpacing:'-.08px',lineHeight:'1.5'}}>
                        faster deliveries across QuickComm and other
                          
                        </div>
                        <div style={{ marginRight:220,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,textTransform:'none',fontSize:'1rem',letterSpacing:'-.08px',lineHeight:'1.5'}}>
                        Reliance Retail Platforms.
                          
                        </div>
                        <div>
                            
                           <Box  component="form"
                          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                         noValidate
                         autoComplete="off"
                         >
                          
                             <TextField onChange={(e)=>setFirstName(e.target.value)} style={{width:400,display:'flex',justifyContent:'center',marginTop:5}} id="standard-basic" label="First Name*" variant="standard" />
                         
                           </Box>
                        </div>

                        <div>
                            
                            <Box  component="form"
                           sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                          noValidate
                          autoComplete="off"
                          >
                           
                              <TextField onChange={(e)=>setLastName(e.target.value)} style={{width:400,display:'flex',justifyContent:'center',marginTop:5}} id="standard-basic" label="Last Name*" variant="standard" />
                          
                            </Box>
                         </div>

                         <div style={{marginRight:126,marginTop:5}}>
                         <FormControl>
      <FormLabel  id="demo-row-radio-buttons-group-label" style={{fontWeight:'bolder',fontSize:19,color:'black'}}>Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel onChange={(e)=>setGender(e.target.value)} value="Female" control={<Radio />} label="Female" />
        <FormControlLabel onChange={(e)=>setGender(e.target.value)} value="Male" control={<Radio />} label="Male" />
        <FormControlLabel onChange={(e)=>setGender(e.target.value)} value="Other" control={<Radio />} label="Other" />
         
      </RadioGroup>
    </FormControl>
                         </div>

                         <div>
                            
                            <Box  component="form"
                           sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                          noValidate
                          autoComplete="off"
                          >
                           
                              <TextField onChange={(e)=>setEmailAddress(e.target.value)} style={{width:400,display:'flex',justifyContent:'center',marginTop:5}} id="standard-basic" label="E-Mail ID" variant="standard" />
                          
                            </Box>
                         </div>

                         <div>
                            
                            <Box  component="form"
                           sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                          noValidate
                          autoComplete="off"
                          >
                           
                              <TextField onChange={(e)=>setDob(e.target.value)} style={{width:400,display:'flex',justifyContent:'center',marginTop:5}} id="standard-basic" label="Date Of Brith" variant="standard" />
                          
                            </Box>
                         </div>

                         
                        <div>
                        <Button onClick={handleSubmit} style={{border:'1px solid  #bdc3c7',width:410,marginTop:40,height:50,borderRadius:25,backgroundColor:"#0078ad"}}>
            <div style={{color:"white",fontWeight:'bold',fontSize:18 }}>Submit</div>
           </Button>
                        </div>

                        <div style={{display:'flex',marginTop:20}}>
                            <div style={{fontSize:15}}>By continuing, you agree to our</div> <div style={{marginLeft:2.5,color:"#0a2885"}}> Terms and Conditions of</div>
                        </div>

                        <div style={{fontSize:15,color:"#0a2885"}}>
                            Use, Privacy Policy and Retail Account Privacy Policy.
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar
       anchorOrigin={{ vertical:'top', horizontal:'right' }}
      
       open={snackBar.open}
  autoHideDuration={1000}
  onClose={handleClose}
  message={snackBar.message}
       
       
     />
         </div>
      


    )
}

 