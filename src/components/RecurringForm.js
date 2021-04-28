import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { isBefore, format, addWeeks, getDay, addDays } from "date-fns";
import EventService from "../services/event.service";
// const formatdate = "yyyy-'W'ww";
const formatdate = "yyyy-MM-dd";

const EventForm = (props) => {
  const EventFormSchema = Yup.object().shape({
    game: Yup.string(),
    title: Yup.string().max(400, "Title cannot be longer than 400 char"),
    date: Yup.string().required("A date is required"),
    weekdays: Yup.array().min(1, "Please select atleast 1 day"),
    start: Yup.string().required("A start time is required!"),
    end: Yup.string().test(
      "start_time_test",
      "End time cannot be before start time!",
      function (value) {
        const { start } = this.parent;
        const { date } = this.parent;
        // console.log(value);
        if (value === undefined) {
          return true;
        }
        return isBefore(
          new Date(date + " " + start),
          new Date(date + " " + value)
        );
        // return before(value, start);
      }
    ),
  });

  const handleFormClose = () => {
    props.setAddRecurring(false);
  };
  // console.log(format(new Date(), formatdate));
  return (
    <Formik
      initialValues={{
        game: "",
        desc: "",
        date: format(new Date(), formatdate),
        start: "",
        end: "",
        length: "1",
        weekdays: [],
      }}
      validationSchema={EventFormSchema}
      onSubmit={(values) => {
        var result = [];
        let weeks = values.length;
        let date = new Date(values.date);
        while (parseInt(weeks, 10) > 0) {
          for (let i = 0; i <= 6; i++) {
            let currentdate = addDays(date, i);
            values.weekdays.map((d) => {
              // console.log(currentdate, d);
              if (values.end !== "") {
                if (getDay(currentdate) === parseInt(d, 10)) {
                  result.push({
                    game: values.game,
                    description: values.desc,
                    date: format(currentdate, formatdate),
                    start: values.start,
                    end: values.end,
                    userId: props.userId,
                  });
                } else {
                  return null;
                }
              } else {
                if (getDay(currentdate) === parseInt(d, 10)) {
                  result.push({
                    game: values.game,
                    description: values.desc,
                    date: format(currentdate, formatdate),
                    start: values.start,
                    end: null,
                    userId: props.userId,
                  });
                } else {
                  return null;
                }
              }
              return null;
            });
          }

          // console.log(weeks, date);
          date = addWeeks(date, 1);
          weeks = weeks - 1;
        }

        // console.log(values);

        EventService.addRecurringEvent(result)
          .then(() => {
            setTimeout(() => {
              props.setUpdateEvent(true);
              props.setUpdateEvent(false);
            }, 300);
            // props.setEdit(false);
            props.setAddRecurring(false);
          })
          .catch("Something went wrong");
      }}
      render={({ errors, status, touched }) => (
        <Form className="px-2">
          <h3 className="text-center">
            <u>Add multiple streams at once.</u>
          </h3>

          <div className="text-danger py-2 mr-auto"> Required *</div>
          <div className="row">
            <div className="form-group col">
              <div>
                Set for:<span className="text-danger px-2">*</span>
              </div>

              <div role="group">
                <div className="form-check">
                  <label className="form-check-label">
                    <Field
                      type="radio"
                      name="length"
                      value="1"
                      className="form-check-input"
                      default
                    />
                    Week
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label">
                    <Field
                      type="radio"
                      name="length"
                      value="2"
                      id="fortnight"
                      className="form-check-input"
                    />
                    Fortnight
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label">
                    <Field
                      type="radio"
                      name="length"
                      value="4"
                      className="form-check-input"
                    />
                    Month
                  </label>
                </div>
                <div className="form-check">
                  <label className="form-check-label">
                    <Field
                      type="radio"
                      name="length"
                      value="52"
                      className="form-check-input"
                    />
                    Year
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group col">
              <div>
                Set for:<span className="text-danger px-2">*</span>
              </div>
              {errors.weekdays && touched.weekdays ? (
                <div className="alert alert-danger">{errors.weekdays}</div>
              ) : null}
              <div className="form-check">
                <label className="form-check-label">
                  <Field
                    type="checkbox"
                    name="weekdays"
                    value="1"
                    className="form-check-input"
                  />
                  Monday
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <Field
                    type="checkbox"
                    name="weekdays"
                    value="2"
                    className="form-check-input"
                  />
                  Tuesday
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <Field
                    type="checkbox"
                    name="weekdays"
                    value="3"
                    className="form-check-input"
                  />
                  Wednesday
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <Field
                    type="checkbox"
                    name="weekdays"
                    value="4"
                    className="form-check-input"
                  />
                  Thursday
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <Field
                    type="checkbox"
                    name="weekdays"
                    value="5"
                    className="form-check-input"
                  />
                  Friday
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <Field
                    type="checkbox"
                    name="weekdays"
                    value="6"
                    className="form-check-input"
                  />
                  Saturday
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <Field
                    type="checkbox"
                    name="weekdays"
                    value="0"
                    className="form-check-input"
                  />
                  Sunday
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div>
              From:<span className="text-danger px-2">*</span>
            </div>
            <Field type="date" name="date" />
            {errors.date && touched.date ? (
              <div className="alert alert-danger">{errors.date}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="game">Game Title:</label>
            <Field type="text" className="form-control" name="game" />
            {errors.game && touched.game ? (
              <div className="alert alert-danger">{errors.game}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="desc">Stream Title:</label>
            <Field type="text" className="form-control" name="desc" />
            {errors.desc && touched.desc ? (
              <div className="alert alert-danger">{errors.desc}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="start">Start Time:</label>
            <span className="text-danger px-2">*</span>
            <Field type="time" className="form-control" name="start" />
            {errors.start && touched.start ? (
              <div className="alert alert-danger">{errors.start}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="end">End Time:</label>
            <Field type="time" className="form-control" name="end" />
            {errors.end && touched.end ? (
              <div className="alert alert-danger">{errors.end}</div>
            ) : null}
          </div>

          <div className="form-group text-center">
            <button type="submit" className="btn btn-millyell my-1 w-75">
              Add events
            </button>

            <button
              type="button"
              className="btn btn-secondary w-75"
              onClick={handleFormClose}
            >
              Close
            </button>
          </div>
        </Form>
      )}
    />
  );
};

export default EventForm;
