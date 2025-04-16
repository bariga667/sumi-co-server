import { FC } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import { blackRandomColor } from "../../utilities/color.ts";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localize = momentLocalizer(moment);

interface CreateLessonEventProps {
  lessonTitle: string;
  lessonTeacher: string;
  lessonAddress: string;
  startDate: Date;
  endDate: Date;
}

type CreateLessonEvent = (props: CreateLessonEventProps) => Event;

const createLessonEvent: CreateLessonEvent = (props) => {
  return {
    title: (
      <div className="flex h:full flex:col justify-content:space-between">
        <h2>{props.lessonTitle}</h2>

        <div>
          <p className="text-align:end">{props.lessonTeacher}</p>
          <p className="text-align:end">{props.lessonAddress}</p>
        </div>
      </div>
    ),
    start: props.startDate,
    end: props.endDate,
  };
};

function eventStyleGetter(/* event: Event */) {
  const style = {
    backgroundColor: blackRandomColor(),
    color: "white",
    borderRadius: "5px",
    border: "none",
  };

  return {
    style,
  };
}

export const StudentSchedulesPage: FC = () => {
  const events: Event[] = [
    createLessonEvent({
      lessonTitle: "Web",
      lessonTeacher: "Kantaev Sherhan",
      lessonAddress: "ГУК 1001",
      startDate: moment().startOf("week").add(8, "hours").toDate(),
      endDate: moment().startOf("week").add(10, "hours").toDate(),
    }),
    createLessonEvent({
      lessonTitle: "Web",
      lessonTeacher: "Kantaev Sherhan",
      lessonAddress: "ГУК 1001",
      startDate: moment()
        .startOf("week")
        .add(2, "days")
        .add(15, "hours")
        .toDate(),
      endDate: moment()
        .startOf("week")
        .add(2, "days")
        .add(19, "hours")
        .toDate(),
    }),
    createLessonEvent({
      lessonTitle: "Web",
      lessonTeacher: "Kantaev Sherhan",
      lessonAddress: "ГУК 1001",
      startDate: moment()
        .startOf("week")
        .add(2, "days")
        .add(8, "hours")
        .toDate(),
      endDate: moment()
        .startOf("week")
        .add(2, "days")
        .add(13, "hours")
        .toDate(),
    }),
    createLessonEvent({
      lessonTitle: "Web",
      lessonTeacher: "Kantaev Sherhan",
      lessonAddress: "ГУК 1001",
      startDate: moment()
        .startOf("week")
        .add(5, "days")
        .add(10, "hours")
        .toDate(),
      endDate: moment()
        .startOf("week")
        .add(5, "days")
        .add(15, "hours")
        .toDate(),
    }),
  ];

  return (
    <div className="schedules-page w:full">
      <Calendar
        localizer={localize}
        events={events}
        views={{
          week: true,
        }}
        defaultDate={new Date()}
        eventPropGetter={eventStyleGetter}
        selectable={false}
        defaultView="week"
        className="w:full"
      />
    </div>
  );
};
