import React, { useState } from "react";
import EventForm from "./RecurringForm.js";
import EventView from "./EventView.js";
import AuthService from "../services/auth.service";
// import EventService from "../services/event.service";

const Overview = (props) => {
  const currentUser = AuthService.getCurrentUser();
  const [addRecurring, setAddRecurring] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [game, setGame] = useState("");
  const [desc, setDesc] = useState("");
  // const [alert, setAlert] = useState(false);
  // const [message, setMessage] = useState("");
  const [displayType, setDisplayType] = useState("week");
  const [deleteItems, setDeleteItems] = useState(false);
  const [deleteArray, setDeleteArray] = useState([]);

  var sortedEvents = props.events.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // const handleEdit = (obj) => {
  //   props.setGame(obj.game);
  //   props.setStart(obj.start.slice(0, 5));
  //   props.setEnd(obj.end.slice(0, 5));
  //   props.setDesc(obj.description);
  //   props.setEventId(obj.id);
  //   props.setEdit(true);
  // };

  // const flashMessage = (message) => {
  //   setAlert(true);
  //   setMessage(message);
  //   setTimeout(() => {
  //     setAlert(false);
  //   }, 400);
  // };
  //
  // const handleDelete = (obj) => {
  //   props.setUpdateEvent(true);
  //   EventService.deleteEvent(obj.id).then((r) => {
  //     setTimeout(() => {
  //       props.setUpdateEvent(false);
  //     }, 300);
  //
  //     flashMessage(r.message);
  //   });
  // };

  return (
    <div className="container">
      <header className="jumbotron text-center">
        <h3>Welcome to your event overview!</h3>
      </header>
      <div className="d-flex flex-column-reverse flex-sm-row">
        <div className="btn-group my-2 mr-auto" role="group">
          <button
            className="btn btn-outline-dark"
            onClick={() => setDisplayType("week")}
          >
            This Week
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() => setDisplayType("month")}
          >
            This Month
          </button>
        </div>
        <div className="my-2">
          <button
            className="btn btn-outline-dark"
            onClick={() => setAddRecurring(!addRecurring)}
          >
            Add Recurring events
          </button>
          <button
            className={deleteItems ? "btn btn-dark" : "btn btn-outline-dark"}
            onClick={() => setDeleteItems(!deleteItems) && setDeleteArray([])}
          >
            Delete Items
          </button>
          <p>{deleteArray}</p>
        </div>
      </div>

      <EventView
        deleteItems={deleteItems}
        setDeleteItems={setDeleteItems}
        addRecurring={addRecurring}
        displayType={displayType}
        sortedEvents={sortedEvents}
        setUpdateEvent={props.setUpdateEvent}
      />

      {addRecurring ? (
        <div className="overlay">
          <div
            className="stream-form rounded"
            // style={{ top: 200, padding: 30 }}
          >
            <EventForm
              game={game}
              desc={desc}
              start={start}
              end={end}
              setGame={setGame}
              setDesc={setDesc}
              setStart={setStart}
              setEnd={setEnd}
              setAddRecurring={setAddRecurring}
              userId={currentUser.id}
              setUpdateEvent={props.setUpdateEvent}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Overview;
