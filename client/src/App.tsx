import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import SharedBrain from "./components/SharedBrain";

const queryClient = new QueryClient(); 


function App(){
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home /> }></Route>
          <Route path="/signin" element={ <SignIn />} />
          <Route path="/signup" element={ <SignUp />} />
          <Route path="/dashboard" element={ <Dashboard />} />
        
          <Route path="/brain/:shareLink" element={<SharedBrain />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;