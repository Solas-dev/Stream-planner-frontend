import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { isThisWeek, isThisMonth, format } from "date-fns";
import EventService from "../services/event.service";
const EventFormSchema = Yup.object().shape({
  delete: Yup.array().min(1, "TEST"),
});

const EventView = (props) => (
  <Formik
    initialValues={{
      delete: [],
    }}
    validationSchema={EventFormSchema}
    onSubmit={(values) => {
      EventService.deleteEvent(values.delete).then((res) => {
        setTimeout(() => {
          props.setUpdateEvent(true);
          props.setUpdateEvent(false);
        }, 300);
        props.setDeleteItems(false);
      });
    }}
    render={() => (
      <Form>
        {props.deleteItems ? (
          <button
            type="submit"
            className={
              props.addRecurring
                ? "btn btn-danger my-1 w-100"
                : "btn btn-danger my-1 w-100 sticky-top"
            }
          >
            Delete events
          </button>
        ) : null}
        <div
          className={props.addRecurring ? "row my-4 hide-overview" : "row my-4"}
        >
          {props.displayType === "week"
            ? props.sortedEvents.map((d, i) => {
                if (isThisWeek(new Date(d.date), { weekStartsOn: 1 })) {
                  return (
                    <label className="m-2 py-1 col-md-2 text-center bg-millyell rounded">
                      <div for={d.id.toString()}>
                        {props.deleteItems ? (
                          <Field
                            type="checkbox"
                            name="delete"
                            value={d.id.toString()}
                            className="position-absolute"
                            style={{ top: 10, left: 10 }}
                          />
                        ) : null}
                        <p className="m-0">
                          {format(new Date(d.date), "EEEE")}
                        </p>
                        <p className="m-0">Game: {d.game ? d.game : "TBD"}</p>
                        {d.end ? (
                          <p className="m-0">
                            {d.start.slice(0, 5) + " - " + d.end.slice(0, 5)}{" "}
                          </p>
                        ) : (
                          <p className="m-0">Start: {d.start.slice(0, 5)}</p>
                        )}
                      </div>
                    </label>
                  );
                } else {
                  return null;
                }
              })
            : props.displayType === "month"
            ? props.sortedEvents.map((d, i) => {
                if (isThisMonth(new Date(d.date), { weekStartsOn: 1 })) {
                  return (
                    <label className="m-2 py-1 col-md-2 text-center bg-millyell rounded ">
                      <div for={d.id.toString()}>
                        {props.deleteItems ? (
                          <Field
                            type="checkbox"
                            name="delete"
                            value={d.id.toString()}
                            className="position-absolute"
                            style={{ top: 10, left: 10 }}
                          />
                        ) : null}

                        <p className="m-0">{format(new Date(d.date), "do")}</p>
                        <p className="m-0">Game: {d.game ? d.game : "TBD"}</p>
                        {d.end ? (
                          <p className="m-0">
                            {d.start.slice(0, 5) + " - " + d.end.slice(0, 5)}{" "}
                          </p>
                        ) : (
                          <p className="m-0">Start: {d.start.slice(0, 5)}</p>
                        )}
                      </div>
                    </label>
                  );
                } else {
                  return null;
                }
              })
            : null}
        </div>
      </Form>
    )}
  />
);

export default EventView;
