import { useState } from "react";
import  AppBar  from "@mui/material/AppBar";
import Box from "@mui/material/Box/Box";
import logo from '../../../assets/logo.png';
import { Grid } from "@mui/material";

export default function Footer(){
    return (
        <Box style={{marginTop:50}}>
            <AppBar position="static" style={{width:'100%',backgroundColor:'#f5f5f5',display:'flex',flexDirection:'column',alignItems:'center', minWidth:'1030px'}}>
                <Grid container style={{paddingLeft:100,paddingTop:40,paddingBottom:20}}>

                    <Grid item xs={2}>
                        <div style={{fontWeight:900,fontSize:'18px',letterSpacing:'-0.48px',lineHeight:1,paddingBottom:'16px',paddingLeft:'16px',color:'#141414'}}>All Category</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Grocery</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Electronics</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Fashion</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Home & Lifestyle</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Premium Fruits</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Furniture</div>
          
                        
                    </Grid>

                    <Grid item xs={2}>
                        <div style={{fontWeight:900,fontSize:'18px',letterSpacing:'-0.48px',lineHeight:1,paddingBottom:'16px',paddingLeft:'16px',color:'#141414'}}>Popular Categories</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Biscuits,Drinks & Packaged Foods</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Fruits & Vegetable</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Cooking Essentials</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Dairy & Bakery</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Personal Care</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Beauty</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Home Care</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Mom & Baby Care</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>School, Office & Stationery</div>
          
                        
                    </Grid>

                    <Grid item xs={2}>
                        <div style={{fontWeight:900,fontSize:'18px',letterSpacing:'-0.48px',lineHeight:1,paddingBottom:'16px',paddingLeft:'16px',color:'#141414'}}>Customer Account</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>My Account</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>My Order</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Wishlist</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Delivery Addresses</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Quick Comm Wallet</div>
          
                        
                    </Grid>

                    <Grid item xs={2}>
                        <div style={{fontWeight:900,fontSize:'18px',letterSpacing:'-0.48px',lineHeight:1,paddingBottom:'16px',paddingLeft:'16px',color:'#141414'}}>Help & Support</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>About Us</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>FAQ</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Terms & Conditions</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Privacy Policy</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>E-waste Policy</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Cancellation & Return Policy</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>Shipping & Delivery Policy</div>
                        <div style={{color:'#636e72',fontWeight: 500,fontSize:'16px',letterSpacing:'-0.08px',paddingLeft:'16px',lineHeight:3}}>AC Installation by resQ</div>
                      
          
                        
                    </Grid>

                    <Grid item xs={4}>
                        <div style={{fontWeight:500,fontSize:'30px',letterSpacing:'-0.72px',lineHeight:1,paddingBottom:'16px',paddingLeft:'16px',color:'#141414'}}>Contact Us</div>

                        <div><span style={{fontWeight:500,fontSize:'14px',letterSpacing:'0.07px',lineHeight:1.4285714286,paddingLeft:'16px',color:'rgba(0, 0, 0, .65)'}}>WhatsApp us:</span>
                        <span style={{fontWeight:700,fontSize:'14px',letterSpacing:'-0.07px',lineHeight:1.4285714286,color:'#0c5273'}}> 70003 70003</span></div>
 
                        <div><span style={{fontWeight:500,fontSize:'14px',letterSpacing:'0.07px',lineHeight:1.4285714286,paddingLeft:'16px',color:'rgba(0, 0, 0, .65)'}}>Call us:</span>
                        <span style={{fontWeight:700,fontSize:'14px',letterSpacing:'-0.07px',lineHeight:1.4285714286,color:'#0c5273'}}> 1800 890 1222</span></div>

                        <div style={{fontWeight:500,fontSize:'14px',letterSpacing:'-0.07px',lineHeight:1.4285714286,paddingLeft:'16px',paddingBottom:20,color:'rgba(0, 0, 0, .65)'}}>8:00 AM to 8:00 PM, 365 days</div>
                        
                        <div style={{fontWeight:500,fontSize:'14px',letterSpacing:'-0.07px',lineHeight:1.4285714286,paddingLeft:'16px',color:'rgba(0, 0, 0, .65)'}}>Should you encounter any bugs, glitches,</div>
                        <div style={{fontWeight:500,fontSize:'14px',letterSpacing:'-0.07px',lineHeight:1.4285714286,paddingLeft:'16px',color:'rgba(0, 0, 0, .65)'}}>lack of functionality, delayed deliveries,</div>
                        <div style={{fontWeight:500,fontSize:'14px',letterSpacing:'-0.07px',lineHeight:1.4285714286,paddingLeft:'16px',color:'rgba(0, 0, 0, .65)'}}>biling errors or other problems on the</div>
                        <div style={{fontWeight:500,fontSize:'14px',letterSpacing:'-0.07px',lineHeight:1.4285714286,paddingLeft:'16px',color:'rgba(0, 0, 0, .65)'}}>website.</div>

                        <div style={{fontWeight:900,fontSize:'24px',letterSpacing:'-0.72px',lineHeight:1,paddingTop:'20px',paddingBottom:'16px',paddingLeft:'16px',color:'#141414'}}>Download the app</div>
                        <div>
                            <span><img src="/google.png" style={{width:'30%',paddingLeft:'16px'}}/></span>
                            <span><img src="/app.png" style={{width:'30%',paddingLeft:'16px'}}/></span>
                        </div>
                    </Grid>

                </Grid>

            </AppBar>

            <div style={{alignSelf:'normal',borderTop:'2px solid #bdc3c7'}}></div>
            <div style={{backgroundColor:'#f5f5f5',display:'flex',alignItems:'center',maxWidth:1398,width:'100%',paddingLeft:8,paddingRight:8,paddingTop:8,paddingBottom:8}}>
            <div style={{display:'flex',alignItems:'center',marginLeft:50}}><span style={{width:42,height:42,borderRadius:15,margin:8,display:'flex',alignItems:'center',justifyContent:'space-between'}}><img src={logo} style={{width:45,height:45}}/>  </span><span style={{display:'flex',alignItems:'center',fontWeight:500,fontSize:13,letterSpacing:-0.06,color:'rgba(0,0,0,.65)'}}>&#xA9; 2024 All rights reserved. QuickComm Ltd.  </span></div>
            <div style={{marginLeft:700,fontWeight:500,fontSize:13,letterSpacing:-0.06,lineHeight:1.333333333,color:'rgba(0,0,0,.65)'}}>Best viewd on Microsoft Edge 81+, Mozilla Firefox 75+, Safari 5.1.5, Google Chrome 80+</div>
            </div>
        </Box>
     



    )
}