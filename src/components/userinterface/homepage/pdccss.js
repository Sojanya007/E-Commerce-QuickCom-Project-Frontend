import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchNodeAdminServices";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Grid, Button, Checkbox, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import PlusMinusButton2 from "./PlusMinusButton2";
import { useSelector, useDispatch } from "react-redux";

export default function ProductDetailsCategory({ productData, refresh, setRefresh }) {
  const cartData = useSelector((state) => state?.cart);
  const keys = Object.keys(cartData);
  const dispatch = useDispatch();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [overState] = useState('#b5b5b5');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleChangeQty = (value, item) => {
    if (value === 0) {
      dispatch({ type: "DELETE_CART", payload: [item.productdetailid] });
    } else {
      item['qty'] = value;
      dispatch({ type: "ADD_CART", payload: [item.productdetailid, item] });
    }
    setRefresh(!refresh);
  };

  const showImages = () => {
    return productData.map((item) => {
      const op = parseInt(((item.price - item.offerprice) / item.price) * 100);

      return (
        <Grid item xs={12} sm={6} md={4} key={item.productdetailid}>
          <div style={{ margin: 10, border: '2px solid #e0e0e0', borderRadius: 40 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: 10,
              height: 500,
              background: '#fff'
            }}>
              <div style={{ alignSelf: 'flex-end' }}>
                <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
              </div>
              <img src={`${serverURL}/images/${item.picture}`} style={{ width: 240, height: 250 }} />
              <img src={`${serverURL}/images/veg.png`} style={{ width: 15, alignSelf: 'flex-start', margin: '10px 0' }} />
              <img src={`${serverURL}/images/smart.jpg`} style={{ width: 95 }} />

              <div style={{
                fontWeight: 500,
                fontSize: 16,
                textAlign: 'center',
                margin: '10px 0',
                lineHeight: 1.4,
                overflow: "hidden",
                textOverflow: 'ellipsis',
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical"
              }}>
                {item.productdetailname} {item.weight} {item.weighttype}
              </div>

              {item.offerprice > 0 ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 900, fontSize: 16 }}>
                    ₹{item.offerprice}
                  </div>
                  <div style={{ fontSize: 12, color: 'grey', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <s>₹{item.price}</s>
                    <span style={{
                      marginLeft: 8,
                      padding: '2px 6px',
                      borderRadius: 4,
                      background: '#e5f7ee',
                      color: '#03753c',
                      fontWeight: 'bold'
                    }}>{op}% OFF</span>
                  </div>
                </div>
              ) : (
                <div style={{ fontWeight: 500, fontSize: 14 }}>₹{item.price}</div>
              )}

              <div style={{
                marginTop: 10,
                fontWeight: 700,
                fontSize: 16,
                color: "#0c5273",
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}>
                {item.weight} {item.weighttype} <KeyboardArrowDownIcon />
              </div>

              <div style={{ marginTop: 10 }}>
                <PlusMinusButton2
                  qty={keys.includes(item?.productdetailid + "") ? cartData[item?.productdetailid]?.qty : 0}
                  onChange={(value) => handleChangeQty(value, item)}
                />
              </div>
            </div>
          </div>
        </Grid>
      );
    });
  };

  return (
    <div style={{ width: '100%' }}>
      <Grid container justifyContent="center" style={{ marginTop: 30 }}>
        <Button
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={{ border: `0.7px solid ${overState}`, width: 250, height: 40, borderRadius: 30 }}
        >
          <div style={{ display: 'flex', fontWeight: 'bold', color: "black" }}>
            Short by: Popularity <KeyboardArrowDownIcon style={{ color: '#0c5273', marginLeft: 5 }} />
          </div>
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{ 'aria-labelledby': 'fade-button' }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <FormControl>
            <RadioGroup defaultValue="Popularity" name="radio-buttons-group">
              {["Popularity", "Price: High to Low", "Price: Low to High", "Discount", "All Products"].map((val) => (
                <MenuItem key={val} onClick={handleClose}>
                  <FormControlLabel value={val} control={<Radio />} label={val} />
                </MenuItem>
              ))}
            </RadioGroup>
          </FormControl>
        </Menu>
      </Grid>

      <Grid container spacing={1} style={{ padding: 10 }}>
        {showImages()}
      </Grid>
    </div>
  );
}


