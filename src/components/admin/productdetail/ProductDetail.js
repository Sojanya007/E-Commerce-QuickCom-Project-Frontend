import { FormHelperText, FormControl, InputLabel, Select, MenuItem, Button, Grid, TextField, Avatar } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import logo from '../../../assets/logo.png'
import cart from '../../../assets/cart.png'
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react"
import Swal from "sweetalert2"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { userStyle } from "../productdetail/ProductDetailCSS"
import { postData, currentDate, getData } from "../../../services/FetchNodeAdminServices"
import { useEffect } from "react";

export default function ProductDetail(props) {
  var classes = userStyle()
  const [value, setValue] = useState('');
  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [brandId, setBrandId] = useState('')
  const [productId, setProductId] = useState('')

  const [productDetailName, setProductDetailName] = useState('')
  const [weight, setWeight] = useState('')
  const [weightType, setWeightType] = useState('')
  const [packagingType, setPackagingType] = useState('')
  const [noofqty, setNoofQty] = useState('')
  const [stock, setStock] = useState('')
  const [price, setPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')
  const [offerType, setOfferType] = useState('')
  const [productStatus, setProductStatus] = useState('')

  const [productDetailDescription, setProductDetailDescription] = useState('')
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [picture, setPicture] = useState({ bytes: '', fileName: cart })

  const [errorMessages, setErrorMessages] = useState({})
  const [categoryList, setCategoryList] = useState([])
  const [subCategoryList, setSubCategoryList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [productList, setProductList] = useState([])
  
  const fetchAllCategory = async () => {
    var result = await getData('category/display_all_category')
    setCategoryList(result.data)
  }
  useEffect(function () {
    fetchAllCategory()
  }, [])

  const fillCategory = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })
  }

  const fillSubCategory = () => {
    return subCategoryList.map((item) => {
      return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      
    })
  }
 const handleSubCategory = (cid) =>{
  setCategoryId(cid)
  fetchAllSubCategory(cid)
 }

  const fetchAllSubCategory = async (cid) => {
     var body = {categoryid: cid}
     var result = await postData(
      "subcategory/get_all_subcategory_by_categoryid",
      body
     )
     setSubCategoryList(result.data)
  }

  const fillBrand = () => {
    return brandList.map((item) => {
      return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
      
    })
  }
 
  const handleBrand = (sid) =>{
    setSubCategoryId(sid)
    fetchAllBrand(sid)
   }
  
    const fetchAllBrand = async (sid) => {
       var body = {subcategoryid: sid}
       var result = await postData(
        "brand/get_all_brand_by_subcategoryid",
        body
       )
       setBrandList(result.data)
    }
  

    const fillProduct = () => {
      return productList.map((item) => {
        return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        
      })
    }
   
    const handleProduct = (bid) =>{
      setBrandId(bid)
      fetchAllProduct(bid)
     }
    
      const fetchAllProduct = async (bid) => {
         var body = {brandid: bid}
         var result = await postData(
          "product/get_all_product_by_brandid",
          body
         )
         setProductList(result.data)
      }

  const handleErrorMessages = (label, message) => {
    var msg=errorMessages
    msg[label] = message
    setErrorMessages((prev) => ({ ...prev, [label]: message }))
  }
  const validateData = () => {
    var err = false
    if (categoryId.length == 0) {
      handleErrorMessages('categoryId', 'Pls input category id ..')
      err = true
    }
    if (subCategoryId.length == 0) {
      handleErrorMessages('subCategoryId', 'Pls input subcategory id ..')
      err = true
    }
    if (brandId.length == 0) {
      handleErrorMessages('brandId', 'Pls input brand id ..')
      err = true
    }
    if (productId.length == 0) {
      handleErrorMessages('productId', 'Pls input product id ..')
      err = true
    }
    if (productDetailName.length == 0) {
      handleErrorMessages('productDetailName', 'Pls input productdetailname..')
      err = true
    }
    if (weight.length == 0) {
      handleErrorMessages('weight', 'Pls input weight ..')
      err = true
    }
    if (weightType.length == 0) {
      handleErrorMessages('weightType', 'Pls input weight type ..')
      err = true
    }
    if (packagingType.length == 0) {
      handleErrorMessages('packagingType', 'Pls input packaging type ..')
      err = true
    }
    if (noofqty.length == 0) {
      handleErrorMessages('noofqty', 'Pls input noofqty ..')
      err = true
    }
    
    if (stock.length == 0) {
      handleErrorMessages('stock', 'Pls input stock..')
      err = true
    }
    if (price.length == 0) {
      handleErrorMessages('price', 'Pls input price..')
      err = true
    }
    if (offerPrice.length == 0) {
      handleErrorMessages('offerPrice', 'Pls input offerprice..')
      err = true
    }
    if (offerType.length == 0) {
      handleErrorMessages('offerType', 'Pls input offertype..')
      err = true
    }
    if (productStatus.length == 0) {
      handleErrorMessages('productStatus', 'Pls input productstatus..')
      err = true
    }
    if (productDetailDescription.length == 0) {
      handleErrorMessages('productDetailDescription', 'Pls input productdetaildescription..')
      err = true
    }
    if (picture.bytes.length == 0) {
      handleErrorMessages('picture', 'Pls upload picture..')
      err = true
    }
    return err
  }



  function handleImage(e) {
    handleErrorMessages('picture', null)
    setPicture({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })

  }
  const resetValue = () => {
    setCategoryId('')
    setSubCategoryId('')
    setBrandId('')
    setProductId('')
    setProductDetailName('')
    setWeight('')
    setWeightType('')
    setPackagingType('')
    setNoofQty('')
    setStock('')
    setPrice('')
    setOfferPrice('')
    setOfferType('')
    setProductStatus('')
    setProductDetailDescription('')
    setPicture({ bytes: '', fileName: cart })

  }

  const handleSubmit = async () => {
    var err = validateData()
    if (err == false) {
      setLoadingStatus(true)
      var formData = new FormData()
      formData.append('categoryid', categoryId)
      formData.append('subcategoryid',subCategoryId)
      formData.append('brandid', brandId)
      formData.append('productid', productId)
      formData.append('productdetailname', productDetailName)
      formData.append('weight', weight)
      formData.append('weighttype', weightType)
      formData.append('packagingtype', packagingType)
      formData.append('noofqty', noofqty)
      formData.append('price', price)
      formData.append('stock', stock)
      formData.append('offerprice', offerPrice)
      formData.append('offertype', offerType)
      formData.append('productstatus', productStatus)
      formData.append('productdetaildescription', productDetailDescription)
      formData.append('picture', picture.bytes)
      formData.append('created_at', currentDate())
      formData.append('updated_at', currentDate())
      formData.append('user_admin', 'Farzi')



      var result = await postData('productdetail/productdetail_submit', formData)
      if (result.status) {
        Swal.fire({
          //position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          //toast:true,
        });
        

      }

      else {
        Swal.fire({
          //position: "top-end",
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 1500,
          //toast:true,
        });
      }
      setLoadingStatus(false)
      resetValue()
    }

  }
  const handleReset = () => {
    resetValue()

  }
 
 return (
 <div className={classes.root}>
    <div className={classes.box}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.mainHeadingStyle}>
            <img src={logo} className={classes.imageStyle} />

            <div className={classes.headingStyle}>

              Product Register

            </div>
          </div>
        </Grid>
        <Grid item xs={3}>
           <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={categoryId}
              error={!!errorMessages.categoryId}
              onFocus={() => handleErrorMessages('categoryId', null)}
              label="Category"
              onChange={(e) =>  handleSubCategory(e.target.value)}>
              {fillCategory()}

            </Select>
            <FormHelperText><div className={classes.errorMessagesStyle}>{errorMessages?.categoryId}</div></FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
           <FormControl fullWidth>
            <InputLabel>Subcategory</InputLabel>
            <Select value={subCategoryId}
              error={!!errorMessages.subCategoryId}
              onFocus={() => handleErrorMessages('subCategoryId', null)}
              label="SubCategory"
              onChange={(e) => handleBrand(e.target.value) }>
              {fillSubCategory()}

            </Select>
            <FormHelperText><div className={classes.errorMessagesStyle}>{errorMessages?.subCategoryId}</div></FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
           <FormControl fullWidth>
            <InputLabel>Brand</InputLabel>
            <Select value={brandId}
              error={!!errorMessages.brandId}
              onFocus={() => handleErrorMessages('brandId', null)}
              label="Brand"
              onChange={(e) => handleProduct(e.target.value) }>
              {fillBrand()}

            </Select>
            <FormHelperText><div className={classes.errorMessagesStyle}>{errorMessages?.brandId}</div></FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
           <FormControl fullWidth>
            <InputLabel>Product</InputLabel>
            <Select value={productId}
              error={!!errorMessages.productId}
              onFocus={() => handleErrorMessages('productId', null)}
              label="Product"
              onChange={(e) => setProductId(e.target.value) }>
              {fillProduct()}

            </Select>
            <FormHelperText><div className={classes.errorMessagesStyle}>{errorMessages?.productId}</div></FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <TextField onFocus={() => handleErrorMessages('productDetailName', null)}
           error={errorMessages?.productDetailName}
            helperText={errorMessages?.productDetailName}
             value={productDetailName} onChange={(e) => setProductDetailName(e.target.value)} label="Product Detail Name" fullWidth />

        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
           <InputLabel>Product Status</InputLabel>
           <Select
             value={productStatus}
             error={errorMessages?.productStatus}
             onFocus={() => handleErrorMessages("productStatus",null)}
             label="Product Status"
             onChange={(e) => setProductStatus(e.target.value)}
             >
              <MenuItem value="Trending">Trending</MenuItem>
              <MenuItem value="Popular">Popular</MenuItem>
               
             </Select>
             <FormHelperText>
              <div className={classes.errorMessageStyle}>
                {errorMessages?.productStatus}
              </div>
             </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField 
           onFocus={() => handleErrorMessages('weight', null)}
           error={errorMessages?.weight}
            helperText={errorMessages?.weight}
             onChange={(e) => setWeight(e.target.value)}
              label="Weight" 
              value={weight}
              fullWidth />

        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
           <InputLabel>Weight Type</InputLabel>
           <Select
             value={weightType}
             error={errorMessages?.weightType}
             onFocus={() => handleErrorMessages("weightType",null)}
             label="Weight Type"
             onChange={(e) => setWeightType(e.target.value)}
             >
              <MenuItem value="kg">Kg</MenuItem>
              <MenuItem value="gm">gm</MenuItem>
              <MenuItem value="ml">ml</MenuItem>
              <MenuItem value="l">l</MenuItem>
              <MenuItem value="mtr">Mtr</MenuItem>
              <MenuItem value="gb">GB</MenuItem>
             </Select>
             <FormHelperText>
              <div className={classes.errorMessageStyle}>
                {errorMessages?.weightType}
              </div>
             </FormHelperText>
          </FormControl>
        </Grid>


        <Grid item xs={3}>
          <FormControl fullWidth>
           <InputLabel>Packaging Type</InputLabel>
           <Select
             value={packagingType}
             error={errorMessages?.packagingType}
             onFocus={() => handleErrorMessages("packagingType",null)}
             label="weight Type"
             onChange={(e) => setPackagingType(e.target.value)}
             >
              <MenuItem value="Bag">Bag</MenuItem>
              <MenuItem value="Bottle">Bottle</MenuItem>
              <MenuItem value="Box">Box</MenuItem>
              <MenuItem value="Packet">Packet</MenuItem>
             </Select>
             <FormHelperText>
              <div className={classes.errorMessageStyle}>
                {errorMessages?.packagingType}
              </div>
             </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField onFocus={() => handleErrorMessages('noofqty', null)}
           error={errorMessages?.noofqty}
            helperText={errorMessages?.noofqty}
             value={noofqty} onChange={(e) => setNoofQty(e.target.value)} label="No Of Qty" fullWidth />
        </Grid>
        <Grid item xs={3}>
          <TextField onFocus={() => handleErrorMessages('stock', null)}
           error={errorMessages?.stock}
            helperText={errorMessages?.stock}
             value={stock} onChange={(e) => setStock(e.target.value)} label="Stock" fullWidth />

        </Grid>
        <Grid item xs={3}>
          <TextField onFocus={() => handleErrorMessages('price', null)}
           error={errorMessages?.price}
            helperText={errorMessages?.price}
             value={price} onChange={(e) => setPrice(e.target.value)} label="Price" fullWidth />

        </Grid>
        <Grid item xs={3}>
          <TextField onFocus={() => handleErrorMessages('offerprice', null)}
           error={errorMessages?.offerPrice}
            helperText={errorMessages?.offerPrice}
             value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} label="Offer Price" fullWidth />

        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
           <InputLabel>Offer Type</InputLabel>
           <Select
             value={offerType}
             error={errorMessages?.offerType}
             onFocus={() => handleErrorMessages("offerType",null)}
             label="Offer Type"
             onChange={(e) => setOfferType(e.target.value)}
             >
              <MenuItem value="Holi Sale">Holi Sale</MenuItem>
              <MenuItem value="Diwali Sale">Diwali Sale</MenuItem>
              <MenuItem value="Dashera Sale">Dashera Sale</MenuItem>
              <MenuItem value="NewYear Sale">NewYear Sale</MenuItem>
              <MenuItem value="Navratri Sale">Navratri Sale</MenuItem>
              <MenuItem value="Rakshabandhan Sale">Rakshabandhan Sale</MenuItem>
             </Select>
             <FormHelperText>
              <div className={classes.errorMessageStyle}>
                {errorMessages?.offerType}
              </div>
             </FormHelperText>
          </FormControl>
        </Grid>
        
         
        <Grid item xs={12}>
        { /* <TextField onFocus={() => handleErrorMessages('productDetailDescription', null)}
           error={errorMessages?.productDetailDescription}
            helperText={errorMessages?.productDetailDescription}
             value={productDetailDescription} onChange={(e) => setProductDetailDescription(e.target.value)} label="Product Detail Description" fullWidth />
          />*/}
            <ReactQuill
              placeholder="Product"
              modules={{
                toolbar: {
                  container: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image", "video"],
                    ["code-block"],
                    ["clean"],
                  ],
                },
                clipboard: {
                  matchVisual: false,
                },
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
                "code-block",
              ]} 
            theme="snow" value={productDetailDescription} onChange={setProductDetailDescription} />
        </Grid>
         <Grid item xs={6} className={classes.center}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button variant="contained" component='label'>
              Upload
              <input onChange={handleImage} hidden type="file" accept='image/*' multiple />

            </Button>
            <div className={classes.errorMessageStyle}>{errorMessages.picture }</div>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Avatar src={picture.fileName}  variant='square'></Avatar>
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <LoadingButton
            loading={loadingStatus}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </LoadingButton>

        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Button onClick={handleReset} variant="contained">Reset</Button>
        </Grid>

      </Grid>
    </div>
  </div>)
}
