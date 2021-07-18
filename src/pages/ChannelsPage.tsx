import React, { useEffect, useState } from 'react';

import PageBase from './../components/PageBase'
import FilterForm from './../components/FilterForm'
import CardList from './../components/CardList'
import api from './../utils/api'

const ChannelsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [channels, setChannels] = useState<ChannelType[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [filter, setFilter] = useState<ChannelFilterType>({
    keyword: '',
    category: '',
    language: '',
    isHd: false,
    sortedBy: null,
    orderBy: 'asc'
  })
  const [filteredChannel, setFilteredChannel] = useState<FilteredChannelType[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { status, data: { response } } = await api.get('/channel/all.json')
        if (status === 200) {
          const categoryList: string[] = []
          const languagesList: string[] = []

          response.forEach((item: ChannelType) => {
            categoryList.push(item.category)
            languagesList.push(item.language)
          })

          setChannels(response)
          setCategories(Array.from(new Set(categoryList)))
          setLanguages(Array.from(new Set(languagesList)))
        }
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetch()
  }, [])

  useEffect(() => {
    const bookmarkIds: number[] = JSON.parse(localStorage.getItem('bookmark') || '[]');
    const { keyword, sortedBy, category, language, isHd } = filter;
    
    if (channels.length !== 0) {
      let cloneChannels = [...channels];

      if (keyword || category || language || isHd) {
        cloneChannels = cloneChannels.filter(channel => {
          // filter by keyword
          const combineTitleAndChannelNumber = channel.stbNumber + ' ' + channel.title
          const filterByKeyword = keyword ? combineTitleAndChannelNumber.toLowerCase().includes(keyword.toLowerCase().trim()) : true
          
          // filter by category
          const filterByCategory = category ? channel.category === category : true
          
          // filter by langauge
          const filterByLanguage = language ? channel.language === language : true

          // filter by resolution
          const filterByResolution = isHd ? channel.isHd : true

          return filterByKeyword && filterByCategory && filterByLanguage && filterByResolution
        })
      }

      if (sortedBy === 'channelNumber') {
        cloneChannels = cloneChannels.sort((a, b) => 
          filter.orderBy === 'asc' 
            ? parseInt(a.stbNumber) - parseInt(b.stbNumber)
            : parseInt(b.stbNumber) - parseInt(a.stbNumber)
        )
      } else if (sortedBy === 'channelName') {
        cloneChannels = cloneChannels.sort((a, b) => 
          filter.orderBy === 'asc' 
            ? a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
            : a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1
        )
      }

      setFilteredChannel(cloneChannels.map(channel => ({
        ...channel,
        bookmarked: !!bookmarkIds.includes(channel.id)
      })))
    }
  }, [filter, channels])

  const toggleChannelBookmark = (id: number) => {
    let bookmarkIds: number[] = JSON.parse(localStorage.getItem('bookmark') || '[]');

    if (bookmarkIds.includes(id)) {
      bookmarkIds = bookmarkIds.filter((channelId) => channelId !== id)
    } else {
      bookmarkIds = [...bookmarkIds, id]
    }
    // update storage
    localStorage.setItem('bookmark', JSON.stringify(bookmarkIds));

    // update state
    setFilteredChannel(prev => prev.map(channel => (
      channel.id === id 
      ? {
          ...channel,
          bookmarked: !channel.bookmarked
        } 
      : channel 
    )))
  }

  return (
    <PageBase title="Astro Channels" description="Astro Channels">
      <div className="container">
        <FilterForm 
          categories={categories}
          languages={languages}
          filter={filter} 
          setFilter={setFilter} 
        />
        {!loading ? (
          <CardList 
            channels={filteredChannel}
            toggleChannelBookmark={toggleChannelBookmark}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </PageBase>
  )
}

export default ChannelsPage;
