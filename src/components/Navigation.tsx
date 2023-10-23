import TheButton from "@/components/common/TheButton";
import { PATHS } from "@/router";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="flex justify-between items-center my-5 max-w-[1280px] mx-auto">
      <Link to={PATHS.BASE}>Mewzeek</Link>
      <div className="flex gap-5">
        <TheButton to={PATHS.SIGN_IN}>Sign In</TheButton>
        <TheButton to={PATHS.SIGN_UP}>Sign Up</TheButton>
      </div>
    </div>
  );
}

export default Navigation;
