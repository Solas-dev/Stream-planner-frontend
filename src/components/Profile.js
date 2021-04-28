import React, { useState } from "react";
import AuthService from "../services/auth.service";

import * as uuidAPIKey from "uuid-apikey";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [key, setKey] = useState();
  var createKey = () => {
    setKey();
    AuthService.addKey(uuidAPIKey.create().uuid, currentUser.id);
  };
  console.log(key);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <button onClick={createKey}>
        {key ? "Generate new key" : "Generate key"}
      </button>
      {key ? (
        <div>
          <p>{key.apiKey} </p>
          <p>Make note of this key</p>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
