import React, { useState, useEffect } from "react";
import EventForm from "./RecurringForm.js";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [addRecurring, setAddRecurring] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [game, setGame] = useState("");
  const [desc, setDesc] = useState("");
  const [events, setEvents] = useState("");
  const [eventId, setEventId] = useState("");

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
    </div>
  );
};

export default Profile;
