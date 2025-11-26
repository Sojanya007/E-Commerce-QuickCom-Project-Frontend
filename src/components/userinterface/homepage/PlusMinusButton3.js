import { useState } from "react"
import { useEffect } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
export default function PlusMinusButton3(props)
{ const [overState,setOverState]=useState('#b5b5b5')
     const [value,setValue]=useState(props.qty)
        useEffect(function(){
          setValue(props.qty)
        },[props.qty])
        const handlePlus=()=>{
            var v=value
            v++
            setValue(v)
            props.onChange(v)   
        }
        const handleMinus=()=>{
            var v=value
            v--
            setValue(v)
            props.onChange(v)
        }
    
 
    return(<div>
        {value==0?<div onClick={handlePlus} onMouseLeave={()=>setOverState('#b5b5b5')} onMouseOver={()=>setOverState('#1f3d4c')} style={{cursor:'pointer',marginLeft:5,marginTop:50,display:'flex',justifyContent:'center',alignItems:'center',width:500,height:50,border:`0.7px solid ${overState}`,backgroundColor:'#0078ad' ,fontSize:14,fontWeight:'bold',borderRadius:25
    
     }}>
    
    <span style={{fontSize:20,marginRight:20,color:'#fff'}}>Add to Cart</span>
    </div>:
    <div style={{marginTop:50,marginLeft:200,display:'flex',justifyContent:"space-between",alignItems:'center',width:150,height:35,color:'#1f3d4c',fontSize:22,fontWeight:'bold',borderRadius:17.5
    }}>
    <div onClick={handleMinus}  style={{cursor:'pointer',marginTop:8,display:'flex',justifyContent:'center',alignItems:'center',width:55,height:55,border:`0.7px solid ${overState}`,color:"#0c5273",fontSize:34,fontWeight:'bold',borderRadius:35}}><RemoveIcon/></div>

  <div>{value}</div>

    <div onClick={handlePlus}  style={{cursor:'pointer',backgroundColor:" #0078ad",marginTop:8,display:'flex',justifyContent:'center',alignItems:'center',width:55,height:55,border:`0.7px solid ${overState}`,color:"#0c5273",fontSize:34,fontWeight:'bold',borderRadius:35}}><div style={{color:"#fff"}}><AddIcon/></div></div> 
  
  </div>}
    
    </div>)
    
}