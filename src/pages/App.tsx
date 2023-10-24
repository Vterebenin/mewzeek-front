import Navigation from "@/components/Navigation";
import { Outlet } from "react-router-dom";
import { createStandaloneToast } from "@chakra-ui/react";

function App() {
  const { ToastContainer } = createStandaloneToast();
  return (
    <>
      <div className="min-h-[100vh]">
        <Navigation />
        <Outlet />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
