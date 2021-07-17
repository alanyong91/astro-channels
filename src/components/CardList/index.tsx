import 'react-virtualized/styles.css';
import style from './../../styles/components/Card.module.scss';

import React, { useState } from 'react'
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';

import CardItem from './CardItem';

const responsiveWidth = (width: number): number => width - 60 + 16

const CardList: React.FC<CardListProps> = ({ channels, toggleChannelBookmark }) => {
  const windowScrollerRef = React.useRef<any>(null)
  const listRef = React.useRef<any>(null)

  const [itemsPerRow, setItemsPerRow] = useState<number>(3)

  return (
    <div ref={listRef} className={style.channelVirtualizedList}>
      <WindowScroller ref={windowScrollerRef}>
        {({ height, scrollTop, registerChild }) => (
            <AutoSizer 
              ref={registerChild} 
              disableHeight
              onResize={({width}) => {
                if (width <= responsiveWidth(599)) {
                  if (itemsPerRow !== 1) {
                    setItemsPerRow(1)
                  }
                } else if (width <= responsiveWidth(959) && width > responsiveWidth(599)) {
                  if (itemsPerRow !== 2) {
                    setItemsPerRow(2)
                  }
                } else {
                  if (itemsPerRow !== 3) {
                    setItemsPerRow(3)
                  }
                }
              }}
            >
              {({ width }) => {
                const rowCount = Math.ceil(channels.length / itemsPerRow);

                return (
                  <List
                    autoHeight
                    width={width}
                    height={height}
                    scrollTop={scrollTop}
                    rowHeight={205}
                    noRowsRenderer={() => <div className={style.noResults}>No results</div>}
                    rowCount={rowCount}
                    rowRenderer={
                      ({ index, key, style: rowStyle }) => {
                        const items = [];
                        const fromIndex = index * itemsPerRow;
                        const toIndex = Math.min(fromIndex + itemsPerRow, channels.length);
          
                        for (let i = fromIndex; i < toIndex; i++) {
                          const channel = channels[i]
                          items.push(
                            <CardItem 
                              key={channel.id} 
                              channel={channel} 
                              toggleChannelBookmark={toggleChannelBookmark}
                            />
                          )
                        }
          
                        return (
                          <div
                            className={style.cardList}
                            key={key}
                            style={rowStyle}
                          >
                            {items}
                          </div>
                        )
                      }}
                  />
                )
              }}
            </AutoSizer>
        )}
      </WindowScroller>
    </div>
  )
}

export default CardList;
