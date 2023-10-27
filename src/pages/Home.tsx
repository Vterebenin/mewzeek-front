import TheButton from "@/components/common/TheButton";
import { PATHS } from "@/const/general";
import userStore from "@/stores/userStore";
import { useEffect } from "react";

function Home() {
  const { user, getUser } = userStore();
  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <>
      {user && (
        <>
          <div>
            <div>Profile</div>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.createdAt}</div>
          </div>
          <div>
            <TheButton to={PATHS.LAB}>Go to lab</TheButton>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
