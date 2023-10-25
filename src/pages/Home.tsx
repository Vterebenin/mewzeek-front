import http from "@/api/http";
import { User } from "@/vite-env";
import { useEffect, useState } from "react";

function Home() {
  const [user, setUser] = useState<User>();
  const getUser = async () => {
    const { data } = await http.get("users/me");
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      {user && (
        <>
          <div>{user.email}</div>
          <div>{user.email}</div>
          <div>{user.email}</div>
        </>
      )}
    </>
  );
}

export default Home;
