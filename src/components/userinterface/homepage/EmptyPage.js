import React from "react"
import { serverURL } from "../../../services/FetchNodeAdminServices"
export default function Empty () {
     
    return(
        <div>
         <img src={`${serverURL}/images/empty.webp`}/>
        </div>
    )
}