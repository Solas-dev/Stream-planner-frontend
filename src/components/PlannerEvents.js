import React, { useState } from "react";
import { format, isSameDay, parseISO } from "date-fns";
import EventService from "../services/event.service";
import Alert from "react-bootstrap/Alert";

const dateListFormat = "d-M-yyyy";
const displayFormat = "HH:mm";

const StreamDisplay = (props) => {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddNew = (event) => {
    props.setGame("");
    props.setStart("");
    props.setEnd("");
    props.setDesc("");
    props.setAdd(true);
  };

  const handleEdit = (obj) => {
    props.setGame(obj.game);
    props.setStart(obj.start.slice(0, 5));
    obj.end === null ? props.setEnd("") : props.setEnd(obj.end.slice(0, 5));
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
    <div className="d-flex flex-column stream-list mt-3 rounded p-4 mx-auto">
      <p className="h5 text-center">
        <u>{format(props.date, dateListFormat)}</u>
      </p>
      {props.events.map((e) => {
        return e.date === props.selectedDateISO ? (
          <div className="d-flex">
            <div className="btn-group my-1" role="group">
              <button
                className="btn btn-outline-dark"
                disabled={props.updateEvent}
                onClick={() => handleEdit(e)}
              >
                {e.game} {e.start.slice(0, 5)}
                {e.end === null ? "" : "-" + e.end.slice(0, 5)}
              </button>
              <button
                className="btn btn-danger py-0 px-1"
                disabled={props.updateEvent}
                onClick={() => handleDelete(e)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : null;
      })}
      <button
        type="button"
        disabled={props.updateEvent}
        onClick={handleAddNew}
        className="btn btn-outline-dark py-0 px-2 my-2"
      >
        +
      </button>
      {alert && <div className="btn btn-danger py-0 px-1 ">{message}</div>}
    </div>
  );
};

export default StreamDisplay;
