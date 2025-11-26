import { useState, useEffect } from "react"
import MaterialTable from "@material-table/core"
import { getData, serverURL, createDate } from "../../../services/FetchNodeAdminServices"
import { userStyle } from "../productdetail/ProductDetailCSS"
import { FormControl, FormHelperText, InputLabel, Select, MenuItem, IconButton, Grid, TextField, Avatar, Dialog, DialogContent, DialogActions, Button } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import logo from '../../../assets/logo.png'
import cart from '../../../assets/cart.png'
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2"
import CloseIcon from '@mui/icons-material/Close';
import { postData, currentDate } from "../../../services/FetchNodeAdminServices"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom"


export default function DisplayAllProductDetail() {
  const navigate=useNavigate()
  const classes = userStyle()
  const [value, setValue] = useState('');
  const [productDetailList, setProductDetailList] = useState([])
  const [open, setOpen] = useState(false)

  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [brandId, setBrandId] = useState('')
  const [productId, setProductId] = useState('')
  const [productDetailId, setProductDetailId] = useState('')

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
  const [hideUploadButton, setHideUploadButton] = useState(false)
  const [oldImage,setOldImage]=useState('')

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




  const handleErrorMessages = (label, message) => {
    var msg = errorMessages
    msg[label] = message
    setErrorMessages((prev) => ({ ...prev, ...msg }))
  }
  const showSaveCancelButton = () => {
    return (
      <div>
        <Button onClick={handleEditPicture}>Save</Button>
        <Button onClick={handleCancelPicture}>Cancel</Button>
      </div>
    )
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
      handleErrorMessages('stock', 'Pls select stock..')
      err = true
    }
    if (price.length == 0) {
      handleErrorMessages('price', 'Pls select price..')
      err = true
    }
    if (offerPrice.length == 0) {
      handleErrorMessages('offerPrice', 'Pls select offerprice..')
      err = true
    }
    if (offerType.length == 0) {
      handleErrorMessages('offerType', 'Pls select offertype..')
      err = true
    }
    if (productStatus.length == 0) {
      handleErrorMessages('productStatus', 'Pls select productstatus..')
      err = true
    }
    return err
  }


  function handleImage(e) {
    handleErrorMessages("picture", null)
    setPicture({
      bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0])
    })

    setHideUploadButton(true)
  }

  const productDetailForm = () => {

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.mainHeadingStyle}>
            <img src={logo} className={classes.imageStyle} />

            <div className={classes.headingStyle}>

              ProductDetail Register

            </div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>Category Id</InputLabel>
            <Select
              value={categoryId}
              error={!!errorMessages.categoryId}
              onFocus={() => handleErrorMessages("categoryId",null)}
              label="Category Id"
              onChange={(e) => handleSubCategory(e.target.value)}
            >
              {fillCategory()}
            </Select>
            <FormHelperText>
              <div className={classes.errorMessageStyle}>
                {errorMessages?.categoryId}
              </div>
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>Subcategory Id</InputLabel>
            <Select
              value={subCategoryId}
              error={errorMessages?.subCategoryId}
              onFocus={() => handleErrorMessages("subCategoryId", null)}
              label="SubCategory Id"
              onChange={(e) => handleBrand(e.target.value)}
            >
              {fillSubCategory()}
            </Select>
            <FormHelperText>
              <div className={classes.errorMessageStyle}>
                {errorMessages?.subCategoryId}
              </div>
            </FormHelperText>
          </FormControl>
        </Grid>

        
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>Brand Id</InputLabel>
            <Select
              value={brandId}
              error={!!errorMessages.brandId}
              onFocus={() => handleErrorMessages("brandId", null)}
              label="Brand Id"
              onChange={(e) => handleProduct(e.target.value)}
            >
              {fillBrand()}
            </Select>
            <FormHelperText>
              <div className={classes.errorMessageStyle}>
                {errorMessages?.brandId}
              </div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>Product Id</InputLabel>
            <Select
              value={productId}
              error={!!errorMessages.productId}
              onFocus={() => handleErrorMessages("productId", null)}
              label="Product Id"
              onChange={(e) => setProductId(e.target.value)}
            >
              {fillProduct()}
            </Select>
            <FormHelperText>
              <div className={classes.errorMessageStyle}>
                {errorMessages?.productId}
              </div>
            </FormHelperText>
          </FormControl>
        </Grid>
 
        <Grid item xs={8}>
          <TextField
            onFocus={() => handleErrorMessages('productDetailName', null)}
            error={errorMessages?.productDetailName}
            helperText={errorMessages?.productDetailName}
            onChange={(e) => setProductDetailName(e.target.value)}
            label="ProductDetail Name"
            value={productDetailName}
            fullWidth
          />

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
             label="Packaging Type"
             onChange={(e) => setPackagingType(e.target.value)}
             >
              <MenuItem value="Bag">Bag</MenuItem>
              <MenuItem value="Bottle">Bottle</MenuItem>
              <MenuItem value="Box">Box</MenuItem>

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
             value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} label="offer Price" fullWidth />

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
            {hideUploadButton ? (<div>{showSaveCancelButton()}</div>) : (
              <Button variant="contained" component='label'>Upload
                <input onChange={handleImage} hidden type="file" accept='image/*' multiple />

              </Button>)}

            <div className={classes.errorMessageStyle}>
              {errorMessages?.picture != null ? (
                errorMessages?.picture) : (<></>)}</div>
          </div>

        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Avatar src={picture.fileName} variant='square'></Avatar>
        </Grid>


      </Grid>
    )
  }

  const fetchAllProductDetail = async () => {

    var result = await getData('productdetail/display_all_productdetail')
    if (result.status) {
      setProductDetailList(result.data)
    }
    else {
      alert(result.message)
    }

  }

  useEffect(function () {
    fetchAllProductDetail()

  }, [])

  const handleOpenDialoge = (rowData) => {

    setCategoryId(rowData.categoryid)
    fetchAllSubCategory(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    fetchAllBrand(rowData.subcategoryid)
    setBrandId(rowData.brandid)
    fetchAllProduct(rowData.brandid)
    setProductId(rowData.productid)
    setProductDetailId(rowData.productdetailid)
    setProductDetailName(rowData.productdetailname)
    setWeight(rowData.weight)
    setWeightType(rowData.weighttype)
    setPackagingType(rowData.packagingtype)
    setNoofQty(rowData.noofqty)
    setStock(rowData.stock)
    setPrice(rowData.price)
    setOfferPrice(rowData.offerprice)
    setOfferType(rowData.offertype)
    setProductStatus(rowData.productstatus)
    setProductDetailDescription(rowData.productdetaildescription)
    setPicture({bytes:'',fileName:`${serverURL}/images/${rowData.picture}`})
    setOldImage(`${serverURL}/images/${rowData.picture}`)
    setOpen(true)
  }

  const handleEditData = async () => {
    var err = validateData()
    if (err == false) {
      setLoadingStatus(true)
      var body = {
        categoryid: categoryId,
        subcategoryid: subCategoryId,
        brandid: brandId,
        productid: productId,
        productdetailname: productDetailName,
        weight: weight,
        weighttype: weightType,
        packagingtype: packagingType,
        noofqty: noofqty,
        price: price,
        stock: stock,
        offerprice: offerPrice,
        offertype: offerType,
        productstatus: productStatus,
        productdetaildescription: productDetailDescription,
        updated_at: currentDate(),
        user_admin: 'Farzi',
        productdetailid: productDetailId
      }

      var result = await postData('productdetail/edit_productdetail_data',body)
      if (result.status) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          toast: true,
        });


      }

      else {
        Swal.fire({
         position: "top-end",
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          toast: true,
        });
      }
      setLoadingStatus(false)

    }
    fetchAllProductDetail()

  }

  const handleEditPicture = async () => {

    setLoadingStatus(true)
    var formData = new FormData()
    formData.append('picture', picture.bytes)
    formData.append('updated_at', currentDate())
    formData.append('user_admin', 'Farzi')
    formData.append('productdetailid', productDetailId)

    var result = await postData('productdetail/edit_picture', formData)
    if (result.status) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
      setLoadingStatus(true)

    }

    else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
    }
    setLoadingStatus(false)
    setHideUploadButton(false)

    fetchAllProductDetail()

  }

  const productDetailDelete = async () => {
    setLoadingStatus(true)
    var body = { 'productdetailid': productDetailId }

    var result = await postData('productdetail/delete_productdetail', body)
    if (result.status) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });


    }

    else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });
    }
    setLoadingStatus(false)
    setHideUploadButton(false)

    fetchAllProductDetail()

  }


  const handleDeleteProductDetail = async () => {
    Swal.fire({
      title: "Do you want to delete the ProductDetail?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then((result) => {

      if (result.isConfirmed) {

        productDetailDelete()

      } else if (result.isDenied) {
        Swal.fire("Product Detail not delete", "", "info");
      }
    });


  }

  const handleCloseDialoge = () => {
    setOpen(false)
  }
  const handleCancelPicture = () => {
    setPicture({ bytes: '', fileName: oldImage })
    setHideUploadButton(false)
  }



  const productDetailDialoge = () => {
    return (
      <div>
        <Dialog open={open} maxWidth="md">
          <IconButton
            aria-label="close"
            onClick={handleCloseDialoge}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent>
            {productDetailForm()}
          </DialogContent>
          <DialogActions>
            <LoadingButton
              loading={loadingStatus}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={handleEditData}
            >
              Edit Data
            </LoadingButton>
            <Button onClick={handleDeleteProductDetail} variant="contained">Delete</Button>

          </DialogActions>
        </Dialog>
      </div>
    )
  }

  function productDetailTable() {
    return (
      <div className={classes.root}>
        <div className={classes.displayBox}>
          <MaterialTable
            title="ProductDetail List"
            columns={[
              { title: 'Id', field: 'productdetailid' },
              { title: "Id's" ,
                render: (rowData) => (
                  <div style={{display:'flex', flexDirection: 'column' }}>
                   <div>{rowData.categoryname}/{rowData.subcategoryname}</div>
                   <div>{rowData.brandname}/{rowData.productname}</div>
                  </div>
                )

              },
             
              { title: 'Product Name', field: 'productdetailname' },

              { title: "About",
                render: (rowData) => (
                  <div style={{display:'flex',flexDirection:'column', fontSize:15}}>
                    <div>{rowData.weight} {rowData.weighttype}</div>
                    <div>{rowData.packagingtype}[{rowData.noofqty}Qty.]</div>
                    <div>Stock:{rowData.stock}</div>
                    <div><s>{rowData.price}</s> {rowData.offerprice}</div>
                    <div>{rowData.offertype}/{rowData.productstatus}</div>
                  </div>
                )
              },
               
              
              
              { title: 'Picture', render: (rowData) => <div><img src={`${serverURL}/images/${rowData.picture}`} style={{ width: 60, height: 60, borderRadius: 6 }} /></div> },

            ]}
            data={productDetailList}
            options={{
              pageSize: 3,
              pageSizeOptions: [3, 5, 10, { value: productDetailList.length, label: 'All' }],
            }}

            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit ProductDetail',
                onClick: (event, rowData) => handleOpenDialoge(rowData)
              },

              {
                icon: 'add',
                tooltip: 'Add User',
                isFreeAction: true,
                onClick: (event) =>  navigate('/dashboard/productdetail')
              }
            ]}
          />
        </div>
      </div>
    )
  }


  return (<div>
    {productDetailTable()}
    {productDetailDialoge()}
  </div>)


}
