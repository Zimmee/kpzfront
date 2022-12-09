import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import AddEventForm from "./component/addEventForm";
import EditEventForm from "./component/editEventForm";
import EventTable from "./component/userTable";
import { User, Event } from "./types/interface";

import "./styles.css";
import LoginForm from "./component/loginForm";


function App() {
  const [loaded, setLoaded] = useState(false)
  const [user, setUser] = useState<User | undefined>()
  const [events, setEvents] = useState<Event[] | undefined>(undefined);
  const [editEvent, setEditEvent] = useState<Event | undefined>();
  const [editing, setEdit] = useState(false);


  const onAddEvent = async (event: Event) => {
    if (events) {
      await fetch(`https://localhost:7292/api/Events`, {
        method: "POST", headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify({ calendarId: user?.calendar.id, ...event })
      })
    }
    getEvents()
    setEdit(false);

  };

  const onCurrentEvent = (event: Event) => {
    setEditEvent(event);
    setEdit(true);
  };

  const onUpdateEvent = async (id: number, newEvent: Event) => {
    if (events) {
      await fetch(`https://localhost:7292/api/Events/${id}`, {
        method: "PUT", headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify(newEvent)
      })
    }
    getEvents()
    setEdit(false)
  };


  const onDeleteEvent = async (currentEvent: Event) => {
    if (events) {
      await fetch(`https://localhost:7292/api/Events/${currentEvent.id}`, {
        method: "DELETE"
      })
    }
    getEvents()
  };

  const getEvents = async () => {
    let response = await fetch(`https://localhost:7292/api/Users/GetUserByUsername/${user?.name}`)
    let data = await response.json() as User;
    setUser(data as User)
    setEvents(data.calendar.events!)
  }


  const onLoadFromId = async (id: string) => {
    const calendar = await fetch(`https://localhost:7292/api/Calendars/${id}`)
    const data = await calendar.json()
    setEvents(data.events)
  }

  const onLoadFromUser = async (username: string) => {
    let response = await fetch(`https://localhost:7292/api/Users/GetUserByUsername/${username}`)
    let data = await response.json() as User;

    if (!data.calendar) {
      const calendar = await fetch(`https://localhost:7292/api/Calendars`, {
        method: "POST", headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify({
          "userId": data.id
        })
      })
      response = await fetch(`https://localhost:7292/api/Users/GetUserByUsername/${username}`)
      data = await response.json() as User;
    }

    setUser(data as User)
    setEvents(data.calendar.events!)
    setLoaded(true)
  }


  return (
    <div className="App">
      <h1>Kpz Calendar</h1>
      <div className="user-flex-wrapper">
        {loaded && events ? <>
          {editing && editEvent ? (
            <EditEventForm
              event={editEvent}
              onUpdateEvent={onUpdateEvent}
              setEdit={setEdit}
            />
          ) : (
            <AddEventForm onAddEvent={onAddEvent} />
          )}
          <EventTable
            events={events}
            onEdit={onCurrentEvent}
            onDelete={onDeleteEvent}
          /></> : <LoginForm
          onLoadFromId={onLoadFromId}
          onLoadFromUser={onLoadFromUser}
        />}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
