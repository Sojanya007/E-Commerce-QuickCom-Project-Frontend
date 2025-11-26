import Header from "./Header";
import MyCart from "./MyCart";
import PaymentDetails from "./PaymentDetails";
import { Divider } from "@mui/material";
import ProductsScroll from "./ProductsScroll";
import { useState } from "react";

export default function Cart(){
 const [refresh,setRefresh]=useState(true)
    return(
        
        <div>

            <div>
                <Header/>
            </div>
            
            <div style={{display:'flex'}}>
            <div> 
                <MyCart refresh={refresh} setRefresh={setRefresh}/>
            </div>
           
           <div>
               <PaymentDetails  refresh={refresh} setRefresh={setRefresh}/>
           </div>
           </div>

            

        </div>
    )
}