import React from "react";
import PlusMinusButton3 from "./PlusMinusButton3";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { currentDate, serverURL } from "../../../services/FetchNodeAdminServices";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {  Box, Grid, List } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Slider from "react-slick";
import { useRef } from "react";
import { getData,postData } from "../../../services/FetchNodeAdminServices";
import { useTheme } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
 

export default function ProductImageComponenet({product,setProduct,refresh,setRefresh}) {
  const [value,setValue]=useState(0)
 const[index, setIndex]=useState(0)
 const navigate=useNavigate()
  const dispatch = useDispatch()
  //alert(product.productdetailid+","+product.qty)
 
     var cartData=useSelector((state)=>state?.cart)
     var keys=Object.keys(cartData)
  //alert(keys)
  //console.log("kkkkeeeeeyyyysss",keys)
 const theme = useTheme();
  var scrollRef = useRef()
  var settings = {
    dots: false,
    infinite: true,
    spaceBetween:24,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    beforeChange:(current, next)=> setIndex(next)
};
const [selectedImage,setSelectedImage]=useState(product.picture)
const [productImages,setProductImages]=useState([])
const fetchAllImages=async()=>{
var response= await postData('userinterface/user_display_product_pictures',{productdetailid:product?.productdetailid})
 
setProductImages(response?.data[0]?.filenames?.split(","))
}
useEffect(()=>{
  setSelectedImage(product.picture)
  fetchAllImages()
},[product])    

const handleImage=(item)=>{
  setSelectedImage(item)
}

  const showImage = () =>{
    return productImages.map((item)=>{
      return<div>
        <img onClick={()=>handleImage(item)} src={`${serverURL}/images/${item}`} style={{width:'30%',height:60,borderRadius:20,border:'1px solid #e0e0e0',padding:6}}/>
      </div>
    })
  }

   
  const handleNext = () => {
    scrollRef.current.slickNext()
}
 
const handlePrev = () => {
    scrollRef.current.slickPrev()
}

const handleChange = (value, item) => {
  if (value == 0) {
      dispatch({ type: "DELETE_CART", payload: [item.productdetailid] })
  }
  else {
      item['qty'] = value
      dispatch({ type: "ADD_CART", payload: [item.productdetailid, item] })
  }
  setRefresh(!refresh)
}

  const showImages=()=>{
 
             return(
                 <Grid >
              
      
                 <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                 <div>
               <img src={`${serverURL}/images/${selectedImage}`} style={{height: 450, width:"90%",marginLeft:25}} />
               </div>
     
 
             </div>
                
              </Grid>
       
          )
    
          
        }
    
return(
    
 <Grid> 

<div style={{marginLeft:135, marginTop:20}}>
                
                <span style={{fontWeight:'bold', color:"#0c5273",fontSize:16}}>Home</span>
                <span style={{width:5,height:4}}><ArrowForwardIosIcon style={{width:13,height:13,marginLeft:7,opacity:0.5}}/></span>
                  <span style={{marginLeft:7,fontWeight:'bold', color:"#0c5273",fontSize:16}}>All Categories</span>
                  <span style={{width:5,height:4}}><ArrowForwardIosIcon style={{width:13,height:13,marginLeft:7,opacity:0.5}}/></span>
                  <span style={{fontWeight:'bold', color:"#0c5273",fontSize:16,marginLeft:7}}>{product.subcategoryname}</span>
                  <span style={{width:5,height:4}}><ArrowForwardIosIcon style={{width:13,height:13,marginLeft:7,opacity:0.5}}/></span>
                  <span style={{marginLeft:7,fontWeight:'bold',color:"rgba(0,0,0,.65)",fontSize:16}}>{product.productdetailname} {product.weight}{product.weighttype}</span>
                 </div>

  <Grid>
    <div style={{  marginTop:70,marginLeft:110}}>
    <div onClick={handleNext}  > 
    <KeyboardArrowUpIcon   style={{borderRadius:20,border:'1px solid #e0e0e0',width:120,height:30}}/> 
    </div>

    <div elevation={0.5} style={{width:200,marginTop:10,marginLeft:20}}>
    <Slider ref={scrollRef} {...settings} >
       {showImage()}
    </Slider>
    </div>

    <div onClick={handlePrev}  > 
    <KeyboardArrowDownIcon style={{borderRadius:20,border:'1px solid #e0e0e0',width:120,height:30,marginTop:10}} /> 
    </div>
     
   
    </div>
    </Grid>  
         <div style={{position:'relative'}}>
 
</div>
          <Grid style={{display:'flex',flexDirection:'column' }}>

          <div>
            <img src={`${serverURL}/images/smart.jpg`}  style={{width:140,marginTop:30,marginLeft:270}}/>
      
               </div>
 
          <Paper elevation={3} style={{width:'500px',height:450,marginLeft:260,borderRadius:25,marginTop:-500}}>
         
           
       {showImages()}
    
             
         </Paper>  
         <Grid>
  
  <div style={{marginLeft:255}}>
 <PlusMinusButton3  qty={keys.includes(product?.productdetailid+"")?product?.qty:0} onChange={(value) => handleChange(value,product)} />
</div>

</Grid> 

         </Grid>
 
         </Grid>
    
   
         )
     
}


 