import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../../assets/logo.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextBoxSearch from './TextBoxSearch';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MyDrawer from './MyDrawer';
import MyMenuBar from './MyMenuBar';
import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  var cartData=useSelector(state=>state.cart)
  var user=useSelector(state=>state.user)
 
  var userData=Object.values(user)
  console.log("USSEEEERRRDDDAAATTTAAA:",userData)
  var keys=Object.keys(cartData)
  var navigate=useNavigate()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [open,setOpen]=useState(false)
  const handleClick=()=>{
    setOpen(true)

  }

  const handleTool=()=>{
    
  }
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         {matches?<div></div>:<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={handleClick}/>
          </IconButton>}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
          <Typography onClick={()=>navigate('/homepage')}  variant="h6" component="div" style={{display:'flex',alignItems:'center',cursor:'pointer' }}>
            <img src={logo} style={{width:70,height:70}}/>
            <div style={{fontWeight:'bold',fontSize:24}}>QuickComm</div>
          </Typography>
          {matches?<TextBoxSearch/>:<div></div>}
          
          <div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          > 
             
             <Badge badgeContent={keys.length} color="secondary"> 
            <ShoppingCartIcon onClick={()=>navigate('/cart')}/>
            </Badge>
            
            
          </IconButton>
         
          {matches?<IconButton
         
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>navigate('/signin')}
          >
            <AccountCircleIcon style={{fontSize:30}}/>
             {userData?.length==0?<div style={{marginLeft:5,fontWeight:'bold',fontSize:16}}>Sign In</div>:<div style={{marginLeft:5,fontWeight:'bold',fontSize:16}}>{userData[0].firstname}</div>}
          </IconButton>:<div></div>}
         
         </div> 
         </div>
        </Toolbar>
      </AppBar>
     { matches?<div></div>:
      <AppBar position="static">
        <Toolbar>
          <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <TextBoxSearch width='85%'/>
        </div>
        </Toolbar>
      </AppBar>
      
      }
      { matches? 
      
     <MyMenuBar/>:<div></div>}
     <MyDrawer open={open} setOpen={setOpen}/>

    </Box>
  );
}