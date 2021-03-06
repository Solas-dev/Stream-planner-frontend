import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { isBefore } from "date-fns";
import EventService from "../services/event.service";

const EventForm = (props) => {
  const EventFormSchema = Yup.object().shape({
    game: Yup.string().required("A game title is required!"),
    desc: Yup.string().max(400, "Description cannot be longer than 400 char"),
    start: Yup.string().required("A start time is required!"),
    end: Yup.string().test(
      "start_time_test",
      "End time cannot be before start time!",
      function (value) {
        const { start } = this.parent;
        const { date } = this.parent;
        if (value === undefined) {
          return true;
        }
        return isBefore(
          new Date(date + " " + start),
          new Date(date + " " + value)
        );
      }
    ),
  });

  const handleFormClose = () => {
    props.setAdd(false);
    props.setEdit(false);
  };

  return (
    <Formik
      initialValues={{
        game: props.game,
        desc: props.desc,
        date: props.date,
        start: props.start,
        start1: "",
        start2: "",
        end: props.end,
      }}
      validationSchema={EventFormSchema}
      onSubmit={(values) => {
        if (props.addEvent && values.end !== "") {
          console.log(values.end);
          EventService.addEvent(
            values.game,
            values.desc,
            values.date,
            values.start + ":00",
            values.end + ":00",
            props.userId
          )
            .then((r) => {
              setTimeout(() => {
                props.setUpdateEvent(true);
                props.setUpdateEvent(false);
              }, 200);
              props.setAdd(false);
            })
            .catch("Something went wrong");
        } else if (props.addEvent) {
          // console.log("EMPTY");
          EventService.addEvent(
            values.game,
            values.desc,
            values.date,
            values.start + ":00",
            null,
            props.userId
          )
            .then((r) => {
              setTimeout(() => {
                props.setUpdateEvent(true);
                props.setUpdateEvent(false);
              }, 200);
              props.setAdd(false);
            })
            .catch("Something went wrong");
        } else if (props.editEvent && values.end !== "") {
          EventService.updateEvent(
            values.game,
            values.desc,
            values.date,
            values.start + ":00",
            values.end + ":00",
            props.eventId
          ).then(() => {
            setTimeout(() => {
              props.setUpdateEvent(true);
              props.setUpdateEvent(false);
            }, 200);
            props.setEdit(false);
          });
        } else if (props.editEvent) {
          EventService.updateEvent(
            values.game,
            values.desc,
            values.date,
            values.start + ":00",
            null,
            props.eventId
          ).then(() => {
            setTimeout(() => {
              props.setUpdateEvent(true);
              props.setUpdateEvent(false);
            }, 200);
            props.setEdit(false);
          });
        }
      }}
      render={({ errors, status, touched }) => (
        <Form className="text-center">
          <h2 className="pb-4">
            <u>Planner Form</u>
          </h2>
          <div className="form-group">
            <label htmlFor="game">Game</label>
            <Field
              type="text"
              className="form-control w-75 mx-auto"
              name="game"
            />
            {errors.game && touched.game ? (
              <div className="alert alert-danger w-75 mx-auto">
                {errors.game}
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <Field
              type="text"
              className="form-control w-75 mx-auto"
              name="desc"
            />
          </div>
          <div className="form-group">
            <label htmlFor="start">Start Time</label>
            <Field
              type="time"
              className="form-control w-75 mx-auto"
              name="start"
            />
            {errors.start && touched.start ? (
              <div className="alert alert-danger w-75 mx-auto">
                {errors.start}
              </div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="end">End Time</label>
            <Field
              type="time"
              className="form-control w-75 mx-auto"
              name="end"
            />
            {errors.end && touched.end ? (
              <div className="alert alert-danger">{errors.end}</div>
            ) : null}
          </div>
          <div className="form-group text-center">
            {props.addEvent ? (
              <button type="submit" className="btn btn-millyell my-1 w-75">
                Add event
              </button>
            ) : (
              <button type="submit" className="btn btn-millyell my-1 w-75">
                Update event
              </button>
            )}
            {props.addEvent ? (
              <button
                type="button"
                className="btn btn-secondary w-75"
                onClick={handleFormClose}
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary w-75"
                onClick={handleFormClose}
              >
                Close
              </button>
            )}
          </div>
        </Form>
      )}
    />
  );
};

// <div className="form-group">
//   <label htmlFor="start1">Start Time</label>
//   <div className="d-flex flex-row w-25">
//     <Field
//       as="select"
//       className="form-control custom-select"
//       name="start1"
//     >
//       <option value="00">00</option>
//       <option value="01">01</option>
//       <option value="02">02</option>
//       <option value="03">03</option>
//       <option value="04">04</option>
//       <option value="05">05</option>
//       <option value="06">06</option>
//       <option value="07">07</option>
//       <option value="08">08</option>
//       <option value="09">09</option>
//       <option value="10">10</option>
//       <option value="11">11</option>
//       <option value="12">12</option>
//       <option value="13">13</option>
//       <option value="14">14</option>
//       <option value="15">15</option>
//       <option value="16">16</option>
//       <option value="17">17</option>
//       <option value="18">18</option>
//       <option value="19">19</option>
//       <option value="20">20</option>
//       <option value="21">21</option>
//       <option value="22">22</option>
//       <option value="23">23</option>
//       <option value="24">24</option>
//     </Field>
//     <span className="align-self-center">:</span>
//     <Field
//       as="select"
//       className="form-control custom-select "
//       name="start2"
//     >
//       <option value="00">00</option>
//       <option value="15">15</option>
//       <option value="30">30</option>
//       <option value="45">45</option>
//     </Field>
//   </div>
// </div>

export default EventForm;
