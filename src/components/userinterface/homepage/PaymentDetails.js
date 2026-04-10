import React, { useState,useEffect } from "react";
import { Box, Drawer, } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeAdminServices";
import Divider from "@mui/material/Divider";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { postData } from "../../../services/FetchNodeAdminServices";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CloseIcon from '@mui/icons-material/Close';
import Swal from "sweetalert2";

 
export default function PaymentDetails({refresh,setRefresh}){
  
 var [order,setOrders]=useState('') 
 var [open,setOpen]=useState(false) 
 var dispatch = useDispatch()
 var cartData = useSelector((state) => state?.cart)
 var user = useSelector((state) => state?.user)
 
 var userData = Object.values(user)
  
 console.log("USSSSEERR:", userData)
 var data = Object.values(cartData)
 var keys = Object.keys(cartData)
 var navigate=useNavigate()
 
 var totalamount = data.reduce((f, s) => {
  var ap = 0

  ap = s.price * s.qty
  return f + ap
}, 0)


var discount = data.reduce((f, s) => {
  var ap = 0
  if (s.offerprice > 0) {
      ap = (s.price - s.offerprice)* s.qty
  }
  
  return f + ap
}, 0)
 /***States Address***/
 const [userId,setUserID]=useState('')
 const [pinCode,setPinCode]=useState('')
 const [houseNo,setHouseNo]=useState('')
 const [floorNo,setFloorNo]=useState('')
 const [towerNo,setTowerNo]=useState('')
 const [building,setBuilding]=useState('')
 const [address,setAddress]=useState('')
 const [landmark,setLandmark]=useState('')
 const [city,setCity]=useState('')
 const [state,setState]=useState('')
 const [btnTxt,setBtnTxt]=useState('Place Order')
 /**********/
 /********Orders*/
 
   const handlePayment= async ()=>{
         const options = {
             key:"rzp_test_GQ6XaPC6gMPNwH",
             amount: (totalamount-discount)*100,
             currency:"INR",
             name:"QuickCom",
             description:"Test Transaction",
             image:`${serverURL}/images/logo.png`,


             handler: async (res) => {
    console.log(res)
    
    const transactionId = res.razorpay_payment_id

    const transactionTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

 
 
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const body = {
              
            userid: userData[0]?.userid,
            orderdate: transactionTime,
            productdetailid: item.productdetailid,
            qty: item.qty,
            paymentstatus: "Paid",
            deliverystatus: "Pending",
            mobileno: userData[0].mobileno,
            emailaddress: userData[0].emailaddress,
            address: userData[0].address,
            transactionid: transactionId,
            name: userData[0]?.firstname,  
        };

        await postData('userinterface/submit_order_data', body)

        
    }

    dispatch({ type: 'CLEAR_CART', payload: [] });

    await postData('sms/send_mail', {
        to: userData[0]?.emailaddress,
        subject: 'Your Cart',
        message: '<h1>Bill</h1>'
    });

    navigate("/homepage")
},
 
          
             prefill:{
                 name:userData[0]?.fullname,
                 email:userData[0]?.emailaddress,
                 contact:userData[0]?.mobileno,
             },
             notes:{
                 address: "Razorpay Corporate Office",
             },
             theme:{
                 color:"#3399cc",
             },
         }
         const rzp1 = new window.Razorpay(options)
         await rzp1.open()
     }
     useEffect(function(){
         const script = document.createElement("script")
         script.src="https://checkout.razorpay.com/v1/checkout.js"
         script.async=true
         document.body.appendChild(script)
     },[])
 
 /*********/


 /***************** */

 /***************** */
 /*************/
  
 const handleClose=(bool)=>{
  setOpen(bool)
 }
 const handleSubmitAddress=async()=>{
  var body={userid:userData[0]?.userid, pincode:pinCode, houseno:houseNo, floorno:floorNo, towerno:towerNo, building:building, address:address, landmark:landmark, city:city, state:state}
  var response=await postData('userinterface/submit_user_address',body)
  if(response.status)
    { //var {userid,...remainingData}=userData[0] //for removing a particular data
      var userDataWithAddress={...userData[0],...body}  //...(spread operator)
       dispatch({type:"ADD_USER",payload:[userData[0]?.userid,userDataWithAddress]})
       Swal.fire({
       
        icon: "success",
        text:response.message,
        showConfirmButton: false,
        timer: 1500,
        toast:true
      }); 
      setBtnTxt("Make Payment")  
      setRefresh(!refresh)
        navigate('/cart')
    }
    else
    {
      Swal.fire({
       
        icon: "success",
        text:response.message,
        showConfirmButton: false,
        timer: 1500,
        toast:true
      });   
    }
    setOpen(false)

 }
  
 const handlePlaceOrder=async()=>{
  if(btnTxt=="Make Payment")
  {handlePayment()}
  else
  {
  if(userData.length==0)
  {
 navigate('/signin')
 }
 else
 {  
  var response=await postData('userinterface/check_user_address',{userid:userData[0]?.userid})
  if(response.status)
  { //alert(JSON.stringify (response?.data))
     var userDataWithAddress={...userData[0],...response?.data[0]}  
  dispatch({type:"ADD_USER",payload:[userData[0]?.userid,userDataWithAddress]})
  setBtnTxt("Make Payment")
  }
  else
  {
    setOpen(true)
  }
 } 
}
}

 

