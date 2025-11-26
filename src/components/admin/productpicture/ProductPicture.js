import { FormHelperText, FormControl, InputLabel, Select, MenuItem, Button, Grid, Avatar } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import logo from '../../../assets/logo.png'
import cart from '../../../assets/cart.png'
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react"
import Swal from "sweetalert2"
import { userStyle } from "../productpicture/ProductPictureCSS"
import { postData, currentDate, getData } from "../../../services/FetchNodeAdminServices"
import { useEffect } from "react";
import { Height } from "@mui/icons-material";

export default function ProductPicture(props) {
  var classes = userStyle()

  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [brandId, setBrandId] = useState('')
  const [productId, setProductId] = useState('')
  const [productDetailId, setProductDetailId] = useState('')

  const [loadingStatus, setLoadingStatus] = useState(false)
  const [fileNames, setFileNames] = useState({
    bytes: [], fileName: cart
  })

  const [errorMessages, setErrorMessages] = useState({})
  const [categoryList, setCategoryList] = useState([])
  const [subCategoryList, setSubCategoryList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [productList, setProductList] = useState([])
  const [productDetailList, setProductDetailList] = useState([])

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
  const handleSubCategory = (cid) => {
    setCategoryId(cid)
    fetchAllSubCategory(cid)
  }

  const fetchAllSubCategory = async (cid) => {
    var body = { categoryid: cid }
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

  const handleBrand = (sid) => {
    setSubCategoryId(sid)
    fetchAllBrand(sid)
  }

  const fetchAllBrand = async (sid) => {
    var body = { subcategoryid: sid }
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

  const handleProduct = (bid) => {
    setBrandId(bid)
    fetchAllProduct(bid)
  }

  const fetchAllProduct = async (bid) => {
    var body = { brandid: bid }
    var result = await postData(
      "product/get_all_product_by_brandid",
      body
    )
    setProductList(result.data)
  }

  const fillProductDetail = () => {
    return productDetailList.map((item) => {
      return <MenuItem value={item.productdetailid}>{item.productdetailname}</MenuItem>

    })
  }

  const handleProductDetail = (pid) => {
    setProductId(pid)
    fetchAllProductDetail(pid)
  }

  const fetchAllProductDetail = async (pid) => {
    var body = { productid: pid }
    var result = await postData(
      "productdetail/get_all_productdetail_by_productid",
      body
    )
    setProductDetailList(result.data)
  }

  const handleErrorMessages = (label, message) => {
    var msg = errorMessages
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
    if (productDetailId.length == 0) {
      handleErrorMessages('productDetailId', 'Pls input productdetail id ..')
      err = true
    }
    if (fileNames.bytes.length == 0) {
      handleErrorMessages('fileNames', 'Pls upload picture..')
      err = true
    }
    return err
  }

  const showThumbnails = () => {
    return fileNames?.bytes?.map((item) => {
      return (<div style={{ margin: 2, width: 30, height: 30, borderRadius: 5 }}><img src={URL.createObjectURL(item)} style={{ width: 30, height: 30 }} /></div>)

    })
  }

  function handleImage(e) {
    handleErrorMessages('fileNames', null)
    console.log("xxxxxxxxxxx", e.target.files)
    setFileNames({
      bytes: Object.values(e.target.files),
      fileName: URL.createObjectURL(e.target.files[0])
    })

  }
  const resetValue = () => {
    setCategoryId('')
    setSubCategoryId('')
    setBrandId('')
    setProductId('')
    setProductDetailId('')
    setFileNames({ bytes: [], fileName: cart })

  }

  const handleSubmit = async () => {
    var err = validateData()
    if (err == false) {
      setLoadingStatus(true)
      const formData = new FormData()
      formData.append('categoryid', categoryId)
      formData.append('subcategoryid', subCategoryId)
      formData.append('brandid', brandId)
      formData.append('productid', productId)
      formData.append('productdetailid', productDetailId)
      fileNames?.bytes?.map((item, i) => {
        formData.append('picture' + i, item)
      })
      formData.append('created_at', currentDate())
      formData.append('updated_at', currentDate())
      formData.append('user_admin', 'Farzi')

      console.log(formData)

      var result = await postData('productpicture/productpicture_submit', formData)
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

                Product Picture Register

              </div>
            </div>
          </Grid>
          <Grid item xs={2.4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={categoryId}
                error={errorMessages?.categoryId}
                onFocus={() => handleErrorMessages('categoryId', null)}
                label="Category"
                onChange={(e) => handleSubCategory(e.target.value)}>
                {fillCategory()}

              </Select>
              <FormHelperText><div className={classes.errorMessagesStyle}>{errorMessages?.categoryId}</div></FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={2.4}>
            <FormControl fullWidth>
              <InputLabel>Subcategory</InputLabel>
              <Select value={subCategoryId}
                error={errorMessages?.subCategoryId}
                onFocus={() => handleErrorMessages('subCategoryId', null)}
                label="SubCategory"
                onChange={(e) => handleBrand(e.target.value)}>
                {fillSubCategory()}

              </Select>
              <FormHelperText><div className={classes.errorMessagesStyle}>{errorMessages?.subCategoryId}</div></FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={2.4}>
            <FormControl fullWidth>
              <InputLabel>Brand</InputLabel>
              <Select value={brandId}
                error={errorMessages?.brandId}
                onFocus={() => handleErrorMessages('brandId', null)}
                label="Brand"
                onChange={(e) => handleProduct(e.target.value)}>
                {fillBrand()}

              </Select>
              <FormHelperText><div className={classes.errorMessagesStyle}>{errorMessages?.brandId}</div></FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={2.4}>
            <FormControl fullWidth>
              <InputLabel>Product</InputLabel>
              <Select value={productId}
                error={errorMessages?.productId}
                onFocus={() => handleErrorMessages('productId', null)}
                label="Product"
                onChange={(e) => handleProductDetail(e.target.value)}>
                {fillProduct()}

              </Select>
              <FormHelperText><div className={classes.errorMessagesStyle}>{errorMessages?.productId}</div></FormHelperText>
            </FormControl>
          </Grid>


          <Grid item xs={2.4}>
            <FormControl fullWidth>
              <InputLabel>ProductDetail</InputLabel>
              <Select value={productDetailId}
                error={errorMessages?.productDetailId}
                onFocus={() => handleErrorMessages('productDetailId', null)}
                label="Product Detail"
                onChange={(e) => setProductDetailId(e.target.value)}>
                {fillProductDetail()}

              </Select>
              <FormHelperText><div className={classes.errorMessagesStyle}>{errorMessages?.productDetailId}</div></FormHelperText>
            </FormControl>
          </Grid>



          <Grid item xs={6} className={classes.center}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button variant="contained" component='label'>
                Upload
                <input onChange={handleImage} hidden type="file" accept='image/*' multiple />

              </Button>
              <div className={classes.errorMessageStyle}>{errorMessages.fileNames}</div>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <div style={{ display: 'flex' }}>
              {showThumbnails()}
            </div>
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

