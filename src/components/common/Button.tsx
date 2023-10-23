import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center my-5 max-w-[1280px] mx-auto">
      <div>Mewzeek</div>
      <div>
        <Button to="/login">Sign In</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  );
}

export default Navigation;