/*
import React from "react";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchNodeAdminServices";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {Grid,Button,Checkbox,Radio,RadioGroup,FormControl,FormControlLabel } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite'; 
import PlusMinusButton2 from "./PlusMinusButton2";
import { useSelector,useDispatch } from "react-redux"; 
 
export default function ProductDetailsCategory({ productData,props,refresh,setRefresh }) {
 const cartData=useSelector((state)=>state?.cart)
 const keys=Object.keys(cartData)
 const dispatch=useDispatch()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [overState, setOverState] = useState('#b5b5b5')
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeQty = (value, item) => {
    if (value == 0) {
        dispatch({ type: "DELETE_CART", payload: [item.productdetailid] })
    }
    else {
        item['qty'] = value
        dispatch({ type: "ADD_CART", payload: [item.productdetailid, item] })
    }
    setRefresh(!refresh)
}


  const showImages = () => {
    return productData.map((item) => {
      var op = parseInt(((item.price - item.offerprice) / item.price) * 100)

      return (
        <Grid item xs={12} sm={6} md={4} key={item.productdetailid}>  
          <Grid style={{marginTop:40, border: '8px solid #fff',width:320 }}>
          <Grid  style={{  border: '2px solid #e0e0e0', borderRadius: 40  }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: 320, height: 500}}>
              <div style={{ display: 'flex', marginLeft: 240, padding: 1, opacity: 0.7 }}><Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} /></div>
              <div style={{ display: 'flex', alignSelf: 'center',  }}>

                <img src={`${serverURL}/images/${item.picture}`}
                  style={{ width: '240px', height: '250px' }}
                />
              </div>


              <div >
                <img src={`${serverURL}/images/veg.png`} style={{ width: 15, marginRight: 240, marginBottom: 10 }} />
              </div>

              <div >
                <img src={`${serverURL}/images/smart.jpg`} style={{ width: 95, marginRight: 170 }} />
              </div>


              <div style={{
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
                width: '70%',
                overflow: "hidden",
                textOverflow: 'ellipsis',
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",

                marginRight: 50
              }}>
                {item.productdetailname} {item.weight} {item.weighttype}
              </div>


              {item.productdetailname.length <= 24 ? <div style={{
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
              }}>&nbsp;</div> : <></>}

              {item.offerprice > 0 ? <div style={{ marginTop: 7, display: 'flex', flexDirection: 'column', marginRight: 160 }}>
                <div style={{
                  fontFamily: "JioType, helvetica, arial, sans-serif",
                  fontWeight: 900,
                  fontSize: 16,
                  letterSpacing: -0.48,
                  lineHeight: 1.4285714286,
                }}>
                  <span>&#8377;</span>{item.offerprice}


                  <span style={{
                    fontFamily: "JioType, helvetica, arial, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    letterSpacing: "-0.06px",
                    lineHeight: 1.3333333333,
                    color: 'grey'
                  }}>

                    <span style={{ display: 'flex', alignItems: 'center', fontSize: 12 }}><s><span>&#8377;{item.price}</span></s><span style={{ margin: 5, width: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', borderRadius: 2, background: '#e5f7ee', color: '#03753c' }}> {op}% OFF</span></span>
                  </span>
                </div>

              </div> : <div>  <div style={{
                marginTop: 7,
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
                 
              }}>
                <span>&#8377;</span>{item.price}

              </div>
                <div style={{ lineHeight: 1.428571428  }}>&nbsp;</div>
              </div>}

              <div style={{ display: 'flex', justifyContent: 'center', marginRight: 170, padding: 10, fontFamily: "JioType, helvetica, arial, sans-serif", fontWeight: 700, fontSize: "16px", letterSpacing: "-0.08px", lineHeight: 1.5, color: "#0c5273" }}>
                {item.weight} {item.weighttype} <KeyboardArrowDownIcon />
              </div>

            </div>
            <div style={{ padding: 12 }}><PlusMinusButton2 qty={keys.includes(item?.productdetailid+"")?cartData[item?.productdetailid]?.qty:0} onChange={(value)=>handleChangeQty(value,item  )}/></div>
            
          </Grid>
           </Grid>
        </Grid>
        
      )

    })

  }



  return (
    
    <Grid  container spacing={-5}>
      
      <Grid style={{marginTop:30}}>
      <Button
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            style={{ border: `0.7px solid ${overState}`, width: 250, height: 40, borderRadius: 30 , marginLeft: 700 }}
          > 
           <div style={{   padding: 5, display: 'flex',marginTop:7  , fontWeight: 'bolder',color:"black" }}>Short by: <div style={{fontWeight: 'bold',display:'flex'}}>Popularity<div><KeyboardArrowDownIcon style={{ color: '#0c5273', fontWeight: 'bold' }} /></div></div></div>
          </Button>
          
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <FormControl>
            <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Popularity"
            name="radio-buttons-group"
          >
            <MenuItem onClick={handleClose}> <FormControlLabel value="Popularity" control={<Radio />} label="Popularity" /> </MenuItem>
            <MenuItem onClick={handleClose}><FormControlLabel value="Price: High to Low" control={<Radio />} label="Price: High to Low" /> </MenuItem>
            <MenuItem onClick={handleClose}><FormControlLabel value="Price: Low to High" control={<Radio />} label="Price: Low to High" /> </MenuItem>
            <MenuItem onClick={handleClose}><FormControlLabel value="Discount" control={<Radio />} label="Discount" /> </MenuItem>
            <MenuItem onClick={handleClose}><FormControlLabel value="All Products" control={<Radio />} label="All Products" /> </MenuItem>
            </RadioGroup>
            </FormControl>
          </Menu>
        </Grid>

          
      
         <Grid>
             <Grid container spacing={3} style={{ padding: 20 }}>
             {showImages()}
            </Grid>

         </Grid>
         
      



    </Grid>


 

  );


}



*/
