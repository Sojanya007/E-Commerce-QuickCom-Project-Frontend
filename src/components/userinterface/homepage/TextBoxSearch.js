import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {auto} from '@popperjs/core';
import { serverURL } from '../../../services/FetchNodeAdminServices';
export default function TextBoxSearch({width="40%"}){
   return( <div style={{display:'flex',alignItems:'center',width:width ,height:50 ,background:'#0c5273',borderRadius:25}}>
    <SearchIcon color='inherit' style={{fontSize:30,paddingLeft:10}}/>  
    <input type='text' style={{width:'70%',height:26,border:0,borderWidth:0,outline:0,background:'transparent',color:'white',fontSize:18 }} placeholder='Search Here....'/>
    <FormatListBulletedIcon color='inherit' style={{fontSize:30,paddingLeft:10,marginLeft:'auto',marginRight:15}}/>  
    </div>)
}