import { useState } from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths, isSameMonth, isToday, isSameDay } from 'date-fns'
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function Calendar({ theme }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState([
    { date: format(new Date(), 'yyyy-MM-dd'), title: 'Team Meeting' },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [newEvent, setNewEvent] = useState('')

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)
  const days = eachDayOfInterval({ start: startDate, end: endDate })

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const handleDayClick = (day) => {
    setSelectedDate(day)
    setIsModalOpen(true)
  }

  const handleAddEvent = () => {
    if (newEvent.trim() && selectedDate) {
      setEvents([...events, { date: format(selectedDate, 'yyyy-MM-dd'), title: newEvent }])
      setNewEvent('')
      setIsModalOpen(false)
    }
  }

  const handleDeleteEvent = (eventToDelete) => {
    setEvents(events.filter(event => event !== eventToDelete))
  }

  const eventsForSelectedDay = selectedDate 
    ? events.filter(e => isSameDay(new Date(e.date), selectedDate))
    : []

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div className={`p-6 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <button onClick={nextMonth} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekDays.map(day => (
              <div key={day} className="font-semibold text-sm py-2">
                {day}
              </div>
            ))}
            {days.map(day => {
              const dayEvents = events.filter(e => isSameDay(new Date(e.date), day));
              return (
                <div
                  key={day.toString()}
                  className={`h-24 p-2 rounded-md text-sm border cursor-pointer flex flex-col ${
                    !isSameMonth(day, currentDate) ? (theme === 'dark' ? 'text-gray-500 border-gray-700' : 'text-gray-400 border-gray-200') : (theme === 'dark' ? 'border-gray-700' : 'border-gray-200')
                  } ${isToday(day) ? 'border-blue-500' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  <span className={`font-semibold ${isToday(day) ? 'text-blue-500' : ''}`}>
                    {format(day, 'd')}
                  </span>
                  <div className="flex-1 overflow-y-auto text-left mt-1">
                    {dayEvents.map((event, i) => (
                      <div key={i} className="text-xs p-1 rounded-md bg-blue-500 text-white truncate">
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                    Events for {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                  </Dialog.Title>
                  <div className="mt-4">
                    {eventsForSelectedDay.map((event, i) => (
                      <div key={i} className="flex justify-between items-center p-2 rounded-md mb-2 bg-gray-100 dark:bg-gray-700">
                        <span>{event.title}</span>
                        <button onClick={() => handleDeleteEvent(event)} className="p-1">
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <input
                      type="text"
                      value={newEvent}
                      onChange={(e) => setNewEvent(e.target.value)}
                      placeholder="Add new event"
                      className={`w-full p-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    />
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
                    <button type="button" onClick={handleAddEvent} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Add Event</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
} 