import { useState, useEffect } from "react"
import MaterialTable from "@material-table/core"
import { getData, serverURL, createDate } from "../../../services/FetchNodeAdminServices"
import { userStyle } from "../brand/BrandCSS"
import { FormControl, FormHelperText, InputLabel, Select, MenuItem, IconButton, Grid, TextField, Avatar, Dialog, DialogContent, DialogActions, Button } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import logo from '../../../assets/logo.png'
import cart from '../../../assets/cart.png'
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2"
import CloseIcon from '@mui/icons-material/Close';
import { postData, currentDate } from "../../../services/FetchNodeAdminServices"
import { useNavigate } from "react-router-dom"


export default function DisplayAllBrand() {
  const navigate=useNavigate()
  const classes = userStyle()
  const [brandList, setBrandList] = useState([])
  const [open, setOpen] = useState(false)

  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [brandId, setBrandId] = useState('')
  const [brandName, setBrandName] = useState('')
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [brandIcon, setBrandIcon] = useState({ bytes: '', fileName: cart })
  const [errorMessages, setErrorMessages] = useState({})
  const [hideUploadButton, setHideUploadButton] = useState(false)
  const [oldImage, setOldImage] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [subCategoryList, setSubCategoryList] = useState([])

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

  const handleErrorMessages = (label, message) => {
    var msg = errorMessages
    msg[label] = message
    setErrorMessages((prev) => ({ ...prev, ...msg }))
  }
  const showSaveCancelButton = () => {
    return (
      <div>
        <Button onClick={handleEditIcon}>Save</Button>
        <Button onClick={handleCancelIcon}>Cancel</Button>
      </div>
    )
  }
  const validateData = () => {
    var err = false

    if (categoryId.length == 0) {
      handleErrorMessages('categoryId', 'Pls input Categoryid..')
      err = true
    }
    if (subCategoryId.length == 0) {
      handleErrorMessages('subCategoryId', 'Pls input Categoryid..')
      err = true
    }
    if (brandName.length == 0) {
      handleErrorMessages("brandName", "Pls input Subcategoryname")
      err = true
    }
    /*if (brandIcon.bytes.length==0){
      handleErrorMessages("brandIcon","Pls upload brandicon")
      err = true
    }*/
    return err
  }


  function handleImage(e) {
    handleErrorMessages('brandIcon', null)
    setBrandIcon({
      bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0])
    })

    setHideUploadButton(true)
  }

  const brandForm = () => {

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.mainHeadingStyle}>
            <img src={logo} className={classes.imageStyle} />

            <div className={classes.headingStyle}>

              Brand Register

            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Category Id</InputLabel>
            <Select
              value={categoryId}
              error={errorMessages?.categoryId}
              onFocus={() => handleErrorMessages("categoryId", null)}
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
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Subcategory Id</InputLabel>
            <Select
              value={subCategoryId}
              error={errorMessages?.subCategoryId}
              onFocus={() => handleErrorMessages("subCategoryId", null)}
              label="SubCategory Id"
              onChange={(e) => setSubCategoryId(e.target.value)}
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
        <Grid item xs={12}>
          <TextField
            onFocus={() => handleErrorMessages('brandName', null)}
            error={errorMessages?.brandName}
            helperText={errorMessages?.brandName}
            onChange={(e) => setBrandName(e.target.value)}
            label="Brand Name"
            value={brandName}
            fullWidth
          />

        </Grid>


        <Grid item xs={6} className={classes.center}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {hideUploadButton ? (<div>{showSaveCancelButton()}</div>) : (
              <Button variant="contained" component='label'>Upload
                <input onChange={handleImage} hidden type="file" accept='image/*' multiple />

              </Button>)}

            <div className={classes.errorMessageStyle}>
              {errorMessages?.brandIcon != null ? (
                errorMessages?.brandIcon) : (<></>)}</div>
          </div>

        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Avatar src={brandIcon.fileName} variant='square'></Avatar>
        </Grid>


      </Grid>
    )
  }

  const fetchAllBrand = async () => {

    var result = await getData('brand/display_all_brand')
    if (result.status) {
      setBrandList(result.data)
    }
    else {
      alert(result.message)
    }

  }

  useEffect(function () {
    fetchAllBrand()

  }, [])

  const handleOpenDialoge = (rowData) => {
    setCategoryId(rowData.categoryid)
    fetchAllSubCategory(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setBrandId(rowData.brandid)
    setBrandName(rowData.brandname)
    setBrandIcon({
      bytes: '', fileName: `${serverURL}/images/${rowData.brandicon}`,
    })
    setOldImage(`${serverURL}/images/${rowData.brandicon}`)
    setOpen(true)
  }

  const handleEditData = async () => {
    var err = validateData()
    if (err == false) {
      setLoadingStatus(true)
      var body = {
        categoryid: categoryId,
        subcategoryid: subCategoryId,
        brandname: brandName,
        updated_at: currentDate(),
        user_admin: 'Farzi',
        brandid: brandId
      }

      var result = await postData('brand/edit_brand_data', body)
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
    fetchAllBrand()

  }

  const handleEditIcon = async () => {

    setLoadingStatus(true)
    var formData = new FormData()
    formData.append('brandicon', brandIcon.bytes)
    formData.append('updated_at', currentDate())
    formData.append('user_admin', 'Farzi')
    formData.append('brandid', brandId)

    var result = await postData('brand/edit_brand_icon', formData)
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

    fetchAllBrand()

  }

  const brandDelete = async () => {
    setLoadingStatus(true)
    var body = { 'brandid': brandId }

    var result = await postData('brand/delete_brand', body)
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

    fetchAllBrand()

  }


  const handleDeleteBrand = async () => {
    Swal.fire({
      title: "Do you want to delete the Brand?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then((result) => {

      if (result.isConfirmed) {

        brandDelete()

      } else if (result.isDenied) {
        Swal.fire("Brand not delete", "", "info");
      }
    });


  }

  const handleCloseDialoge = () => {
    setOpen(false)
  }
  const handleCancelIcon = () => {
    setBrandIcon({ bytes: '', fileName: oldImage })
    setHideUploadButton(false)
  }



  const brandDialoge = () => {
    return (
      <div>
        <Dialog open={open}>
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
            {brandForm()}
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
            <Button onClick={handleDeleteBrand} variant="contained">Delete</Button>

          </DialogActions>
        </Dialog>
      </div>
    )
  }

  function brandTable() {
    return (
      <div className={classes.root}>
        <div className={classes.displayBox}>
          <MaterialTable
            title="Brand List"
            columns={[
              { title: 'Brand Id', field: 'brandid' },
              { title: 'SubCategory Id', field: 'subcategoryname' },
              { title: 'Category Id', field: 'categoryname' },
              { title: 'Brand Name', field: 'brandname' },
              { title: 'Created At', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }}><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div> },
              { title: 'Admin', field: 'user_admin' },
              { title: 'Icon', render: (rowData) => <div><img src={`${serverURL}/images/${rowData.brandicon}`} style={{ width: 60, height: 60, borderRadius: 6 }} /></div> },

            ]}
            data={brandList}
            options={{
              pageSize: 3,
              pageSizeOptions: [3, 5, 10, { value: brandList.length, label: 'All' }],
            }}

            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Brand',
                onClick: (event, rowData) => handleOpenDialoge(rowData)
              },

              {
                icon: 'add',
                tooltip: 'Add User',
                isFreeAction: true,
                onClick: (event) =>  navigate('/dashboard/brand')
              }
            
            ]}
          />
        </div>
      </div>
    )
  }


  return (<div>
    {brandTable()}
    {brandDialoge()}
  </div>)


}
