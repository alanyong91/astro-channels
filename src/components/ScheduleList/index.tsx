import style from './../../styles/components/ScheduleList.module.scss'

import React from 'react'
import moment from 'moment'
import { isToday, isNow } from '../../utils/datetime'

const ScheduleList: React.FC<ScheduleListProps> = ({ schedulers, itemExtraClass }) => schedulers.length !== 0 ? (
  <div className={style.scheduleList}>
    {schedulers.map((schedule, index) => {
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
) : (
  <div className={style.noResult}>
    <p>No result</p>
  </div>
)

export default ScheduleList;
