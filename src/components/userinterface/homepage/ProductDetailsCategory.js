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

  const [sortOption, setSortOption] = useState("Popularity");
  const sortedProductData = [...productData].sort((a, b) => {
  if (sortOption === "Price: Low to High") {
    return a.offerprice - b.offerprice;
  } else if (sortOption === "Price: High to Low") {
    return b.offerprice - a.offerprice;
  } else if (sortOption === "Discount") {
    const aDiscount = ((a.price - a.offerprice) / a.price) * 100;
    const bDiscount = ((b.price - b.offerprice) / b.price) * 100;
    return bDiscount - aDiscount;
  }
  return 0; // Popularity (default: no sort)
});



  const showImages = () => {
    return sortedProductData.map((item) => {
      const op = parseInt(((item.price - item.offerprice) / item.price) * 100);

      return (
        <Grid item xs={12} sm={6} md={4} key={item.productdetailid}>
          <Grid style={{marginTop:50, border:'8px solid #fff', width:310}}>
          <div style={{border: '2px solid #e0e0e0', borderRadius: 40 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: 10,
              height: 500,
               
            }}>
              <div style={{ alignSelf: 'flex-end' }}>
                <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
              </div>
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
                fontSize: 15,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
                width: '70%',
                overflow: "hidden",
                textOverflow: 'ellipsis',
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                alignSelf:'start',
                marginLeft:10
              }}>
                {item.productdetailname} {item.weight} {item.weighttype}
              </div>


              {item.productdetailname.length <= 24 ? <div style={{
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
              }}>&nbsp;</div> : <></>}

              {item.offerprice > 0 ? <div style={{ marginTop: 7, display: 'flex', flexDirection: 'column', alignSelf:'start',marginLeft:10 }}>
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

              <div style={{ display: 'flex', justifyContent: 'center', alignSelf:'start',marginLeft:10, padding: 2, fontFamily: "JioType, helvetica, arial, sans-serif", fontWeight: 700, fontSize: "16px", letterSpacing: "-0.08px", lineHeight: 1.5, color: "#0c5273" }}>
                {item.weight} {item.weighttype} <KeyboardArrowDownIcon />
              </div>

            </div>
            <div style={{ padding: 12 }}><PlusMinusButton2 qty={keys.includes(item?.productdetailid+"")?cartData[item?.productdetailid]?.qty:0} onChange={(value)=>handleChangeQty(value,item  )}/></div>
            
          </div>
        </Grid>
        </Grid>
      );
    });
  };

  
  return (
    <div style={{ width: '100%' }}>
      <Grid container justifyContent="flex-end" style={{ marginTop: 20, paddingRight: 40 }}>
  <Button
    id="fade-button"
    aria-controls={open ? 'fade-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
    onClick={handleClick}
    style={{ border: `0.7px solid ${overState}`, width: 300, height: 40, borderRadius: 30 }}
  >
    <div style={{ display: 'flex', fontWeight: 'bold', color: "black" }}>
      Sort by: {sortOption}
      <KeyboardArrowDownIcon style={{ color: '#0c5273', marginLeft: 5 }} />
    </div>
  </Button>

  <Menu
    id="fade-menu"
    MenuListProps={{ 'aria-labelledby': 'fade-button' }}
    anchorEl={anchorEl}
    open={open}
    onClose={() => setAnchorEl(null)}
    TransitionComponent={Fade}
  >
    <FormControl>
      <RadioGroup
        value={sortOption}
        onChange={(e) => {
          setSortOption(e.target.value);
          setAnchorEl(null);
        }}
      >
        {["Popularity", "Price: High to Low", "Price: Low to High", "Discount", "All Products"].map((val) => (
          <MenuItem key={val}>
            <FormControlLabel value={val} control={<Radio />} label={val} />
          </MenuItem>
         ))}
        </RadioGroup>
        </FormControl>
      </Menu>
      </Grid>


      <Grid container spacing={-3} style={{ padding: 10 }}>
        {showImages()}
      </Grid>
    </div>
  );
}

