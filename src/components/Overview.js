import React, { useState, useEffect } from "react";
import EventForm from "./RecurringForm.js";
import AuthService from "../services/auth.service";
import EventService from "../services/event.service";
import {
  isThisWeek,
  isThisMonth,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
  format,
} from "date-fns";

const Overview = (props) => {
  const currentUser = AuthService.getCurrentUser();
  const [addRecurring, setAddRecurring] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [game, setGame] = useState("");
  const [desc, setDesc] = useState("");
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [displayType, setDisplayType] = useState("week");

  var previousEvent;
  var currentEvent;

  var sortedEvents = props.events.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const handleEdit = (obj) => {
    props.setGame(obj.game);
    props.setStart(obj.start.slice(0, 5));
    props.setEnd(obj.end.slice(0, 5));
    props.setDesc(obj.description);
    props.setEventId(obj.id);
    props.setEdit(true);
  };

  const flashMessage = (message) => {
    setAlert(true);
    setMessage(message);
    setTimeout(() => {
      setAlert(false);
    }, 400);
  };

  const handleDelete = (obj) => {
    props.setUpdateEvent(true);
    EventService.deleteEvent(obj.id).then((r) => {
      setTimeout(() => {
        props.setUpdateEvent(false);
      }, 300);

      flashMessage(r.message);
    });
  };

  return (
    <div className="container">
      <header className="jumbotron text-center">
        <h3>Welcome to your event overview!</h3>
      </header>
      <div className="d-flex">
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
        </div>
      </div>
      <div className="row my-4">
        {displayType == "week"
          ? sortedEvents.map((d, i) => {
              if (isThisWeek(new Date(d.date), { weekStartsOn: 1 })) {
                return (
                  <div className="m-2 py-1 col-md-2 text-center bg-millyell rounded">
                    <p className="m-0">{format(new Date(d.date), "EEEE")}</p>
                    <p className="m-0">Game: {d.game}</p>
                    <p className="m-0">Start: {d.start.slice(0, 5)}</p>
                    <p className="m-0">
                      {d.end === null ? "" : "End: " + d.end.slice(0, 5)}
                    </p>
                  </div>
                );
              }
            })
          : displayType == "month"
          ? sortedEvents.map((d, i) => {
              if (isThisMonth(new Date(d.date), { weekStartsOn: 1 })) {
                return (
                  <div className="m-2 py-1 col-md-2 text-center  bg-millyell rounded">
                    <p className="m-0">{format(new Date(d.date), "do")}</p>
                    <p className="m-0">{d.game}</p>
                    <p className="m-0">{d.start.slice(0, 5)}</p>
                  </div>
                );
              }
            })
          : null}
      </div>

      {addRecurring ? (
        <div className="overlay">
          <div
            className="stream-form rounded "
            style={{ top: 200, padding: 30 }}
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
              setAddEvent={props.setAddEvent}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
//
//
//
//
// {sortedEvents.map((d, i) => {
//   return (
//     <div className="">
//       <p className="my-0 ">{d.date}</p>
//       <div className="btn-group my-2" role="group">
//         <button
//           className="btn btn-outline-dark"
//           disabled={props.updateEvent}
//           onClick={() => handleEdit(d)}
//         >
//           {d.game} {d.start.slice(0, 5)} - {d.end.slice(0, 5)}
//         </button>
//         <button
//           className="btn btn-danger py-0 px-1"
//           disabled={props.updateEvent}
//           onClick={() => handleDelete(d)}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             fill="currentColor"
//             class="bi bi-trash"
//             viewBox="0 0 16 16"
//           >
//             <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
//             <path
//               fill-rule="evenodd"
//               d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// })}

export default Overview;
