import { useState, useEffect } from "react"
import MaterialTable from "@material-table/core"
import { getData, serverURL, createDate } from "../../../services/FetchNodeAdminServices"
import { userStyle } from "../subcategory/SubcategoryCSS"
import { Select,MenuItem,InputLabel,FormControl,FormHelperText,IconButton,Grid, TextField, Avatar, Dialog, DialogContent, DialogActions, Button } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import logo from '../../../assets/logo.png'
import cart from '../../../assets/cart.png'
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2"
import CloseIcon from '@mui/icons-material/Close';
import { postData, currentDate } from "../../../services/FetchNodeAdminServices"
import { useNavigate } from "react-router-dom"


export default function DisplayAllSubCategory() {
  const navigate=useNavigate()
  const classes = userStyle()
  const [subCategoryList, setSubCategoryList] = useState([])
  const [open, setOpen] = useState(false)
  
  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [subCategoryName, setSubCategoryName] = useState('')
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [subCategoryIcon, setSubCategoryIcon] = useState({ bytes: '', fileName: cart })
  const [errorMessages, setErrorMessages] = useState({})
  const [hideUploadButton, setHideUploadButton] = useState(false)
  const [oldImage,setOldImage]=useState('')
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
    var msg = errorMessages
    msg[label] = message
    setErrorMessages((prev) => ({ ...prev, ...msg }))
  }
  const showSaveCancelButton = () => {
    return (<div>
      <Button onClick={handleEditIcon}>Save</Button>
      <Button onClick={handleCancelIcon}>Cancel</Button>
    </div>)
  }
  const validateData = () => {
    var err = false
     
    if (categoryId.length == 0) {
      handleErrorMessages('CategoryId', 'Pls input categoryid..')
      err = true
    }
    if (subCategoryName.length == 0) {
      handleErrorMessages('subCategoryName', 'Pls input categoryname..')
      err = true
    }
    
    return err
  }
 

  const handleImage=(e)=> {
    handleErrorMessages('subCategoryIcon', null)
    setSubCategoryIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
 
    setHideUploadButton(true)
  }

  
  const categoryForm = () => {

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.mainHeadingStyle}>
            <img src={logo} className={classes.imageStyle} />

            <div className={classes.headingStyle}>

              SubCategory Register

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
          <TextField value={subCategoryName} onFocus={() => handleErrorMessages('categoryName', null)} error={errorMessages?.categoryName} helperText={errorMessages?.categoryName} onChange={(e) => setSubCategoryName(e.target.value)} label="SubCategory Name" fullWidth />

        </Grid>
        <Grid item xs={6} className={classes.center}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {hideUploadButton ? (<div>{showSaveCancelButton()}</div>) :(
              <Button variant="contained" component='label'>Upload
                <input onChange={handleImage} hidden type="file" accept='image/*' multiple />

              </Button>)}

            <div className={classes.errorMessageStyle}>
              {errorMessages?.subCategoryIcon != null ? 
               errorMessages?.subCategoryIcon : (<span></span>)}</div>
          </div>

        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Avatar src={subCategoryIcon.fileName} style={{ width: 70, height: 70 }} variant='square' />
        </Grid>


      </Grid>
    )
  }
 





  const fetchAllSubCategory = async () => {

    var result = await getData('subcategory/display_all_subcategory')
    if (result.status) {
     setSubCategoryList(result.data)
    }
    else {
      alert(result.message)
    }

  }

  useEffect(()=> {
    fetchAllSubCategory()

  }, [])


  const handleCloseDialoge = () => {
    setOpen(false)
  }

  
  const handleCancelIcon = () => {
    setSubCategoryIcon({bytes:'',fileName:oldImage})
    setHideUploadButton(false)
  }
  
   
  

  const handleOpenDialoge = (rowData) => {
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setSubCategoryName(rowData.subcategoryname)
    setSubCategoryIcon({bytes:'',fileName:`${serverURL}/images/${rowData.subcategoryicon}`})
    setOldImage(`${serverURL}/images/${rowData.subcategoryicon}`)
    setOpen(true)
  }
 
   
  const handleEditData = async () => {
    var err = validateData()
    if (err == false) {
      setLoadingStatus(true)
      var body = {
        'categoryid':categoryId,
        'subcategoryname': subCategoryName,
        'updated_at': currentDate(),
        'user_admin': 'Farzi',
        'subcategoryid': subCategoryId,
      }
 
      var result = await postData('subcategory/edit_subcategory_data', body)
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

    }
    fetchAllSubCategory()

  }



  const handleEditIcon = async () => {
    
      setLoadingStatus(true)
      var formData=new FormData()
      formData.append('subcategoryicon',subCategoryIcon.bytes) 
      formData.append('updated_at', currentDate())
      formData.append('user_admin', 'Farzi')
      formData.append('subcategoryid', subCategoryId)
     
      var result = await postData('subcategory/edit_subcategory_icon', formData)
      if (result.status)
       {
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
    
    fetchAllSubCategory()

  }


  const categoryDelete=async()=>{
    setLoadingStatus(true)
    var body={'subcategoryid': subCategoryId}
 
    var result = await postData('subcategory/delete_subcategory', body)
    if (result.status)
     {
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
  
  fetchAllSubCategory()

  }
 
  const handleDeleteCategory = async () => {
    Swal.fire({
      title: "Do you want to delete the subcategory?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then((result) => {
  
      if (result.isConfirmed) {
       
         categoryDelete()

      } else if (result.isDenied) {
        Swal.fire("Subcategory not delete", "", "info");
      }
    })
  

  }

   
 
 
 

  const showSubCategoryDialoge = () => {
   return (<div>
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
          {categoryForm()}
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
          <Button onClick={handleDeleteCategory} variant="contained">Delete</Button>
           
        </DialogActions>
      </Dialog>
     </div>)

  }
 
  function subCategoryTable() {
    return (
      <div className={classes.root}>
        <div className={classes.displayBox}>
          <MaterialTable
            title="SubCategory List"
            columns={[
              { title: 'Category Name', field: 'categoryname'},
              { title: 'SubCategory Id', field: 'subcategoryid'},
              { title: 'Subcategory Name', field: 'subcategoryname' },
              { title: 'Created At', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }}><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div> },
              { title: 'Admin', field: 'user_admin' },
              { title: 'Icon', render: (rowData) => <div><img src={`${serverURL}/images/${rowData.subcategoryicon}`} style={{ width: 60, height: 60, borderRadius: 6 }} /></div> },

            ]}
            data={subCategoryList}
            options={{
              pageSize: 3,
              pageSizeOptions: [3, 5, 10, { value: subCategoryList.length, label: 'All' }],
            }}

            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Category',
                onClick: (event, rowData) => handleOpenDialoge(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add User',
                isFreeAction: true,
                onClick: (event) =>  navigate('/dashboard/subcategory')
              }
            ]}
          />
        </div>
      </div>
    )
  }
   
  return (<div>
    {subCategoryTable()}
    {showSubCategoryDialoge()}
  </div>)


}
