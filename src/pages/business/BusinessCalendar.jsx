import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const BusinessCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: 'Sample Event',
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('Enter agenda/event title:');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  const handleSelectEvent = (event) => {
    if (window.confirm(`Delete agenda "${event.title}"?`)) {
      setEvents(events.filter(e => e !== event));
    }
  };

  return (
    <div style={{ height: 400 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: 400 }}
        popup
        views={['month', 'week', 'day', 'agenda']}
      />
      <div className="text-xs text-gray-500 mt-2">
        <b>Tip:</b> Click and drag to select a time range, or click an event to delete it.
      </div>
    </div>
  );
};

export default BusinessCalendar;