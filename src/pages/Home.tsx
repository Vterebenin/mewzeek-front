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
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.createdAt}</div>
        </>
      )}
    </>
  );
}

export default Home;
