import style from './../styles/pages/ChannelDetailPage.module.scss'

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import api from './../utils/api';
import { isToday } from './../utils/datetime'

import PageBase from './../components/PageBase'
import ChannelHeader from './../components/ChannelHeader'
import ScheduleList from './../components/ScheduleList'

const ChannelDetailpage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState<boolean>(true)
  const [channel, setChannel] = useState<ChannelDetailType | null>(null)
  const [selectedScheduleDate, setSelectedScheduleDate] = useState<string>('')
  
  useEffect(() => {
    const fetch = async () => {
      const channelId = id.split('-').pop()
      try {
        const { status, data: { response } } = await api.get(`/channel/${channelId}.json`)
        if (status === 200) {
          setChannel(response)
          setSelectedScheduleDate(Object.keys(response.schedule)[0])
        }
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetch()
  }, [id])

  if (loading) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    )
  }

  if (!channel) {
    return (
      <div className="container">
        <div className={style.notFound}>
          <p>Channel not found!</p>
          <Link to="/">Go to home page</Link>
        </div>
      </div>
    )
  }

  const breadcrumbs = [
    { path: '/', title: 'Channels' },
    { path: null, title: channel.title },
  ]

  return (
    <PageBase title={channel.title} description={channel.description}>
      <div className={`container ${style.channelDetailWrapper}`}>
        <div className={style.breadcrumbs}>
          {breadcrumbs.map((item, index) => {
            if (item.path) {
              return (
                <div key={index}>
                  <Link to={item.path}>{item.title}</Link>
                  <div>&#8250;</div>
                </div>
              )
            }

            return <div key={index}>{item.title}</div>
          })}
        </div>
        <ChannelHeader 
          imageUrl={channel.imageUrl}
          title={channel.title}
          stbNumber={channel.stbNumber}
        />
        <div className={style.channelDescription}>
          {channel.description}
        </div>
        <div className={style.scheduleDatimeList}>
          {Object.keys(channel.schedule).map(scheduleDateTime => (
            <button 
              key={scheduleDateTime} 
              className={selectedScheduleDate === scheduleDateTime ? style.scheduleDateTimeActive : ''}
              onClick={() => setSelectedScheduleDate(scheduleDateTime)}
            >
              {isToday(scheduleDateTime) ? 'Today' : moment(scheduleDateTime).format('ddd')}
            </button>
          ))}
        </div>
        <div>
          <ScheduleList 
            needFilter
            schedulers={channel.schedule[selectedScheduleDate]} 
            itemExtraClass={style.scheduleItem} 
          />
        </div>
      </div>
    </PageBase>
  )
}

export default ChannelDetailpage;
