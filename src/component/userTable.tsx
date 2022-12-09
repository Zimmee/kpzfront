import React from "react";
import { Event } from "../types/interface";
import dayjs from './../../node_modules/dayjs/esm/index';

interface IProps {
  events: Array<Event>;
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
}

const EventTable: React.FunctionComponent<IProps> = props => {
  return (
    <div className="user-table">
      <h1>View Events</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {props.events.length > 0 ? (
            props.events.map(i => (
              <tr key={i.name}>
                <td>{i.name}</td>
                <td>{i.description}</td>
                <td>{dayjs(i.startDate).format("DD MMM YYYY")}</td>
                <td>{dayjs(i.endDate).format("DD MMM YYYY")}</td>
                <td>{dayjs(i.startDate).format("HH:mm")}</td>
                <td>
                  <button onClick={() => props.onEdit(i)}>edit</button>
                  <button onClick={() => props.onDelete(i)}>delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>no events</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default EventTable;
