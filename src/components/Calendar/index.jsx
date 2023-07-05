import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

const Calendar = ({ id, controller, inputs, setInputs }) => {
  const [startDate, setStartDate] = useState(null);
  const handleDateChange = (date) => {
    const unix = Math.floor(date.getTime() / 1000);
    setStartDate(date);
    controller(id, unix, inputs, setInputs);
  };
  return (
    <DatePicker
      minDate={new Date()}
      selected={startDate}
      onChange={(data) => handleDateChange(data)}
      inline
    />
  );
};

export default Calendar;
