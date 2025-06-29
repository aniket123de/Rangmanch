import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import enUS from 'date-fns/locale/en-US';
import { useTheme } from '../../contexts/ThemeContext';

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
  const { isDark } = useTheme();
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Content Strategy Meeting',
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Brand Campaign Launch',
      start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
      type: 'campaign'
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('Enter event title:');
    if (title) {
      const eventType = window.prompt('Enter event type (meeting/campaign/task/other):') || 'other';
      setEvents([...events, { 
        id: Date.now(),
        start, 
        end, 
        title,
        type: eventType.toLowerCase()
      }]);
    }
  };

  const handleSelectEvent = (event) => {
    if (window.confirm(`Delete "${event.title}"?`)) {
      setEvents(events.filter(e => e.id !== event.id));
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = '#3174ad';
    let color = 'white';
    
    switch(event.type) {
      case 'meeting':
        backgroundColor = '#10b981'; // Green
        break;
      case 'campaign':
        backgroundColor = '#8b5cf6'; // Purple
        break;
      case 'task':
        backgroundColor = '#f59e0b'; // Amber
        break;
      case 'deadline':
        backgroundColor = '#ef4444'; // Red
        break;
      default:
        backgroundColor = '#3b82f6'; // Blue
    }

    return {
      style: {
        backgroundColor,
        color,
        border: 'none',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '600',
        padding: '2px 6px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }
    };
  };

  // Custom toolbar component
  const CustomToolbar = ({ label, onView, views, view }) => {
    return (
      <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
        <div className="flex items-center">
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {label}
          </h3>
        </div>
        <div className="flex gap-1">
          {views.map((viewName) => (
            <button
              key={viewName}
              onClick={() => onView(viewName)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                view === viewName
                  ? 'bg-purple-500 text-white shadow-sm'
                  : isDark
                  ? 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {viewName.charAt(0).toUpperCase() + viewName.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`p-6 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Business Calendar
        </h2>
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Manage your brand campaigns, meetings, and important deadlines
        </p>
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500"></div>
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Meetings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-purple-500"></div>
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Campaigns</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-amber-500"></div>
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Tasks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500"></div>
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Deadlines</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-500"></div>
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Other</span>
        </div>
      </div>

      <div 
        className={`rounded-lg overflow-hidden border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}
        style={{ height: '500px' }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            .rbc-toolbar {
              display: none;
            }
            .rbc-calendar {
              background-color: ${isDark ? '#1f2937' : '#ffffff'};
              color: ${isDark ? '#f9fafb' : '#111827'};
            }
            .rbc-header {
              background-color: ${isDark ? '#374151' : '#f9fafb'};
              color: ${isDark ? '#f9fafb' : '#111827'};
              border-bottom: 1px solid ${isDark ? '#4b5563' : '#e5e7eb'};
              padding: 12px 8px;
              font-weight: 600;
              font-size: 14px;
            }
            .rbc-month-view {
              background-color: ${isDark ? '#1f2937' : '#ffffff'};
            }
            .rbc-date-cell {
              color: ${isDark ? '#d1d5db' : '#374151'};
              font-weight: 500;
            }
            .rbc-off-range-bg {
              background-color: ${isDark ? '#111827' : '#f9fafb'};
            }
            .rbc-today {
              background-color: ${isDark ? '#1e40af' : '#dbeafe'} !important;
            }
            .rbc-day-bg:hover {
              background-color: ${isDark ? '#374151' : '#f8fafc'};
            }
            .rbc-slot-selection {
              background-color: ${isDark ? '#8b5cf6' : '#8b5cf6'};
              opacity: 0.6;
            }
            .rbc-time-view {
              background-color: ${isDark ? '#1f2937' : '#ffffff'};
            }
            .rbc-time-header {
              background-color: ${isDark ? '#374151' : '#f9fafb'};
              border-bottom: 1px solid ${isDark ? '#4b5563' : '#e5e7eb'};
            }
            .rbc-time-content {
              border-top: 1px solid ${isDark ? '#4b5563' : '#e5e7eb'};
            }
            .rbc-timeslot-group {
              border-bottom: 1px solid ${isDark ? '#374151' : '#f3f4f6'};
            }
            .rbc-time-slot {
              border-top: 1px solid ${isDark ? '#374151' : '#f3f4f6'};
            }
            .rbc-current-time-indicator {
              background-color: #ef4444;
              height: 2px;
            }
            .rbc-agenda-view {
              background-color: ${isDark ? '#1f2937' : '#ffffff'};
            }
            .rbc-agenda-table {
              color: ${isDark ? '#f9fafb' : '#111827'};
            }
            .rbc-agenda-table tbody > tr > td {
              border-top: 1px solid ${isDark ? '#4b5563' : '#e5e7eb'};
              padding: 12px 8px;
            }
            .rbc-agenda-table .rbc-agenda-time-cell {
              color: ${isDark ? '#9ca3af' : '#6b7280'};
            }
          `
        }} />
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          style={{ height: '100%' }}
          popup
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
          step={30}
          showMultiDayTimes
          tooltipAccessor={(event) => `${event.title} (${event.type})`}
          components={{
            toolbar: CustomToolbar,
          }}
        />
      </div>
      
      <div className={`text-sm mt-4 p-3 rounded-lg ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="font-medium">How to use:</span>
        </div>
        <ul className="text-xs space-y-1 ml-4">
          <li>• Click and drag to create a new event</li>
          <li>• Click on an existing event to delete it</li>
          <li>• Use the toolbar to switch between month, week, day, and agenda views</li>
          <li>• Events are color-coded by type for easy identification</li>
        </ul>
      </div>
    </div>
  );
};

export default BusinessCalendar;