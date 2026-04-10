import React, { useEffect, useState } from "react";
import { Divider, Grid } from "@mui/material";
import Rating from '@mui/material/Rating';
import { useTheme } from '@mui/material/styles'; 
import ShareIcon from '@mui/icons-material/Share';
import Box from "@mui/material/Box";
import { postData, serverURL } from "../../../services/FetchNodeAdminServices";
import Radio from '@mui/material/Radio';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import parse from 'html-react-parser';
import Drawer from "@mui/material/Drawer";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
 
 
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
 
export default function ProductDescription({product,setProduct}){
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
   }

   const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
        <div style={{marginTop:40}}>
        <a href="http://www.twitter.com"><img src={`${serverURL}/images/twitter.png`} style={{width:50,height:60,marginLeft:45}}/></a>
        <a href="http://www.facebook.com"><img src={`${serverURL}/images/facebook.png`} style={{width:50,height:60,marginLeft:30}}/></a>
        <a href="https://api.whatsapp.com/send?text=Hi"><img src={`${serverURL}/images/whatsapp.png`} style={{width:50,height:60,marginLeft:30}}/></a>
        </div>
    </Box>
  );


  const location=useLocation()
  console.log("YYYYYYYYYYY",location)
  const [selectedValue, setSelectedValue] = React.useState('a');
 
  const handleChange = (event) => {
  setSelectedValue(event.target.value);}
  const [productList,setProductList]=useState([])
  const [productDetailid,setProductDetailId]=useState(product?.productdetailid || null)
  const [color,setColor]=useState('#000')
  const fetchAllProductsById=async()=>{
  var response= await postData('userinterface/user_display_product_details_by_id',{productid:product?.productid})
  setProductList(response?.data || [])

  }
  useEffect(()=>{
    if(product?.productid)
    {
    fetchAllProductsById()
    } 
  },[product])

  
 /* const shareProduct=()=>{
    return(
      <div>
        <a href="https://api.whatsapp.com/send?text=Hi"><img src={`${serverURL}/images/whatsapp.png`} /></a>
      </div>
    )
  }*/

  
  const [value, setValue] = React.useState(2);
    const theme = useTheme();

    const showImages=()=>{
            
              
      var op=product?.price ? parseInt(((product.price-product.offerprice)/product.price)*100) : 0

               return(
                  
         <div>
                  <div style={{marginTop:90,marginLeft:20,fontFamily: "JioType, helvetica, arial, sans-serif",fontWeight:"700",fontSize:"18px",letterSpacing:"-0.08px",lineHeight:"1.5",display:"inline-flex",alignItems:"center",color:"#0c5273",textDecoration:"none"}}>
            {product.brandname}
        </div>
                   <div style={{fontFamily: "JioType, helvetica, arial, sans-serif",fontWeight:700 ,fontSize:"20px",letterSpacing:"-0.09px",lineHeight:"1.3333333333",marginTop:15,marginLeft:20}}>
                       {product.productdetailname} {product.weight} {product.weighttype}
                   </div>
       
       
                   {product.productdetailname.length<=24?<div style={{  fontWeight: 500 ,
                    fontSize: 14,
                    letterSpacing: -0.07,
                    lineHeight: 1.428571428,}}>&nbsp;</div>:<></>}

                   <span style={{marginTop:5,marginLeft:18,display:'flex',alignItems:'center'}}>
                    
                   
                   <Rating name="read-only" value={4} readOnly /> 
                   <span style={{marginLeft:8,color:"#0c5273",fontFamily: "JioType, helvetica, arial, sans-serif",fontWeight:700,fontSize:"20px",letterSpacing:"-0.09px",lineHeight:"1.3333333333"}}>
                    2432
                   </span>
                   <span style={{marginLeft:'390px'}}>     
                   <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                   </span>
                   <div>
                    <span>    
                   <Button onClick={toggleDrawer(true)}><ShareIcon/></Button>
                   <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                      </Drawer>
                      </span>
    </div>
                   </span> 
                      
       
                   
                   {product.offerprice>0?<div style={{marginTop:7,display:'flex',flexDirection:'column',marginRight:170}}>
                   <div style={{
                     fontFamily:"JioType, helvetica, arial, sans-serif",
                    fontWeight: 900 ,
                    fontSize: 16,
                    letterSpacing: -0.48,
                    lineHeight: 1.4285714286,

                   }}>
                    <span style={{marginTop:15,marginLeft:20,display:'flex',alignItems:'center',fontSize:23}}>&#8377;{product.offerprice}  
                    <span style={{ display: 'flex', alignItems: 'center', fontSize: 16 }}><span style={{ margin: 5, width: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', borderRadius: 2, background: '#e5f7ee', color: '#03753c' }}> {op}% OFF</span></span>  
                    <span style={{marginLeft:'400px',marginBottom :12}}>
                    <span style={{fontSize:18,marginTop:20 ,margin:5,width:95,height:35,display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bolder',borderRadius:25,background:' #f5f5f5',color:'#192a56'}}>pluxee</span>

                    </span>
                    </span>
                     
                 
       
                   <span style={{
                    fontFamily:"JioType, helvetica, arial, sans-serif",
                    fontWeight: 500 ,
                    fontSize: "12px",
                    letterSpacing: "-0.06px",
                    lineHeight:  1.3333333333,
                    color:'grey'
                    
                    }}>
                     
                    <span style={{color:"rgba(0, 0, 0, .65)",marginLeft:20,display:'flex',alignItems:'center',fontSize:16}}>M.R.P:<span style={{display:'flex',alignItems:'center',fontSize:16,marginLeft:9}}><s><span>&#8377;{product.price}</span></s></span><span style={{display:'flex',alignItems:'center',fontSize:16,marginLeft:10}}>(Incl. of all taxes)</span></span> 
                   </span>
                   </div>
       
                   </div>:<div>  <div style={{
                       marginTop:7,
                    fontWeight: 500 ,
                    fontSize: 14,
                    letterSpacing: -0.07,
                    lineHeight: 1.428571428,
                
                   }}>
                    <span>&#8377;</span>{product.price} 
                    
                   </div>
                   <div style={{lineHeight: 1.428571428}}>&nbsp;</div>
                   </div>}

                   
                   
                    </div>
                    
                  
            )
         
           
            
           }

           const handleSelectedProduct=(item)=>{
           setProductDetailId(item.productdetailid)
           setProduct(item)
           }

  const packSize = () => {
  return (productList || []).map((item) => {
    const op = parseInt(((item.price - item.offerprice) / item.price) * 100);

    return (
      <Box
        onClick={() => handleSelectedProduct(item)}
        style={{
          border: item.productdetailid === productDetailid ? '2px solid #0078d4' : '1px solid #ccc',
          borderRadius: 15,
          padding: 10,
          marginLeft: 20,
          marginBottom: 10,
          marginTop: 10,
          width: 620,
          cursor: 'pointer',
          backgroundColor: item.productdetailid === productDetailid ? '#f0f8ff' : '#fff',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Radio
              checked={item.productdetailid === productDetailid}
              value="a"
              name="radio-buttons"
              onChange={handleChange}
              inputProps={{ 'aria-label': 'A' }}
            />
          </Grid>

          <Grid item>
            <img
              src={`${serverURL}/images/${item.picture}`}
              alt="product"
              style={{ width: 45, height: 45, borderRadius: 4 }}
            />
          </Grid>

          <Grid item style={{ fontWeight: 'bold', fontSize: 16 }}>
            {item.weight} {item.weighttype}
          </Grid>

          <Grid item style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontWeight: 'bold', fontSize: 18 }}>&#8377;{item.offerprice}</span>
              <span style={{ color: 'gray', fontSize: 14 }}>
                <s>&#8377;{item.price}</s>
              </span>
            </div>
            <div
              style={{
                marginTop: 5,
                background: '#e5f7ee',
                color: '#03753c',
                fontWeight: 'bold',
                fontSize: 13,
                borderRadius: 4,
                width: '75px',
                textAlign: 'center',
              }}
            >
              {op}% OFF
            </div>
          </Grid>
        </Grid>
      </Box>
    );
  });
};

       

    return(
        <div>
       
        

        <div>
         {showImages()}
        </div>

        <Divider style={{marginTop:25,marginLeft:20,width:650}}/>

        <div style={{marginLeft:20,marginTop:20,fontSize:30,fontWeight:'bolder',marginBottom:20}}>Packsize</div>
        <div>{packSize()}</div>
        

        <Divider style={{marginTop:25,marginLeft:20,width:620}}/>

        
<div style={{marginLeft:20,marginTop:20,fontSize:30,fontWeight:'bolder',marginBottom:20}}>Offer (12)</div>

<div style={{fontSize:15,marginLeft:70,fontWeight:'bold'}}>BANK OFFERS</div>

<div style={{marginLeft:20}}>
  <span>
    <img src={`${serverURL}/images/bank.png`} style={{width:30,height:30}}/>
  </span>
  <span style={{fontWeight:600,marginLeft:20 }}>5 accelerated reward points by SBI cards (1.25%), 10 accelerated rewa...</span>
  <span><ArrowForwardIosIcon  style={{width:20,height:18,marginLeft:30,marginTop:3}}/></span>
</div>

<div style={{fontWeight:'bold',opacity:0.5,marginLeft:70}}>9 Offer/s Available</div>

<div style={{fontSize:15,marginLeft:70,fontWeight:'bold',marginTop:20}}>COUPONS</div>

<div style={{marginLeft:20}}>
  <span>
    <img src={`${serverURL}/images/coupon.png`} style={{width:30,height:30}}/>
  </span>
  <span style={{fontWeight:600,marginLeft:20 }}>Flat 10% Discount</span>
  <span><ArrowForwardIosIcon  style={{width:20,height:18,marginLeft:410,marginTop:3}}/></span>
</div>

<div style={{fontWeight:'bold',opacity:0.5,marginLeft:70}}>3 Offer/s Available</div>

<Box style={{border:'2px solid #bdc3c7',width:100,height:55,marginLeft:20,borderRadius:35,marginTop:17}}>

  <div style={{fontWeight:'bold',display:'flex',alignItems:'center',marginLeft:16,marginTop:13,fontSize:18,color:'#192a56'}}>View All</div>
</Box>

<Divider style={{marginTop:25,marginLeft:20,width:620}}/>


<div style={{marginLeft:20,marginTop:20,fontSize:30,fontWeight:'bolder',marginBottom:20}}>Deliver to</div>

<div>
<span style={{fontWeight:'bold',marginLeft:20,fontSize:19}}>
  474001
</span>
<span style={{fontWeight:'bold',marginLeft:13,opacity:0.6,fontSize:19}}>
  Gwalior
</span>
<span>
<img src={`${serverURL}/images/pen.png`} style={{width:20,height:20,marginLeft:400}}/>
</span>
</div>

<div style={{marginTop:20}}>
  <span style={{marginLeft:20,fontWeight:700,fontSize:"18px",color:"#25ab21"}}>
  In Stock
  </span>
  <span style={{marginLeft:20,fontWeight:700,fontSize:"18px",opacity:0.5}}>
  |
  </span>
  <span style={{marginLeft:20,fontWeight:700,fontSize:"18px"}}>
   Delivery by tomorrow 
    </span> 
</div>

<Divider style={{marginTop:25,marginLeft:20,width:620}}/>

<div style={{marginLeft:20,marginTop:20,fontSize:30,fontWeight:'bolder',marginBottom:20}}>Sold by</div>

<div>
  <span style={{fontSize:"20px",fontWeight:'bold',color:"#0c5273",marginLeft:20}}>Reliance Retail</span>
  <span>
  <img src={`${serverURL}/images/smart.jpg`}  style={{width:130,marginLeft:5}}/>
  </span>
</div>


<Divider style={{marginTop:25,marginLeft:20,width:620}}/>

<div style={{marginLeft:20,marginTop:20,fontSize:15,marginBottom:20}}> {parse(product?.productdetaildescription || "")}</div>

 

<Divider style={{marginTop:25,marginLeft:20,width:620}}/>
 

<Box style={{border:'2px solid #bdc3c7',width:150,height:55,marginLeft:22,borderRadius:35,marginTop:17}}>

  <div style={{fontWeight:'bold',display:'flex',alignItems:'center',marginLeft:18,marginTop:13,fontSize:18,color:'#192a56'}}>More Details</div>
</Box>

<Divider style={{marginTop:25,marginLeft:20,width:620}}/>

<div style={{marginTop:30}}>
  <span  style={{marginLeft:20 ,fontSize:19,fontWeight:700,marginBottom:20}}>Article ID: 491335633</span>
  <span>
  <img src={`${serverURL}/images/copy.png`}  style={{width:30,marginLeft:15}}/>
  </span>
</div>
 
 
        </div>
    )
}


//<a href={`https://api.whatsapp.com/send?text=${serverURL}${location.pathname}`}></a>


/*
 <span style={{display:'flex',alignItems:'center'}}>
              <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
        style={{marginBottom:18,marginLeft:10,fontSize:24}}
      />
      
               
                 <img src={`${serverURL}/images/${item.picture}`} style={{width:45,marginBottom:20,marginTop:5}}/>
                 <span style={{marginLeft:10,marginBottom:14,fontWeight:'bold'}}>{item.weight} {item.weighttype}</span>
                 <span style={{marginLeft:300,marginBottom:30,fontWeight:'bold'}}>&#8377;{item.offerprice}</span>
                 <span style={{marginLeft:10,marginBottom:5,color:'gray',fontSize:13}}><s>&#8377;{item.price}</s> 
                 <span style={{marginLeft:-50,marginTop:1,width:80,display:'flex',justifyContent:'center' ,fontWeight:'bold',borderRadius:2,background:'#e5f7ee',color:'#03753c'}}> {op}%  OFF</span>
                </span>
                </span>
*/ 