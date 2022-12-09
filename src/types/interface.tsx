export type Event = {
  id?: number
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  time: string;
  calendarId?: number
}


export type User = {
  id: number,
  name: string,
  calendar: {
    id: number
    events: Event[] | null
  }
}
