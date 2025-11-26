 
import { BrowserRouter as  Router,Route,Routes } from "react-router-dom";
 
import AdminLogin from "./components/admin/adminlogin/AdminLogin";
import Dashboard from "./components/admin/adminlogin/Dashboard";
import HomePage from "./components/userinterface/homepage/HomePage";
import PageCategoryDisplay from "./components/userinterface/homepage/PageCategoryDisplay"
import ProductDetailsPage from "./components/userinterface/homepage/ProductDetailsPage";
import Cart from "./components/userinterface/homepage/Cart"
import SignIn from "./components/userinterface/homepage/SignIn";
import OTP from "./components/userinterface/homepage/OTP"
import UserRegistration from "./components/userinterface/homepage/UserRegistration"
import MakePayment from "./components/userinterface/homepage/MakePayment";
import EmptyPage from "./components/userinterface/homepage/EmptyPage"
 
import OrderData from "./components/userinterface/homepage/OrderData"

function App() {
  return (
    <div>
  
    <Router>
      <Routes>
         
        <Route element={<AdminLogin/>} path="/adminlogin"></Route>
        <Route element={<Dashboard/>} path="/dashboard/*"></Route>
        <Route element={<HomePage/>} path="/homepage"></Route>
        <Route element={<PageCategoryDisplay/>} path="/pagecategorydisplay"></Route>
        <Route element={<ProductDetailsPage/>} path="/productdetailspage"></Route>
        <Route element={<Cart/>} path="/cart"></Route>
        <Route element={<SignIn/>} path="/signin"></Route>
        <Route element={<OTP/>} path="/otp"></Route>
        <Route element={<UserRegistration/>} path="/userregistration"></Route>
        <Route element={<MakePayment/>} path="/makepayment"></Route>
        <Route element={<EmptyPage/>} path="/emptypage"></Route>
 
        <Route element={<OrderData/>} path="/orderdata"></Route>
 
      </Routes>
    </Router>
   

    </div>

  
  );
  
}

export default App;

 