const addressView=()=>{
  return(
  <div>
  <Box style={{width:380,height:600,borderRadius:15,justifySelf:'right' }}>
<div style={{marginLeft:25}}>
<div style={{display:'flex' }}>
<div style={{marginTop:30,fontFamily:'JioType, helvetica, arial, sans-serif', fontWeight:900, fontSize:25, letterSpacing:0.15, lineHeight:1}}>
Add Address
</div>
<div  >
<CloseIcon style={{width:25,height:25,marginTop:30,marginRight:20}}/>
</div>
</div>
<div style={{marginTop:30,fontFamily:'JioType, helvetica, arial, sans-serif', fontWeight:900, fontSize:16, letterSpacing:0.15, lineHeight:1}}>
Address Details
</div>

<div style={{marginTop:15, display:'flex'}}>
<MyLocationIcon style={{fontSize:20, color:'#0078ad'}}/>
<div style={{color:'#0078ad', fontWeight:500, fontSize:13.5, letterSpacing:0.25, lineHeight:1.4285714286,marginLeft:15}}>
Use Current Location
</div>
</div>
<div style={{fontWeight:700, fontSize:11.5, letterSpacing:0.07, lineHeight:1.4285714286, color:'rgba(0, 0, 0, .65)',overflow:"hidden",textOverflow:'ellipsis',display:"-webkit-box", webkitLineClamp:"1",WebkitBoxOrient:"vertical",marginLeft:35}}>
Using GPS

</div>
<Grid container spacing={1}>
<Grid item xs={12} style={{width:'90%',marginTop:8}}>
<TextField onChange={(e)=>{setPinCode(e.target.value)}} label="Pin Code" variant="standard" fullWidth/>
</Grid>
<Grid item xs={6} style={{width:'90%',marginTop:5}}>
<TextField onChange={(e)=>{setHouseNo(e.target.value)}} label="House No." variant="standard" fullWidth/>
</Grid>
<Grid item xs={6} style={{width:'90%',marginTop:5}}>
<TextField onChange={(e)=>{setFloorNo(e.target.value)}} label="Floor No." variant="standard" fullWidth/>
</Grid>
<Grid item xs={12} style={{width:'90%',marginTop:5}}>
<TextField onChange={(e)=>{setTowerNo(e.target.value)}} label="Tower No." variant="standard" fullWidth/>
</Grid>
<Grid item xs={12} style={{width:'90%',marginTop:5}}>
<TextField onChange={(e)=>{setBuilding(e.target.value)}} label="Building / Apartment Name" variant="standard" fullWidth/>
</Grid>
<Grid item xs={12} style={{width:'90%',marginTop:5}}>
<TextField onChange={(e)=>{setAddress(e.target.value)}} label="Address" variant="standard" fullWidth/>
</Grid>
<Grid item xs={12} style={{width:'90%',marginTop:5}}>
<TextField onChange={(e)=>{setLandmark(e.target.value)}} label="Landmark / Area" variant="standard" fullWidth/>
</Grid>
<Grid item xs={6} style={{width:'90%',marginTop:5}}>
<TextField onChange={(e)=>{setCity(e.target.value)}} label="City" variant="standard" fullWidth/>
</Grid>
<Grid item xs={6} style={{width:'90%',marginTop:5}}>
<TextField onChange={(e)=>{setState(e.target.value)}} label="State" variant="standard" fullWidth/>
</Grid>

</Grid>
</div> 
</Box>
<Box style={{border:'2px solid #bdc3c7',width:'99%',height:10,opacity:0.2,background:'#e5f7ee'}}></Box>

<Box style={{width:380,height:250,borderRadius:15,justifySelf:'right'}}>
<div>
<div style={{padding:25,fontFamily:'JioType,helvetica,arial,sans-serif',fontWeight:900, fontSize:14, letterSpacing:0.15, lineHeight:1}}>
Delivery Contact Details
</div>
<div style={{fontWeight:500, fontSize:11.5, letterSpacing:0.15, lineHeight:1.4285714286, color:'rgba(0, 0, 0, .65)', webkitLineClamp:"1",WebkitBoxOrient:"vertical",marginLeft:20,marginTop:15}}>
This mobile number will receive an OTP, required for collecting the order.
</div>
<Grid container spacing={1}>
<Grid item xs={12} style={{width:'90%',marginTop:5,marginLeft:20}}>
<TextField label="Receiver's Name" variant="standard" fullWidth/>
</Grid>
<Grid item xs={12} style={{width:'90%',marginTop:5,marginLeft:20}}>
<TextField label="Receiver's Number" variant="standard" fullWidth/>
</Grid> 
</Grid>
</div>
</Box>
<Box style={{border:'2px solid #bdc3c7',width:'99%',height:10,opacity:0.2,background:'#e5f7ee'}}></Box>
<Box  style={{width:380,height:250,borderRadius:15,justifySelf:'right' }}>
<div style={{padding:25,fontFamily:'JioType,helvetica,arial,sans-serif',fontWeight:900, fontSize:15, letterSpacing:0.15, lineHeight:1}}>
Save as
</div>
<div style={{display:'flex',justifyContent:'space-evenly'}}>
<Button style={{cursor:'pointer',width:90,height:33,border:'1px solid #ddd',display:'flex',justifyContent:'center',borderRadius:10,padding:3,color:'#0078ad',marginTop:2, fontWeight:500,fontSize:15,letterSpacing:0.25,lineHeight:1.4285714286,alignItems:'center'}}>
Home
</Button>
<Button style={{cursor:'pointer',width:90,height:33,border:'1px solid #ddd',display:'flex',justifyContent:'center',borderRadius:10,padding:3,color:'#0078ad',marginTop:2, fontWeight:500,fontSize:15,letterSpacing:0.25,lineHeight:1.4285714286,alignItems:'center'}}>
Work
</Button>
<Button style={{cursor:'pointer',width:90,height:33,border:'1px solid #ddd',display:'flex',justifyContent:'center',borderRadius:10,padding:3,color:'#0078ad',marginTop:2, fontWeight:500,fontSize:15,letterSpacing:0.25,lineHeight:1.4285714286,alignItems:'center'}}>
Other
</Button>
</div>
<Grid item xs={12}>
<Button onClick={handleSubmitAddress} style={{borderRadius:25,marginLeft:14, height:53, marginTop:70, color:"#fff", background:"#0078ad", fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700, fontSize:14, letterSpacing:-0.07, lineHeight:1.4285714286,width:'95%'}} fullWidth>
Save and Proceed
</Button>
</Grid>
</Box>
</div>
  )
}

