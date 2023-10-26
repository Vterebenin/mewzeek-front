import TheButton from "@/components/common/TheButton";
import { PATHS } from "@/router";
import userStore from "@/stores/userStore";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const { user, logout } = userStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate(PATHS.BASE);
  };
  return (
    <div className="flex justify-between items-center my-5 max-w-[1280px] mx-auto">
      <Link to={PATHS.BASE}>Mewzeek</Link>
      <div className="flex gap-5">
        {user ? (
          <TheButton onClick={() => handleLogout()}>Logout</TheButton>
        ) : (
          <>
            <TheButton to={PATHS.SIGN_IN}>Sign In</TheButton>
            <TheButton to={PATHS.SIGN_UP}>Sign Up</TheButton>
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
