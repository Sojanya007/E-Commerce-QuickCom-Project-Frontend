import { useEffect, useState } from "react"

export default function PlusMinusButton2(props)
{const [overState,setOverState]=useState('#b5b5b5')
  //console.log(props.qty)
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
        {value==0?<div onClick={handlePlus} onMouseLeave={()=>setOverState('#b5b5b5')} onMouseOver={()=>setOverState('#1f3d4c')} style={{ marginLeft:-2,cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',width:270,height:35,border:`0.7px solid ${overState}`,color:'#1f3d4c',fontSize:14,fontWeight:'bold',borderRadius:17.5
    
     }}>
    
    <span style={{fontSize:20,marginRight:170,color:"#0c5273"}}>Add</span>
    <span style={{fontSize:20,color:"#0c5273"}}>+</span>
    </div>:
    <div style={{marginLeft:55,display:'flex',justifyContent:"space-between",alignItems:'center',width:150,height:35,color:'#1f3d4c',fontSize:14,fontWeight:'bold',borderRadius:17.5}}>
    <div onClick={handleMinus}  style={{cursor:'pointer',marginTop:8,display:'flex',justifyContent:'center',alignItems:'center',width:35,height:35, borderRadius:17.5,border:`0.7px solid ${overState}`,color:"#0c5273",fontSize:14,fontWeight:'bold',borderRadius:17.5}}>-</div>

  <div>{value}</div>

    <div onClick={handlePlus}  style={{cursor:'pointer',marginTop:8,display:'flex',justifyContent:'center',alignItems:'center',width:35,height:35,borderRight:17.5,border:`0.7px solid ${overState}`,color:"#0c5273",fontSize:14,fontWeight:'bold',borderRadius:17.5}}>+</div> 
  
  </div>}
    
    </div>)
    
}