const steps = [
 'Your Cart',
 'Order Review',
 'Payment',
];
 

    return(

        <div>
            <Box style={{border:'1px solid  #bdc3c7',borderRadius:25,width:"400px",height:"90px",backgroundColor:"#e5f1f7" ,marginTop:50,marginLeft:20}}>
            <Stepper activeStep={1} alternativeLabel style={{marginTop:15}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
            </Box>

            <Box style={{border:'1px solid  #bdc3c7',borderRadius:25,width:"400px",height:"65px" ,marginTop:20,marginLeft:20}}>
             <div style={{display:'flex'}}>
             <img src={`${serverURL}/images/coupon.png`} style={{width:35,marginTop:15,marginLeft:30}}/>
             <div style={{marginLeft:15,marginTop:20,fontWeight:'bold'}}>Appy Coupon</div>
             <div style={{marginLeft:160,marginTop:20,fontWeight:'bold'}}><KeyboardArrowRightIcon style={{color:'blue',width:50}}/></div>
             </div>
            </Box>

            <Box style={{border:'1px solid  #bdc3c7',borderRadius:25,width:"400px",height:"280px" ,marginTop:30,marginLeft:20}}>
            <div>
                <div style={{marginLeft:20,marginTop:25,fontWeight:'bolder'}}>Payment Details</div>

                <div style={{fontSize:17,marginLeft:20,marginTop:15,display:'flex',fontWeight:'bold',justifyContent:"space-between"}}>MRP Total<div style={{marginRight:20}}>&#8377;{totalamount.toFixed(2)}</div></div>

                <Divider style={{marginTop:15,marginLeft:20,width:350,color:'black'}}/>

                <div style={{fontSize:17,marginLeft:20,marginTop:10,display:'flex',fontWeight:'bold',justifyContent:"space-between"}}>Product Discount<div style={{ marginRight:20, color: '#03753c'}}>-&#8377;{discount.toFixed(2)}</div></div>

                <Divider style={{marginTop:20,marginLeft:20,width:350,color:'black'}}/>


                <div style={{fontSize:17,marginLeft:20,marginTop:10,display:'flex',fontWeight:'bold',justifyContent:"space-between"}}>Delivery Fee (Hyperlocal)<div style={{marginRight:20, color: '#03753c'}}>FREE</div> </div>

                <Divider style={{marginTop:20,marginLeft:20,width:350,color:'black'}}/>

                <div style={{fontSize:17,marginLeft:20,marginTop:10,display:'flex',fontWeight:'bold',justifyContent:"space-between"}}>Total <div style={{ fontWeight:'bold',marginRight:20}}> &#8377;{(totalamount-discount).toFixed(2)}</div></div>
                <div style={{fontSize:17,marginTop:10,display:'flex',fontWeight:'bold',color: '#03753c',justifyContent:"right"}}><div style={{marginRight:15}}>You Saved</div> <div style={{ fontWeight:'bold',marginRight:20}}> &#8377;{discount.toFixed(2)}</div></div>
            </div>
           </Box>

           <Button style={{border:'1px solid  #bdc3c7',width:410,marginLeft:20,marginTop:20,height:50,borderRadius:25,color:"white",fontWeight:'bold',backgroundColor:"#0078ad"}} onClick={handlePlaceOrder}>
             {btnTxt}
           </Button>

           <Drawer anchor={"right"} open={open} onClose={()=>handleClose(false)}>
           {addressView()}
      </Drawer>
        </div>
    )
}



 