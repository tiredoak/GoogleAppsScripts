/*
This script repeats annually all the events in a certain google calendar.
I wrote it while making a birthdays calendar and getting bored with having
to go through the extra clicks to set each new event to repeat on an annual
basis. 

Didn't do any testing since it's intended to run once in my calendar
(worked fine). To adapt it to your calendar simple change the CALENDAR_NAME
variable below to whichever the name of the calendar you want to repeat 
annually is. 
*/

var CALENDAR_NAME = "Birthdays";

function repeatAllEventsYearly() {
  repeatEventYearly();
}

function getAllEvents() {
  // First day of the full year
  var firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
  // Last day of the full year
  var lastDayOfYear = new Date(new Date().getFullYear(), 11, 31);
  // Grab all Event objects for the current year
  var events = CalendarApp.getCalendarsByName(CALENDAR_NAME)[0].getEvents(firstDayOfYear, lastDayOfYear);
  var allEvents = [];
  // Create array with all events so we can update each
  for (event in events) {
    allEvents.push(events[event]);
    Logger.log(events[event]);
  }
  return allEvents;
}

// Make events repeat yearly
function repeatEventYearly() {
  var events = getAllEvents();
  for (event in events) {
    var singleEvent = events[event]
    // Some were already set to repeat yearly so included a quick check
    if (!singleEvent.isRecurringEvent()) {
      // Repeat the events yearly if they're not set to already
      var recurrence = CalendarApp.newRecurrence().addYearlyRule();
      singleEvent.getEventSeries().setRecurrence(recurrence, singleEvent.getAllDayStartDate());
    }
  }
}