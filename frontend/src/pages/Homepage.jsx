import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Logo from '/images/tc4c-one.svg'

const events = [
  {title: 'Wowzas!', start: new Date()}
]

const Homepage = () => {
  return (
    <div className="min-h-full grow bg-newsletter-black flex flex-col ">
        <div className="h-full w-1/2 flex">
          <img src={Logo} alt="" className='w-full h-full'/>
          <img src={Logo} alt="" className='w-full h-full'/>
        </div>
        <div className="w-2/3 mx-auto bg-draft-yellow rounded-xl p-8">
        <FullCalendar plugins={[dayGridPlugin]} initialView='dayGridMonth' weekends={true} events={events} eventContent={renderEventContent} />
        </div>
   </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default Homepage