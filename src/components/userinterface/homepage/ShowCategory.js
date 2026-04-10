import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionActions from '@mui/material/AccordionActions';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Divider, Grid, List, useMediaQuery } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme } from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slider from '@mui/material/Slider';
import { postData, getData } from '../../../services/FetchNodeAdminServices';

function valuetext(value) {
  return `${value}°C`;
}



const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({

  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: '1.5rem', color: "#0c5273", fontWeight: 'bold' }} />}

    {...props}

  />
))(({ theme }) => ({

  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: "rotate(180deg)",
    transition: ".3s ease-in-out"
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));



export default function ShowCategory({ data, scid }) {



  const [value, setValue] = React.useState([1, 70]);
  const handleRang = (event, newValue) => {
    setValue(newValue);
  };
  const [expanded, setExpanded] = React.useState('panel1');
  const [brands, setBrands] = React.useState([])
  const fetchAllBrands = async (subcategoryid) => {
    var result = await postData('userinterface/user_get_all_brand_by_subcategoryid', { subcategoryid: subcategoryid })
     if (result && result.data) {
        setBrands(result.data)
       } else {
        setBrands([])
    }
  }


  const showAllBrands = () => {
    return brands.map((item) => {
      return <div style={{
        fontFamily: "JioType, helvetica, arial, sans-serif",
        fontWeight: 500,
        fontSize: '14px',
        letterSpacing: '-0.07px',
        lineHeight: 1.4285714286,
        marginBottom: 5,

      }}>
        {item.brandname}
      </div>
    })

  }
  React.useEffect(() => {
    //alert(scid)
    setExpanded(scid);
    fetchAllBrands(scid)
  }, [scid])



  const handleChange = (panel) => (event, newExpanded) => {
    fetchAllBrands(panel)
    setExpanded(newExpanded ? panel : false);
  };

  const showAllSubCategory = () => {
    return data.map((item) => {
      return <div><Accordion expanded={expanded === item.subcategoryid} onChange={handleChange(item.subcategoryid)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>

          <Typography
            style={{
              fontWeight: 700,
              fontSize: 14.5,
              letterSpacing: -0.07,
              lineHeight: 1.4285714286,
              width: '100%',
              color: 'rgba(0,0,0,.65)',
              overflow: "hidden",
              textOverflow: 'ellipsis',
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",

            }}

          >{item.subcategoryname}</Typography>




        </AccordionSummary>

        <AccordionDetails>
          <Typography style={{ marginLeft: 32, marginTop: -12 }}>
            {showAllBrands()}
          </Typography>
        </AccordionDetails>
      </Accordion>
        <Divider />
      </div>
    })
  }

const currentSubCategory = data.find((item) => item.subcategoryid === scid);
const currentSubCategoryName = currentSubCategory ? currentSubCategory.subcategoryname : '';


  return (


    <Grid>

      
<div style={{marginLeft:135, marginTop:5}}>
                
                <span style={{fontWeight:'bold', color:"#0c5273",fontSize:18}}>Home</span>
                <span style={{width:5,height:4}}><ArrowForwardIosIcon style={{width:13,height:13,marginLeft:7,opacity:0.5}}/></span>
                  <span style={{marginLeft:7,fontWeight:'bold', color:"#0c5273",fontSize:18}}>All Categories</span>
                  <span style={{width:5,height:4}}><ArrowForwardIosIcon style={{width:13,height:13,marginLeft:7,opacity:0.5}}/></span>
                  <span style={{fontWeight:'bold', color:"#0c5273",fontSize:18,marginLeft:7}}>{currentSubCategoryName}</span>
                 </div>



      <div style={{ marginTop: 40 }}>
        <div>
          <Box style={{ height: "450px" }}>
            <section style={{ marginLeft: 220, display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ width: '300px', padding: 5, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 2, borderRadius: '30px', border: '2px solid #e0e0e0' }}>

                <div style={{ fontWeight: 900, fontSize: '28px', letterSpacing: '-0.72px', lineHeight: 3, fontFamily: "JioType, helvetica, arial, sans-serif" }}>Category</div>
                <div style={{ overflowY: 'auto', maxHeight: '450px', scrollbarWidth: 'thin' }}>
                  <div>
                    {showAllSubCategory()}
                  </div>
                </div>
              </div>
            </section>
          </Box>
        </div>
      </div>

      <div style={{ marginTop: 120, marginLeft: 220 }}>
        <Box>
          <div style={{ width: "300px", padding: 10, paddingBottom: 15, paddingLeft: 10, paddingRight: 10, paddingTop: 20, borderRadius: '30px', border: '2px solid #e0e0e0' }}>
            <div style={{ fontWeight: 900, fontSize: '24px', letterSpacing: '-0.72px', lineHeight: 1 }}>Filters</div>
            <div style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-0.72px', lineHeight: 3 }}>Availability</div>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Include Out Of Stock" />
              <Divider style={{ width: "90%", marginTop: '5%' }} />
              <div style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-0.72px', lineHeight: 3 }}>Categories</div>
              <FormControlLabel control={<Checkbox />} label="Breakfast & Snack Mixes" />
              <FormControlLabel control={<Checkbox />} label="Canned Food" />
              <FormControlLabel control={<Checkbox />} label="Chikki" />
              <FormControlLabel control={<Checkbox />} label="Chips & Corn Snacks" />
              <FormControlLabel control={<Checkbox />} label="Choco & Nut Spread" />
              <div style={{ color: '#0c5273', fontWeight: 'bold', backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none', borderWidth: '1px', minHeight: '2em', padding: '4px 16px' }}>+45 More</div>
              <Divider style={{ width: '90%', marginTop: '5%' }} />
              <div style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-0.72px', lineHeight: 3 }}>Brand</div>
              <FormControlLabel control={<Checkbox />} label="90's Mill" />
              <FormControlLabel control={<Checkbox />} label="9GRAMS" />
              <FormControlLabel control={<Checkbox />} label="ADD ME" />
              <FormControlLabel control={<Checkbox />} label="APLENTY" />
              <FormControlLabel control={<Checkbox />} label="BEVZILLA" />
              <div style={{ color: '#0c5273', fontWeight: 'bold', backgroundColor: 'rgba(0, 0, 0, 0)', border: 'none', borderWidth: '1px', minHeight: '2em', padding: '4px 16px' }}>+45 More</div>
              <Divider style={{ width: '90%', marginTop: '5%' }} />
              <div style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-0.72px', lineHeight: 3 }}>Price</div>

              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />

              <Divider style={{ width: '90%', marginTop: '5%' }} />
              <div style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-0.72px', lineHeight: 3 }}>Discount</div>

              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}

              />

              <Divider style={{ width: '90%', marginTop: '5%' }} />


            </FormGroup>
          </div>
        </Box>


      </div>

    </Grid>




  )




}

