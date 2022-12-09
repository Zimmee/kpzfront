import React, { useState, useEffect } from "react";
import { Event } from "../types/interface";

interface IProps {
  event: Event;
  onUpdateEvent: (id: number, event: Event) => void;
  setEdit: (bool: boolean) => void;
}

export default function EditEventForm(props: IProps) {
  const [event, setEvent] = useState(props.event);
  useEffect(() => setEvent(props.event), [props]);
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onUpdateEvent(event.id!, event)
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };
  return (
    <div className="user-form">
      <h1>edit event</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={event.name}
            onChange={onInputChange}
          />

        </div>
        <div className="form-row">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={event.description}
            onChange={onInputChange}
          />

        </div>
        <div className="form-row">
          <label>Start Date</label>
          <input
            type="text"
            name="startDate"
            value={event.startDate}
            onChange={onInputChange}
          />

        </div>
        <div className="form-row">
          <label>End Date</label>
          <input
            type="text"
            name="endDate"
            value={event.endDate}
            onChange={onInputChange}
          />

        </div>
        <div className="form-row">
          <label>Time</label>
          <input
            type="text"
            name="time"
            value={event.time}
            onChange={onInputChange}
          />

        </div>
        <div className="form-row">
          <button>Update</button>
          <button onClick={() => props.setEdit(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
