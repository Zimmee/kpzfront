import React, { useState } from "react";
import { Event } from "../types/interface";

interface IProps {
  onAddEvent: (event: Event) => void;
}
const initEvent: Event = { name: "", description: "", startDate: "", endDate: "", time: "" };
const AddEventForm: React.FunctionComponent<IProps> = props => {
  const [formValue, setFormValue] = useState(initEvent);
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.onAddEvent(formValue);
    setFormValue(initEvent);
    return false;
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div className="user-form">
      <h1>add events</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formValue.name}
            onChange={onInputChange}
          />

        </div>
        <div className="form-row">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formValue.description}
            onChange={onInputChange}
          />

        </div>
        <div className="form-row">
          <label>Start Date</label>
          <input
            type="text"
            name="startDate"
            value={formValue.startDate}
            onChange={onInputChange}
          />

        </div>
        <div className="form-row">
          <label>End Date</label>
          <input
            type="text"
            name="endDate"
            value={formValue.endDate}
            onChange={onInputChange}
          />

        </div>
        <div className="form-row">
          <label>Time</label>
          <input
            type="text"
            name="time"
            value={formValue.time}
            onChange={onInputChange}
          />

        </div>
        <div className="form-row">
          <button>Add new event</button>
        </div>
      </form>
    </div>
  );
};
export default AddEventForm;
