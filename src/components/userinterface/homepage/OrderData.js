import  React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getData,postData } from '../../../services/FetchNodeAdminServices'; 
import { useSelector, useDispatch } from 'react-redux';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function OrderData({ refresh,setRefresh }) {
  const [orders, setOrders] = useState([]);
   var user = useSelector((state) => state?.user)
   var userData = Object.values(user)
  console.log("USSSSEERR:", userData)

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await postData('userinterface/display_order'); 
      if (response?.status) {
        setOrders(response.data);
      }
    };

    fetchOrders();
  }, [refresh]);

   const handleDeliveryStatusChange = async (newStatus, userId) => {
    const body = { userid: userId, deliverystatus: newStatus };
    const result = await postData('userinterface/update_delivery_status', body);
    if (result.status) {
      setOrders((prev) =>
        prev.map((item) =>
          item.userid === userId ? { ...item, deliverystatus: newStatus } : item
        )
      );
    } else {
      alert("Failed to update delivery status");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
           
              <StyledTableCell align="center">User ID</StyledTableCell>
            <StyledTableCell align="center">Product ID</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Mobile No.</StyledTableCell>
            <StyledTableCell align="center">Email Address</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Payment Status</StyledTableCell>
            <StyledTableCell align="center">Delivery Status</StyledTableCell>
            <StyledTableCell>Order Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row, index) => (
            <StyledTableRow key={index}>
             
                <StyledTableCell align="center">{row.userid}</StyledTableCell>
              <StyledTableCell align="center">{row.productdetailid}</StyledTableCell>
              <StyledTableCell align="center">{row.qty}</StyledTableCell>
             <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.mobileno}</StyledTableCell>
              <StyledTableCell align="center">{row.emailaddress}</StyledTableCell>
              <StyledTableCell align="center">{row.address}</StyledTableCell>
              <StyledTableCell align="center">{row.paymentstatus}</StyledTableCell>
               <StyledTableCell align="center">
                <select
                  value={row.deliverystatus}
                  onChange={(e) => handleDeliveryStatusChange(e.target.value, row.userid)}
                  
                  style={{ padding: '4px 8px', borderRadius: 4 }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </StyledTableCell>
              <StyledTableCell align="center">{row.orderdate}</StyledTableCell>
           
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
