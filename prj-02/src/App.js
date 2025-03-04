import { Provider, useSelector } from "react-redux";
import  store  from "./redux/store";
import { Route, BrowserRouter , Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Adminpage from "./pages/Adminpage";
import Userpage from "./pages/Userpage";
import Distributor from "./pages/Distributor";
import Retail from "./pages/RetailList";
import Transactions from "./pages/Transactions";
import Margin from "./pages/Margin";
import KYCApproval from "./pages/KYCApproval";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./Components/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Content from "./pages/Content";
import AddDistributor from "./pages/AddDistributor";
import GetDistributor from "./pages/GetDistributor";
import DistributorDetails from "./pages/DistributorDetails";
const RequireAuth = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return ( 
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/unauthorized" element={<Unauthorized/>}/>

          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['distributor', "superadmin"]}><Dashboard /></ProtectedRoute>}>
            <Route index={true} element={<ProtectedRoute allowedRoles={["distributor","superadmin"]}><Content/></ProtectedRoute>}/>
            <Route path="distributor" element={<ProtectedRoute allowedRoles={["distributor","superadmin"]}><Distributor/></ProtectedRoute>}/>
            <Route path="retail" element={<ProtectedRoute allowedRoles={["distributor","superadmin"]}><Retail/></ProtectedRoute>}/>
            <Route path="transactions" element={<ProtectedRoute allowedRoles={["distributor","superadmin"]}><Transactions/></ProtectedRoute>}/>
            <Route path="margin" element={<ProtectedRoute allowedRoles={["distributor","superadmin"]}><Margin/></ProtectedRoute>}/>
            <Route path="approval" element={<ProtectedRoute allowedRoles={["distributor","superadmin"]}><KYCApproval/></ProtectedRoute>}>
            <Route index={true} element={<GetDistributor/>}/>
            <Route path="getDistributor/:id" element={<DistributorDetails/>}/>
            <Route path="addDistributor" element={<AddDistributor/>}/>
            </Route>
            <Route path="settings" element={<ProtectedRoute allowedRoles={["superadmin"]}><Settings/></ProtectedRoute>}/>
            <Route path="profile" element={<ProtectedRoute allowedRoles={["distributor","superadmin"]}><Profile/></ProtectedRoute>}/>
            <Route path="register" element={<ProtectedRoute allowedRoles={["distributor","superadmin"]}><Register/></ProtectedRoute>}/>

          </Route>
          <Route path="/admin" element={<ProtectedRoute  allowedRoles={["superadmin"]}><Adminpage/></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute  allowedRoles={["distributor"]} ><Userpage/></ProtectedRoute>} />

        </Routes>
      
  );
}

export default App;
