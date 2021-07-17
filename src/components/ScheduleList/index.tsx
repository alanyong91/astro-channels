import style from './../../styles/components/ScheduleList.module.scss'

import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { isToday, isNow } from '../../utils/datetime'

const ScheduleList: React.FC<ScheduleListProps> = ({ schedulers, needFilter, itemExtraClass }) => {
  const [filteredSchedules, setFilteredSchedulers] = useState<SchedulerType[]>([])

  useEffect(() => {
    if (needFilter) {
      const filterSchedules: SchedulerType[] = []
      let isNowOrLater = false;

      schedulers.forEach(schedule => {
        if (!isNowOrLater) {
          const onNow = schedule.datetime && schedule.duration 
            ? isNow(schedule.datetime, schedule.duration)
            : false;
        
          if (onNow) {
            isNowOrLater = true
          }
        }

        if (isNowOrLater) {
          filterSchedules.push(schedule)
        }
      })

      setFilteredSchedulers(filterSchedules)
    } else {
      setFilteredSchedulers(schedulers)
    }
  }, [needFilter, schedulers])

  return (
    <div className={style.scheduleList}>
      {filteredSchedules.map((schedule, index) => {
        const onNow = schedule.datetime && schedule.duration 
          ? isNow(schedule.datetime, schedule.duration) && isToday(schedule.datetime)
          : false;
  
        return (
          <div 
            key={schedule.eventId || index} 
            className={`${style.scheduleItem}${onNow ? ` ${style.scheduleTimeOnNow}` : ''} ${itemExtraClass || ''}`}
          >
            <div className={style.scheduleTime}>
              {schedule.datetime && schedule.duration
                ? onNow
                    ? 'On Now'
                    : moment(schedule.datetime).format('hh:mm A')
                : 'N/A'
              }
            </div>
            <div className={style.scheduleTitle}>
              {schedule.title ? schedule.title : 'No Information Available'}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ScheduleList;
