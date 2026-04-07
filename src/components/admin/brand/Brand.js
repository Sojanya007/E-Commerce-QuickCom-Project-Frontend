import { FormHelperText, FormControl, InputLabel, Select, MenuItem, Button, Grid, TextField, Avatar } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import logo from '../../../assets/logo.png'
import cart from '../../../assets/cart.png'
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react"
import Swal from "sweetalert2"
import { userStyle } from "../brand/BrandCSS";
import { postData, currentDate, getData } from "../../../services/FetchNodeAdminServices"
import { useEffect } from "react";
 

export default function Brand(props) {
  var classes = userStyle()
  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [brandName, setBrandName] = useState('')
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [brandIcon, setBrandIcon] = useState({ bytes: '', fileName: cart })
  const [errorMessages, setErrorMessages] = useState({})
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
      return( <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      )
    })
  }
 const handleSubCategory = (sid) =>{
  setCategoryId(sid)
  fetchAllSubCategory(sid)
 }

  const fetchAllSubCategory = async (sid) => {
     var body = {categoryid: sid}
     var result = await postData(
      "subcategory/get_all_subcategory_by_categoryid",
      body
     )
     setSubCategoryList(result.data)
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
    if (brandName.length == 0) {
      handleErrorMessages('brandName', 'Pls input brand..')
      err = true
    }
    if (brandIcon.bytes.length == 0) {
      handleErrorMessages('brandIcon', 'Pls select brandicon..')
      err = true
    }
    return err
  }



  function handleImage(e) {
    handleErrorMessages('brandIcon', null)
    setBrandIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })

  }
  const resetValue = () => {
    setCategoryId('')
    setSubCategoryId('')
    setBrandName('')
    setBrandIcon({ bytes: '', fileName: cart })

  }

  const handleSubmit = async () => {
    const err = validateData()
    if (err == false) {
      setLoadingStatus(true)
      const formData = new FormData()
      formData.append('categoryid', categoryId)
      formData.append('subcategoryid',subCategoryId)
      formData.append('brandname', brandName)
      formData.append('brandicon', brandIcon.bytes)
      formData.append('created_at', currentDate())
      formData.append('updated_at', currentDate())
      formData.append('user_admin', 'Farzi')



      var result = await postData('brand/brand_submit', formData)
      if (result.status) {
        Swal.fire({
          //position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          // toast:true,
        });
        setLoadingStatus(true)

      }

      else {
        Swal.fire({
          // position: "top-end",
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          //toast:true,
        });
      }
      setLoadingStatus(false)
      // resetValue()
    }

  }
  const handleReset = () => {
    resetValue()

  }



  return (<div className={classes.root}>
    <div className={classes.box}>
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
            <Select value={categoryId}
              error={!!errorMessages.categoryId}
              onFocus={() => handleErrorMessages('categoryId', null)}
              label="Category Id"
              onChange={(e) =>  handleSubCategory(e.target.value)}>
              {fillCategory()}

            </Select>
            <FormHelperText><div className={classes.errorMessagesStyle}>{errorMessages?.categoryId}</div></FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
           <FormControl fullWidth>
            <InputLabel>Subcategory Id</InputLabel>
            <Select value={subCategoryId}
              error={!!errorMessages.subCategoryId}
              onFocus={() => handleErrorMessages('subCategoryId', null)}
              label="Subcategory Id"
              onChange={(e) => setSubCategoryId(e.target.value) }>
              {fillSubCategory()}

            </Select>
            <FormHelperText><div className={classes.errorMessagesStyle}>{errorMessages?.subCategoryId}</div></FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField onFocus={() => handleErrorMessages('brandName', null)}
           error={errorMessages?.brandName}
            helperText={errorMessages?.brandName}
             value={brandName} onChange={(e) => setBrandName(e.target.value)} label="Brand Name" fullWidth />

        </Grid>
        <Grid item xs={6} className={classes.center}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button variant="contained" component='label'>Upload
              <input onChange={handleImage} hidden type="file" accept='image/*' multiple />

            </Button>
            <div className={classes.errorMessageStyle}>{errorMessages.brandIcon}</div>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Avatar src={brandIcon.fileName} style={{ width: 70, height: 70 }} variant='square' />
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
