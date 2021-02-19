import React from "react";
import { format, isSameDay, parseISO } from "date-fns";

const dateListFormat = "d-M-yyyy";
const displayFormat = "HH:mm";

const StreamDisplay = (props) => {
  const handleAddNew = (event) => {
    props.setGame("");
    props.setStart("");
    props.setEnd("");
    props.setDesc("");
    props.setAdd(true);
  };

  const handleEdit = (obj) => {
    console.log(obj);
    props.setGame(obj.game);
    props.setStart(obj.start.slice(0, 5));
    props.setEnd(obj.end.slice(0, 5));
    props.setDesc(obj.desc);
    props.setEdit(true);
  };

  const setData = (obj) => {
    props.setGame(obj.game);
    props.setStart(format(parseISO(obj.start), displayFormat));
    props.setEnd(format(parseISO(obj.end), displayFormat));
    props.setDesc(obj.desc);
    console.log(props.game, props.start, props.end);
  };

  return (
    <div className="stream-list">
      <p>{format(props.date, dateListFormat)}</p>
      {props.events.map((e) => {
        return (
          <div>
            <button onClick={() => handleEdit(e)}>{e.game}</button>
          </div>
        );

        return null;
      })}
      <button
        type="button"
        onClick={handleAddNew}
        className="btn btn-outline-primary"
      >
        +
      </button>
    </div>
  );
};

export default StreamDisplay;
