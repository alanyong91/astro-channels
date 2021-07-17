import style from './../../styles/components/Card.module.scss';
import React from 'react'
import { Link } from 'react-router-dom';

import ChannelHeader from './../ChannelHeader'
import ScheduleList from '../ScheduleList';

import { ReactComponent as BookmarkIcon} from './../../assets/images/bookmark-white.svg'
import { ReactComponent as BookmarkedIcon} from './../../assets/images/bookmark.svg'

const Card: React.FC<CardProps> = ({ channel, toggleChannelBookmark }) => {
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
          <ScheduleList schedulers={channel.schedulers} />
        </div>
      </Link>
    </div>
  )
}

export default Card;
