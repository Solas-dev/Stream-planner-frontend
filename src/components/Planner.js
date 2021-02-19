import React, { useState, useEffect } from "react";
import EventForm from "./PlannerForm.js";
import StreamDisplay from "./PlannerEvents.js";

import {
  format,
  startOfMonth,
  getDay,
  eachDayOfInterval,
  endOfMonth,
  isSameDay,
  subMonths,
  addMonths,
} from "date-fns";

import AuthService from "../services/auth.service";
import EventService from "../services/event.service";

const isoYearFormat = "yyyy-MM-d";
const dateFormat = "do";
const monthFormat = "MMMM y";
// const mySqlFormat = "y-MM-dd HH:mm:ss";

// const useForceUpdate = () => useState()[1];

//########## CORE SECTION ##########//

const Planner = (props) => {
  const [date, setDate] = useState(new Date());
  const [on, setOn] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [editEvent, setEditEvent] = useState(false);
  const [addEvent, setAddEvent] = useState(false);

  const [selectedDateSimple, setSelectedDateSimple] = useState(
    format(new Date(), isoYearFormat)
  );
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [game, setGame] = useState("");
  const [desc, setDesc] = useState("");
  const [events, setEvents] = useState("");

  // const [content, setContent] = useState("");
  const currentdate = new Date();

  let monthStart = startOfMonth(date);
  let monthEnd = endOfMonth(date);
  let dayOfMonthStart = getDay(monthStart);
  const style = { gridColumnStart: dayOfMonthStart };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let y = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  //Handle Click function

  function handleClick(x) {
    if (on === true && isSameDay(x, selectedDate)) {
      setOn(false);
      setSelectedDate("");
    } else if (on === true && !isSameDay(x, selectedDate)) {
      setSelectedDate(x);
      setSelectedDateSimple(format(x, isoYearFormat));
    } else {
      setOn(true);
      setSelectedDate(x);
      setSelectedDateSimple(format(x, isoYearFormat));
    }
  }

  function prevMonth() {
    setDate(subMonths(date, 1));
  }

  function nextMonth() {
    setDate(addMonths(date, 1));
  }
  //
  // var eventscall = () => {
  //   EventService.getUserEvents(userId, selectedDateSimple).then((res) => {
  //     console.log(res);
  //     setEvents(res);
  //   });
  // };

  // eventscall();

  // const forceUpdate = useForceUpdate();
  //
  useEffect(() => {
    // console.log(selectedDateSimple);
    // console.log(props.user);
    EventService.getUserEvents(props.user.id, selectedDateSimple).then(
      (res) => {
        // console.log(res);
        setEvents(res);
        // console.log(events);
      }
    );
  }, [selectedDate]);

  useEffect(() => {
    // console.log(events);
    // setOn(true);
  }, []);

  useEffect(() => {
    // console.log(userId);
    // const user = AuthService.getCurrentUser();
    // setUserId(user.id);
  }, []);

  return (
    <div className="planner-page row">
      <div className="calendar-container col ">
        {" "}
        <div className="month">
          <button
            type="button"
            onClick={prevMonth}
            className="btn btn-outline-primary"
          >
            Prev
          </button>{" "}
          <h1 className="month-name">{format(date, monthFormat)}</h1>
          <button
            type="button"
            onClick={nextMonth}
            className="btn btn-outline-primary button"
          >
            Next
          </button>
        </div>
        <div className="calendar">
          <div className="days-of-week">
            {daysOfWeek.map((day) => {
              return <span className="day-name">{day}</span>;
            })}
          </div>
          <div className="calendar-blocks">
            {y.map((x, i) => {
              return (
                <button
                  className={
                    isSameDay(x, selectedDate)
                      ? "btn btn-outline-secondary date selected"
                      : isSameDay(x, currentdate)
                      ? "btn btn-outline-secondary date current"
                      : "btn btn-outline-secondary date"
                  }
                  style={i === 0 ? style : {}}
                  onClick={() => {
                    handleClick(x);
                  }}
                >
                  {format(x, dateFormat)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="col">
        {on ? (
          <StreamDisplay
            date={selectedDate}
            add={editEvent}
            setEdit={setEditEvent}
            setAdd={setAddEvent}
            events={events}
            game={game}
            desc={desc}
            start={start}
            end={end}
            setGame={setGame}
            setDesc={setDesc}
            setStart={setStart}
            setEnd={setEnd}
          />
        ) : null}
      </div>

      {addEvent ? (
        <div className="stream-form">
          <EventForm
            date={selectedDateSimple}
            addEvent={addEvent}
            setAdd={setAddEvent}
            setEdit={setEditEvent}
            game={game}
            desc={desc}
            start={start}
            end={end}
            setGame={setGame}
            setDesc={setDesc}
            setStart={setStart}
            setEnd={setEnd}
            // forceUpdate={forceUpdate}
            userId={props.user.id}
            // eventscall={eventscall}
            setSelectedDate={setSelectedDate}
          />
        </div>
      ) : editEvent ? (
        <div className="stream-form">
          <EventForm
            date={selectedDateSimple}
            editEvent={editEvent}
            addEvent={addEvent}
            setAdd={setAddEvent}
            setEdit={setEditEvent}
            game={game}
            desc={desc}
            start={start}
            end={end}
            setGame={setGame}
            setDesc={setDesc}
            setStart={setStart}
            setEnd={setEnd}
            // forceUpdate={forceUpdate}
            userId={props.user.id}
            // eventscall={eventscall}
            setSelectedDate={setSelectedDate}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Planner;
