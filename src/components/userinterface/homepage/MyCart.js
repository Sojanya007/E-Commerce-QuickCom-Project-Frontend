import { Box } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeAdminServices";
import { useSelector, useDispatch } from 'react-redux';
import PlusMinusButton from "./PlusMinusButton";
import Divider from "@mui/material/Divider";
export default function MyCart({ refresh, setRefresh }) {
    var dispatch = useDispatch()
    var cartData = useSelector((state) => state?.cart)
    var data = Object.values(cartData)
    var keys = Object.keys(cartData)
    var user = useSelector((state) => state?.user)
    var userData=Object.values(user)
    var totalamount = data.reduce((f, s) => {
        var ap = 0
        if (s.offerprice > 0) {
            ap = s.offerprice * s.qty
        }
        else {
            ap = s.price * s.qty
        }
        return f + ap
    }, 0)

    const showAddress=()=>{
        
          return <div style={{marginLeft:20,marginTop:10}}>
            <div style={{fontWeight:'bold',fontSize:18}}>Delivery Address</div>
            <div  style={{fontWeight:600,fontSize:16}}>{userData[0].firstname} {userData[0].lastname}</div>
            <div>{userData[0].address}</div>
            <div>{userData[0].building},{userData[0].towerno},{userData[0].floorno}</div>
            <div>House No: {userData[0].houseno}</div>
            <div>{userData[0].city},{userData[0].state},{userData[0].pincode}</div>
          </div>
     
       
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



    const showDetails = () => {
        return data.map((item, index) => {
            var op = (item.price - item.offerprice) * item.qty
            return (
                <div>
                       <div>
                      <div style={{ marginLeft: 27, display: 'flex' }}>
                                <img src={`${serverURL}/images/${item.picture}`} style={{display:'flex',justifyContent:'center',alignItems:'center', width: 65,height:100, marginTop: 20 }} />
                                <div style={{ marginTop: 20, marginLeft: 30 }}><div style={{ color: "#636e72", fontWeight: 'bold' }}>{item.productdetailname}-{item.weight}{item.weighttype}</div><div>
                                    <div style={{display:'flex'}}>
                                    {item.offerprice > 0 ? <>
                                        <div style={{ marginTop: 3, fontWeight: 'bold' }}>&#8377;{item.offerprice * item.qty}</div></> : <>
                                        
                                    </>}
                                    <div style={{ marginTop: 3, fontWeight: 20,marginLeft:10 }}><s>&#8377;{item.price * item.qty}</s></div>
                                    </div>
                                     
                                    <div style={{ margin: 5, width: 120, display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', borderRadius: 2, background: '#e5f7ee', color: '#03753c' }}>You Save &#8377;{op}</div>
                                    <div style={{ marginTop: 6, fontSize: 13, color: "#636e72", display: 'flex' }}>Sold by:  <div style={{ color: 'black', marginLeft: 5 }}> Reliance Retail</div></div>
                                    <div style={{display:'flex'}}>
                                    <div style={{ marginTop: 6, fontSize: 13, color: "#636e72", display: 'flex' }}>Size: <div style={{ color: 'black', marginLeft: 5 }}>{item.weight} {item.weighttype}</div></div>
                                    
                        <div style={{marginLeft:460,padding:20}}><PlusMinusButton qty={keys.includes(item?.productdetailid+"")?item?.qty:0} onChange={(value) => handleChange(value,item)}  /></div>
                        </div>
                         
                                </div>
                                </div>
                                


                            </div>

                            {index < data.length - 1 && (
                             <Divider variant="middle" style={{ width: '95%' ,marginTop:10}} />
                        )}
                        </div>
                        
                  
                </div>
            )

        })

    }



    return (
       <div>

        <Box> 
        {userData?.length>0?<div style={{marginLeft:20,fontWeight:600,fontSize:16,border: '1px solid  #bdc3c7', borderRadius: 25, width: "850px", height: "150px", marginTop: 50, marginLeft: 200}}>{showAddress()}</div>:<div></div>}
        </Box>
       
       <div style={{ marginTop: 20, marginLeft: 220, fontSize: '30px', fontWeight: 900 }}>
        My Cart
      </div>
      <Box style={{ border: '1px solid  #bdc3c7', borderRadius: 25, width: "850px", height: "auto", marginLeft: 50, marginTop: 20, marginLeft: 200 }}>
      <div style={{ marginLeft: 30, marginTop: 30, fontWeight: 'bold', display: 'flex' }}>
      Hyperlocal Basket <div style={{ fontWeight: 20, marginLeft: 7 }}></div>

     <div style={{ marginLeft:600 }}>&#8377;{totalamount}</div>
     </div>
     
      {showDetails()}
      </Box>
      </div>
    )
}


 /* <Box style={{ border: '1px solid  #bdc3c7', borderRadius: 15, width: '93%', height: 50, marginTop: 30, marginLeft: 27, backgroundColor: "#e5f1f7" }}>

     <div style={{ fontWeight: 600, color: '#00364e', marginLeft: 17, marginTop: 13 }}>
    FREE delivery on orders above &#8377;250.00
   </div>

   </Box> */

 