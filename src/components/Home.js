import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Welcome to millPlan!</h3>
      </header>
      <p>This is a simple planner focused on streaming</p>
    </div>
  );
};

export default Home;
