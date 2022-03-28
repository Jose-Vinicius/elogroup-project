import { BrowserRouter, Route, Routes, } from "react-router-dom";
import { CreateLeads } from "../pages/CreateLeads";
import { Leads } from "../pages/Leads";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export function AppRoutes() {
    return(
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/leads" element={<Leads />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/createLeads" element={<CreateLeads />}></Route>
          </Routes>
      </BrowserRouter>
      
    );
  }