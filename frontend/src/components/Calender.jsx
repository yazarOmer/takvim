import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Meeting from './Meeting'
import AddScheduleModal from './AddScheduleModal'
import { getGoals, reset } from '../features/goals/goalSlice'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
} 

const Calender = () => {

    const dispatch = useDispatch()
  
    const { goals, isLoading, isError, message } = useSelector((state) => state.goals)
  
    useEffect(() => {
      if(isError) {
        console.log(message)
      }
  
      dispatch(getGoals())
  
      return () => {
        dispatch(reset())
      }
  
    }, [isError, message, dispatch])
  
  
  
    let today = startOfToday()
    let [showCreateModal, setShowCreateModal] = useState(false)
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
  
    const handleModal = () => {
        setShowCreateModal(true)
        console.log(showCreateModal)
    }
  
    let days = eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    })
  
    function previousMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
  
    function nextMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
  
    let selectedDayMeetings = goals.filter((schedule) =>
      isSameDay(parseISO(schedule.day), selectedDay)
    )
  
    return (
        <div className="pt-48">
          <div className="max-w-5xl px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
            <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
              <div className="md:pr-14">
                <div className="flex items-center">
                  <h2 className="flex-auto font-semibold text-gray-900">
                    {format(firstDayCurrentMonth, 'MMMM yyyy')}
                  </h2>
                  <button
                    type="button"
                    onClick={previousMonth}
                    className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                  >
                        <span className="sr-only">Previous month</span>
                        <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={nextMonth}
                    type="button"
                    className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                  >
                        <span className="sr-only">Next month</span>
                        <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                  <div>S</div>
                  <div>M</div>
                  <div>T</div>
                  <div>W</div>
                  <div>T</div>
                  <div>F</div>
                  <div>S</div>
                </div>
                <div className="grid grid-cols-7 mt-2 text-sm">
                  {days.map((day, dayIdx) => (
                    <div
                      key={day.toString()}
                      className={classNames(
                        dayIdx === 0 && colStartClasses[getDay(day)],
                        'py-1.5'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={classNames(
                          isEqual(day, selectedDay) && 'text-white',
                          !isEqual(day, selectedDay) &&
                            isToday(day) &&
                            'text-red-500',
                          !isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            isSameMonth(day, firstDayCurrentMonth) &&
                            'text-gray-900',
                          !isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            !isSameMonth(day, firstDayCurrentMonth) &&
                            'text-gray-400',
                          isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                          isEqual(day, selectedDay) &&
                            !isToday(day) &&
                            'bg-gray-900',
                          !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                          (isEqual(day, selectedDay) || isToday(day)) &&
                            'font-semibold',
                          'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                        )}
                      >
                        <time dateTime={format(day, 'yyyy-MM-dd')}>
                          {format(day, 'd')}
                        </time>
                      </button>
    
                      <div className="w-1 h-1 mx-auto mt-1">
                        {goals.some((goal) =>
                          isSameDay(parseISO(goal.day), day)
                        ) && (
                          <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <section className="mt-12 md:mt-0 md:pl-14">
                <div className='flex gap-8 items-center'>
                  <h2 className="font-semibold text-gray-900">
                      Schedule for{' '}
                      <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                      {format(selectedDay, 'MMM dd, yyy')}
                      </time>
                  </h2>
                  <button onClick={handleModal} className='bg-green-500 px-3 py-1 rounded-xl font-semibold text-white hover:bg-green-400 duration-200'>Add Schedule</button>
                </div>
                
                <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                  {selectedDayMeetings.length > 0 ? (
                    selectedDayMeetings.map((schedule) => (
                      <Meeting schedule={schedule} key={schedule._id} />
                    ))
                  ) : (
                    <p>No meetings for today.</p>
                  )}
                </ol>
              </section>
            </div>
          </div>
  
          {showCreateModal && <AddScheduleModal closeModal={setShowCreateModal} selectedDay={selectedDay}/>}
        </div>
      )
  }
  
  let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ]
  
  export default Calender