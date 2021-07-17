import style from './../../styles/components/ChannelHeader.module.scss'
import React from 'react'
import NoImagePlaceholder from './../../assets/images/no-image-placeholder.jpeg'

const imgError = (event: any) => {
  event.target.src = NoImagePlaceholder
  event.target.onError = null
  return true;
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ imageUrl, title, stbNumber }) => (
  <div className={style.channelHeader}>
    <div className={style.channelLogo}>
      <img src={imageUrl} alt={title} onError={imgError} />
    </div>
    <div className={style.channelInfo}>
      <div className={style.channelNumber}>CH{stbNumber}</div>
      <div className={style.channelTitle}>{title}</div>
    </div>
  </div>
)

export default ChannelHeader;
