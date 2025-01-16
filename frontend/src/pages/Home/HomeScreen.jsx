import React from "react";
import { useAuthStore } from "../../store/authUser.js";

const HomeScreen = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      <h1>General Home Page</h1>

      <button onClick={logout}>LogOut</button>
    </div>
  );
};

export default HomeScreen;
