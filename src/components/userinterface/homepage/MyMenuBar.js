import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { postData} from '../../../services/FetchNodeAdminServices'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



export default function MyMenuBar() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    fetchAllSubCategory(event.currentTarget.value)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //user_display_product_details_by_subcategory

  const fetchAllProductDetailsBySubCategory = async (subcategoryid) => {
    var result = await postData('userinterface/user_display_product_details_by_subcategory', { subcategoryid })
    if(result && result.data)
    {
    navigate('/pagecategorydisplay', { state: { productData: result.data } })
    console.log("jk",result.data)
    }
    else
    {
    console.log("No data found or API error")
    navigate('/pagecategorydisplay', { state: { productData: [] } })
    
    }
  }

  const fetchAllSubCategory = async (categoryid) => {
    var result = await postData('userinterface/user_get_all_subcategory_by_categoryid', { categoryid })
    if (result && result.data) {
        setSubCategory(result.data)
       } else {
        setSubCategory([])
    }
  }

  const fetchAllCategory = async () => {
    var result = await postData('userinterface/user_display_all_category', { status: 'limit' })
    if (result && result.data) {
        setCategory(result.data)
       } else {
        setCategory([])
    }
  }
  useEffect(() => {
    fetchAllCategory()
  }, [])

  const showCategoryMenu = () => {
    return category.map((item) => {
      return (<Button value={item.categoryid} onClick={handleClick} style={{ color: '#fff', fontWeight: 'bold', marginLeft: 12 }}>{item.categoryname}</Button>)
    })
  }

  const showSubCategoryMenu = () => {
    return subCategory.map((item) => {
      return (<MenuItem onClick={() => fetchAllProductDetailsBySubCategory(item.subcategoryid)} >{item.subcategoryname}</MenuItem>)
    })
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ height: 50, background: '#0c5273' }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {showCategoryMenu()}

            <Button style={{ color: '#fff', fontWeight: 'bold', marginLeft: 10 }}>All Category</Button>



            <Menu

              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {showSubCategoryMenu()}
            </Menu>

          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}