import { FormHelperText, FormControl, InputLabel, Select, MenuItem, Button, Grid, Avatar } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import logo from '../../../assets/logo.png'
import cart from '../../../assets/cart.png'
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react"
import Swal from "sweetalert2" 
import { userStyle } from "../bankandotheroffers/BankAndOtherOffersCSS";
import { postData, currentDate } from "../../../services/FetchNodeAdminServices"
 

export default function BankAndOtherOffers(props) {
  var classes = userStyle()
  const [status, setStatus] = useState('')
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [fileNames, setFileNames] = useState({ bytes: '', fileName: cart })
  const [errorMessages, setErrorMessages] = useState({})


  const handleErrorMessages = (label, message) => {
    var msg=errorMessages
    msg[label] = message
    setErrorMessages((prev) => ({ ...prev,[label]: message }))
  }

  const validateData = () => {
    var err = false
     
    
    if (status.length === 0) {
      handleErrorMessages('status', 'Pls input status..')
      err = true
    }
    
    if (fileNames.bytes.length === 0) {
      handleErrorMessages('fileNames', 'Pls upload  file..')
      err = true
    }
    return err
  }

 const handleImage=(e)=>{
    handleErrorMessages('fileNames',null)
    setFileNames({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
 }


  

  
  const resetValue = () => {
    
    setFileNames({ bytes: '', fileName: cart })
    setStatus('')
  
  }

  
  const handleSubmit = async () => {
    const err = validateData()
    if (err == false) {
      setLoadingStatus(true)
      var formData = new FormData()
      formData.append('status', status)  
      formData.append('fileNames', fileNames.bytes)
      formData.append('created_at', currentDate())
      formData.append('updated_at',currentDate())
      formData.append('user_admin','Farzi')

  
      var result = await postData('bankandotheroffers/bankandotheroffers_submit', formData)
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
      //resetValue()
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

            Bank Offers

            </div>
          </div>
        </Grid>
          
            
        <Grid item xs={12}>
          <FormControl fullWidth>
           <InputLabel>Status</InputLabel>
           <Select
             value={status}
             error={errorMessages?.status}
             onFocus={() => handleErrorMessages("status",null)}
             label="Status"
             onChange={(e) => setStatus(e.target.value)}
             >
              <MenuItem value="Show">Show</MenuItem>
              <MenuItem value="Hide">Hide</MenuItem>
              <MenuItem value="Expire">Expire</MenuItem>
             </Select>
             <FormHelperText>
              <div className={classes.errorMessageStyle}>
                {errorMessages?.status}
              </div>
             </FormHelperText>
          </FormControl>
        </Grid>
         
        
        
       
        
       
         <Grid item xs={12} className={classes.center}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button variant="contained" component='label'>
              Upload
              <input onChange={handleImage} hidden type="file" accept='image/*' multiple />

            </Button>
            <div className={classes.errorMessageStyle}>{errorMessages.fileNames }</div>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <Avatar src={fileNames.fileName}  variant='square'></Avatar>
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
