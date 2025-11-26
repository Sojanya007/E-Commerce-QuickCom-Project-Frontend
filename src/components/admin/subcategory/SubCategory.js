import { FormHelperText, FormControl, InputLabel, Select, MenuItem, Button, Grid, TextField, Avatar } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import logo from '../../../assets/logo.png'
import cart from '../../../assets/cart.png'
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react"
import Swal from "sweetalert2"
import { userStyle } from "../subcategory/SubcategoryCSS";
import { postData, currentDate, getData } from "../../../services/FetchNodeAdminServices"
import { useEffect } from "react";

export default function SubCategory(props) {
  var classes = userStyle()
  const [categoryId, setCategoryId] = useState('')
  const [subCategoryName, setSubCategoryName] = useState('')
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [subCategoryIcon, setSubCategoryIcon] = useState({ bytes: '', fileName: cart })
  const [errorMessages, setErrorMessages] = useState({})
  const [categoryList, setCategoryList] = useState([])
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

  

  const handleErrorMessages = (label, message) => {

    setErrorMessages((prev) => ({ ...prev, [label]: message }))
  }
  const validateData = () => {
    var err = false
    if (categoryId.length == 0) {
      handleErrorMessages('categoryId', 'Pls input category id ..')
      err = true
    }
    if (subCategoryName.length == 0) {
      handleErrorMessages('subCategoryName', 'Pls input subcategoryname..')
      err = true
    }
    if (subCategoryIcon.bytes.length == 0) {
      handleErrorMessages('subCategoryIcon', 'Pls select subcategoryicon..')
      err = true
    }
    return err
  }



  function handleImage(e) {
    handleErrorMessages('subCategoryIcon', null)
    setSubCategoryIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })

  }
  const resetValue = () => {
    setCategoryId('')
    setSubCategoryName('')
    setSubCategoryIcon({ bytes: '', fileName: cart })

  }

  const handleSubmit = async () => {
    const err = validateData()
    if (err == false) {
      setLoadingStatus(true)
      const formData = new FormData()
      formData.append('categoryid', categoryId)
      formData.append('subcategoryname', subCategoryName)
      formData.append('subcategoryicon', subCategoryIcon.bytes)
      formData.append('created_at', currentDate())
      formData.append('updated_at', currentDate())
      formData.append('user_admin', 'Farzi')



      var result = await postData('subcategory/subcategory_submit', formData)
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

              Subcategory Register

            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
           <FormControl fullWidth>
            <InputLabel>Category Id</InputLabel>
            <Select value={categoryId}
              error={!!errorMessages.categoryId}
              onFocus={() => handleErrorMessages('categoryId', null)}
              label="Category Id"
              onChange={(e) => setCategoryId(e.target.value)}>
              {fillCategory()}

            </Select>
            <FormHelperText><div className={classes.errorMessagesStyle}>{errorMessages?.categoryId}</div></FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField onFocus={() => handleErrorMessages('subCategoryName', null)} error={errorMessages?.subCategoryName} helperText={errorMessages?.subCategoryName} value={subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)} label="SubCategory Name" fullWidth />

        </Grid>
        <Grid item xs={6} className={classes.center}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button variant="contained" component='label'>Upload
              <input onChange={handleImage} hidden type="file" accept='image/*' multiple />

            </Button>
            <div className={classes.errorMessageStyle}>{errorMessages.subCategoryIcon}</div>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Avatar src={subCategoryIcon.fileName} style={{ width: 70, height: 70 }} variant='square' />
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
