import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


import Category from "../category/Category"
import Subcategory from "../subcategory/SubCategory"
import Brand from "../brand/Brand"
import Product from "../product/Product"
import ProductDetail from "../productdetail/ProductDetail"
import ProductPicture from "../productpicture/ProductPicture"
import MainBanner from "../mainbanner/MainBanner"
import BankAndOtherOffers from '../bankandotheroffers/BankAndOtherOffers';
import AdOffers from "../adoffers/AdOffers"


import DisplayAllCategory from "../category/DisplayAllCategory"
import DisplayAllSubCategory from "../subcategory/DisplayAllSubCategory"
import DisplayAllBrand from "../brand/DisplayAllBrand"
import DisplayAllProduct from "../product/DisplayAllProduct"
import DisplayAllProductDetail from "../productdetail/DisplayAllProductDetail"

import { List,ListItem,ListItemButton,ListItemIcon,ListItemText,Divider, Grid, Paper } from '@mui/material';
import { serverURL } from '../../../services/FetchNodeAdminServices';
import { Route, Routes, useNavigate } from 'react-router-dom';

 

export default function Dashboard() {
    var navigate=useNavigate()
    return(
        <div>
        <AppBar position="static">
          <Toolbar>
             <img src={`${serverURL}/images/logo.png`}  style={{width:60, height:60}}/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QuickComm
            </Typography>
            <Button onClick={()=>navigate('/adminlogin')} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
         
          <Grid container>
            <Grid item xs={2}  >
             <Paper elevation={6} style={{flexDirection:'column',display:'flex',alignItems:'center' ,height:650,margin:10}}>
               
              <div>
              <img src={`${serverURL}/images/boyz.png`}  style={{width:100,height:100,borderRadius:50,marginTop:10}}/>
              </div>
              <div style={{fontSize:12,fontWeight:'bold',letterSpacing:1}}>
                Harry Singh
              </div>
              <div style={{fontSize:10,fontWeight:'bold' ,color:'grey'}}>
                Harrysingh@gmail.com
              </div>
              <Divider style={{width:'90%',marginTop:'10%'}}/>
              <div>
                <List>
                  <ListItem style={{marginTop:-8}}>
                    <ListItemButton  >
                      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <img src='/dashboard.png' style={{width:30,height:30}}/>
                        <div style={{fontWeight:600,marginLeft:15}}>
                          Dashboard
                        </div>
                      </div>
                       
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton onClick={()=>navigate('/dashboard/displayallcategory')}>
                      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <img src='/category.png' style={{width:30,height:30}}/>
                        <div style={{fontWeight:600,marginLeft:15}}>
                          Category 
                        </div>
                      </div>
                       
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton onClick={()=>navigate('/dashboard/displayallsubcategory')}>
                      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <img src='/subcategory.png' style={{width:30,height:30}}/>
                        <div style={{fontWeight:600,marginLeft:15}}>
                          SubCategory
                        </div>
                      </div>
                       
                    </ListItemButton>
                  </ListItem>


                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton onClick={()=>navigate('/dashboard/displayallbrand')}>
                      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <img src='/brand-image.png' style={{width:30,height:30}}/>
                        <div style={{fontWeight:600,marginLeft:15}}>
                          Brand 
                        </div>
                      </div>
                       
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton  onClick={()=>navigate('/dashboard/displayallproduct')}>
                      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <img src='/products.png' style={{width:30,height:30}}/>
                        <div style={{fontWeight:600,marginLeft:15}}>
                          Product 
                        </div>
                      </div>
                       
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton  onClick={()=>navigate('/dashboard/displayallproductdetail')}>
                      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <img src='/product-catalog.png' style={{width:30,height:30}}/>
                        <div style={{fontWeight:600,marginLeft:15}}>
                          Product Details
                        </div>
                      </div>
                       
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton onClick={()=>navigate('/dashboard/productpicture')}>
                      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <img src='/product-image.png' style={{width:30,height:30}}/>
                        <div style={{fontWeight:600,marginLeft:15}}>
                          Products images

                        </div>
                      </div>
                       
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton onClick={()=>navigate('/dashboard/mainbanner')}>
                      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <img src='/banners.png' style={{width:30,height:30}}/>
                        <div style={{fontWeight:600,marginLeft:15}}>
                        Banner
                        </div>
                      </div>
                       
                    </ListItemButton>
                  </ListItem>
                     

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton onClick={()=>navigate('/dashboard/adoffers')}>
                      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <img src='/adimages.png' style={{width:30,height:30}}/>
                        <div style={{fontWeight:600,marginLeft:15}}>
                        Product Ads
                        </div>
                      </div>
                       
                    </ListItemButton>
                  </ListItem>

                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton onClick={()=>navigate('/dashboard/bankandotheroffers')}>
                      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <img src='/bank-account.png' style={{width:30,height:30}}/>
                        <div style={{fontWeight:600,marginLeft:15}}>
                        Bank Offer
                        </div>
                      </div>
                       
                    </ListItemButton>
                  </ListItem>


                  <ListItem style={{marginTop:-25}}>
                    <ListItemButton onClick={()=>navigate('/adminlogin')}>
                      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        <img src='/check-out.png' style={{width:30,height:30}}/>
                        <div style={{fontWeight:600,marginLeft:15}}>
                        Logout
                        </div>
                      </div>
                       
                    </ListItemButton>
                  </ListItem>
 

                 
                </List>
              </div>
             </Paper>
            </Grid>
            <Grid item xs={10} >
             
          <Routes>
               
        <Route element={<Category/>} path="/category"></Route>
        <Route element={<DisplayAllCategory/>} path="/displayallcategory"></Route>
        <Route element={<Subcategory/>} path="/subcategory"></Route>
        <Route element={<DisplayAllSubCategory/>} path="/displayallsubcategory"></Route> 
        <Route element={<Brand/>} path="/brand"></Route>
        <Route element={<DisplayAllBrand/>} path="/displayallbrand"></Route> 
        <Route element={<Product/>} path="/product"></Route>
        <Route element={<DisplayAllProduct/>} path="/displayAllProduct"></Route>
        <Route element={<ProductDetail/>} path="/productdetail"></Route>
        <Route element={<DisplayAllProductDetail/>} path="/displayallproductdetail"></Route>
        <Route element={<ProductPicture/>} path="/productpicture"></Route>
        <Route element={<MainBanner/>} path="/mainbanner"></Route>
        <Route element={<BankAndOtherOffers/>} path="/bankandotheroffers"></Route>
        <Route element={<AdOffers/>} path="/adoffers"></Route>
         
          </Routes>
            </Grid>
          </Grid>
       
      </div>
    )
  
  


}