import style from './../../styles/components/Card.module.scss';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { isNow } from './../../utils/datetime'

import ChannelHeader from './../ChannelHeader'
import ScheduleList from '../ScheduleList';

import { ReactComponent as BookmarkIcon} from './../../assets/images/bookmark-white.svg'
import { ReactComponent as BookmarkedIcon} from './../../assets/images/bookmark.svg'

const Card: React.FC<CardProps> = ({ channel, toggleChannelBookmark }) => {
  const [schedulers, setSchedulers] = useState<SchedulerType[]>([])

  useEffect(() => {
    const { currentSchedule } = channel
    const trimmedSchedulers: SchedulerType[] = []

    let i = 0
    let shouldAddToSchedule = false
    do {
      const current = currentSchedule[i]
      if (current) {
        if (isNow(current.datetime!, current.duration!) && !shouldAddToSchedule) {
          shouldAddToSchedule = true
        }

        if (shouldAddToSchedule) {
          trimmedSchedulers.push({
            datetime: current.datetime,
            duration: current.duration,
            episodeId: current.episodeId,
            eventId: current.eventId,
            programmeId: current.programmeId,
            title: current.title,
          })
        }
      } else {
        trimmedSchedulers.push({
          datetime: null,
          duration: null,
          episodeId: null,
          eventId: null,
          programmeId: null,
          title: null,
        })
      }
      i++
    } while (trimmedSchedulers.length < 3)

    setSchedulers(trimmedSchedulers)
  }, [channel])

  return (
    <div className={style.card}>
      <button className={style.cardBookmark} onClick={() => toggleChannelBookmark(channel.id)}>
        {channel.bookmarked ? <BookmarkedIcon className={style.bookmarked} /> : <BookmarkIcon />}
      </button>
      <Link to={`/channels/${channel.title.replaceAll(' ', '-')}-${channel.id}`} className={style.cardItem}>
        <div className={style.channelScheduleHeader}>
          <ChannelHeader 
            imageUrl={channel.imageUrl}
            title={channel.title}
            stbNumber={channel.stbNumber}
          />
        </div>
        <div className={style.channelScheduleList}>
          <ScheduleList schedulers={schedulers} />
        </div>
      </Link>
    </div>
  )
}

export default Card;
