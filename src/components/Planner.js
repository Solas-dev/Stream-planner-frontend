import React, { useState } from "react";
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

const isoYearFormat = "yyyy-MM-dd";
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
  // const [events, setEvents] = useState("");
  const [eventId, setEventId] = useState("");

  // const [content, setContent] = useState("");
  const currentdate = new Date();

  let monthStart = startOfMonth(date);
  let monthEnd = endOfMonth(date);
  let dayOfMonthStart = getDay(monthStart);
  const style = { gridColumnStart: dayOfMonthStart };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let daysOfMonth = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  //Handle Click function

  function handleClick(x) {
    if (on === true && isSameDay(x, selectedDate)) {
      setOn(false);
      setSelectedDate("");
      setEventId("");
    } else if (on === true && !isSameDay(x, selectedDate)) {
      setSelectedDate(x);
      setSelectedDateSimple(format(x, isoYearFormat));
      setEventId("");
    } else {
      setOn(true);
      setSelectedDate(x);
      setSelectedDateSimple(format(x, isoYearFormat));
      setEventId("");
    }
  }

  function prevMonth() {
    setDate(subMonths(date, 1));
  }

  function nextMonth() {
    setDate(addMonths(date, 1));
  }

  // useEffect(() => {
  //   EventService.getUserEvents(props.user.id).then((res) => {
  //     props.setEvents(res);
  //   });
  // }, [props.updateEvent]);

  return (
    <div className="d-xl-flex">
      <div className="calendar-container text-millblack">
        {" "}
        <div className="month">
          <button
            type="button"
            onClick={prevMonth}
            className="btn btn-outline-millblack"
          >
            <span className="sr-only">Previous Month</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </button>{" "}
          <h1 className="month-name">{format(date, monthFormat)}</h1>
          <button
            type="button"
            onClick={nextMonth}
            className="btn btn-outline-primary arrow-button"
          >
            <span className="sr-only">Next Month</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </button>
        </div>
        <div className="calendar">
          <div className="days-of-week">
            {daysOfWeek.map((day) => {
              return (
                <span className="px-lg-5 px-md-4 px-2 text-center">{day}</span>
              );
            })}
          </div>
          <div className="calendar-blocks">
            {daysOfMonth.map((x, i) => {
              return (
                <div
                  className={
                    isSameDay(x, selectedDate)
                      ? "position-relative btn-millyell date selected py-lg-5 p-md-4 p-3 text-center"
                      : isSameDay(x, currentdate)
                      ? "position-relative btn-milllgrey date current py-lg-5 p-md-4 p-3 text-center"
                      : "position-relative btn-milllgrey date py-lg-5 p-md-4 p-3 text-center"
                  }
                  style={i === 0 ? style : {}}
                  // style={{ height: "120px" }}
                  onClick={() => {
                    handleClick(x);
                  }}
                >
                  <span
                    className="date-value position-absolute"
                    style={{ left: 5, top: 2 }}
                  >
                    {format(x, dateFormat)}
                  </span>
                  {props.events.map((e) => {
                    return e.date === format(x, isoYearFormat) ? (
                      <span className="calendar-events">
                        <svg
                          className=" d-md-inline"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          class="bi bi-exclamation"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z" />
                        </svg>
                      </span>
                    ) : null;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="container row" style={{ right: 100 }}>
        {on ? (
          <StreamDisplay
            date={selectedDate}
            add={editEvent}
            setEdit={setEditEvent}
            setAdd={setAddEvent}
            events={props.events}
            setEvents={props.setEvents}
            game={game}
            desc={desc}
            start={start}
            end={end}
            setGame={setGame}
            setDesc={setDesc}
            setStart={setStart}
            setEnd={setEnd}
            eventId={eventId}
            setEventId={setEventId}
            selectedDateISO={selectedDateSimple}
            user={props.user}
            updateEvent={props.updateEvent}
            setUpdateEvent={props.setUpdateEvent}
          />
        ) : null}
      </div>

      {addEvent ? (
        <div className="overlay">
          <div
            className="stream-form rounded"
            style={{ top: 200, width: "40%", padding: 30 }}
          >
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
              setEvents={props.setEvents}
              setUpdateEvent={props.setUpdateEvent}
            />
          </div>
        </div>
      ) : editEvent ? (
        <div className="overlay">
          <div
            className="stream-form rounded"
            style={{ top: 200, width: "40%", padding: 30 }}
          >
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
              eventId={eventId}
              // forceUpdate={forceUpdate}
              userId={props.user.id}
              // eventscall={eventscall}
              setSelectedDate={setSelectedDate}
              setUpdateEvent={props.setUpdateEvent}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Planner;

//
// {displayType == "week"
//   ? sortedEvents.map((d, i) => {
//       if (isThisWeek(new Date(d.date), { weekStartsOn: 1 })) {
//         return (
//           <div className="m-2 py-1 col-md-2 text-center bg-millyell rounded">
//             <p className="m-0">{format(new Date(d.date), "EEEE")}</p>
//             <p className="m-0">Game: {d.game ? d.game : "TBD"}</p>
//             {d.end ? (
//               <p className="m-0">
//                 {d.start.slice(0, 5) + " - " + d.end.slice(0, 5)}{" "}
//               </p>
//             ) : (
//               <p className="m-0">Start: {d.start.slice(0, 5)}</p>
//             )}
//           </div>
//         );
//       }
//     })
//   : displayType == "month"
//   ? sortedEvents.map((d, i) => {
//       if (isThisMonth(new Date(d.date), { weekStartsOn: 1 })) {
//         return (
//           <div className="m-2 py-1 col-md-2 text-center bg-millyell rounded ">
//             {deleteItems ? (
//               <Formik
//                 initialValues={{
//                   delete: [],
//                 }}
//                 onSubmit={(values) => {
//                   console.log(values.value);
//                 }}
//                 render={() => (
//                   <Form>
//                     <Field type="checkbox" name="delete" value={d.id} />
//                   </Form>
//                 )}
//               />
//             ) : (
//               // <input type="checkbox" id={d.id} value={d.id}></input>
//               ""
//             )}
//
//             <p className="m-0">{format(new Date(d.date), "do")}</p>
//             <p className="m-0">Game: {d.game ? d.game : "TBD"}</p>
//             {d.end ? (
//               <p className="m-0">
//                 {d.start.slice(0, 5) + " - " + d.end.slice(0, 5)}{" "}
//               </p>
//             ) : (
//               <p className="m-0">Start: {d.start.slice(0, 5)}</p>
//             )}
//           </div>
//         );
//       }
//     })
//   : null}
// </div>
//
//

//FORMIK FOR TEST

// <Formik
//   initialValues={{
//     delete: [],
//   }}
//   onSubmit={(values) => {
//     console.log(values.value);
//   }}
//   render={() => (
//
//   )}
// />
