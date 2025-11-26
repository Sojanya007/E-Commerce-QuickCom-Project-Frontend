import Header from "./Header"
import ProductDescription from "./ProductDescription"
import ProductImageComponenet from "./ProductImageComponent"
import { useRef, useState } from "react"
import Footer from "./Footer"
import { Box, Button, Grid } from "@mui/material"
import { useLocation } from "react-router-dom"
import { serverURL } from "../../../services/FetchNodeAdminServices"
export default function ProductDetailsPage(){
  var location = useLocation()
  //console.log("LLLOOOCCCAATTTIIOOONN",location)
  var p=location?.state?.product
  const [product,setProduct]=useState(p)
  const [refresh,setRefresh]=useState(true)
 return (
    <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
          
          <div>
            <Header/>
          </div>

          <Grid container spacing={5}>
          <Grid item xs={6}>
          <ProductImageComponenet refresh={refresh} setRefresh={setRefresh} product={product} setProduct={setProduct}/>
          </Grid>
          <Grid item xs={6}>
          <ProductDescription product={product} setProduct={setProduct}/>
          </Grid>
          </Grid>

           <Box style={{border:'2px solid #bdc3c7',width:1430,height:10,marginLeft:50,marginTop:17,opacity:0.2,background:'#e5f7ee'}}></Box>

           <Box style={{border:'2px solid #bdc3c7',width:1430,height:10,marginLeft:50,marginTop:40,opacity:0.2,background:'#e5f7ee'}}></Box>
           
           <div style={{display:'flex' }}>
           <div style={{marginLeft:70,fontSize:30,fontWeight:900,marginTop:30}}>Questions & Answers</div>
           <Button style={{ marginLeft:850,border:'1px solid #e0e0e0',color: '#0c5273',fontWeight:700,fontSize:'16px',width:250,height:50,marginTop:20,borderRadius:40,fontStyle:'normal'}}><img src={`${serverURL}/images/qes.png`} style={{width:20,height:20,padding:12,cursor:'pointer'}}/>Ask a question</Button>
           </div>
           
           <div style={{display:'flex',marginTop:30}}>
 
           <Button disabled style={{ width:500,height:50,marginLeft:50 ,background:'#f5f5f5',fontSize:'16px',fontWeight:900}}>
           <img src={`${serverURL}/images/exclamation.png`} style={{width:20,height:20,padding:12}}/>
            No question available for this product. 
            </Button>
            </div>

          
 
           <Box style={{border:'2px solid #bdc3c7',width:1430,height:10,marginLeft:50,marginTop:20,opacity:0.2,background:'#e5f7ee'}}></Box>
               

               <div>
                <Footer/>
               </div>

      
        
    </div>

   )


 
}




/* <Grid container spacing={2}>
          <Grid item xs={6}>
          <ProductDescription product={product}/>
          </Grid>
         </Grid>*/