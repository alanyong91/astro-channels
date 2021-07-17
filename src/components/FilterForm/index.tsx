import style from './../../styles/components/FilterForm.module.scss';
import React, { useState } from 'react';

const SORT_BY_LIST: sortByData[] = [
  { key: 'default', value: null, name: 'Default' },
  { key: 'channelNumber', value: 'channelNumber', name: 'Channel Number' },
  { key: 'channelName', value: 'channelName', name: 'Channel Name' },
];

const ORDER_BY_LIST: orderBy[] = ['asc', 'desc'];

const FilterForm: React.FC<FilterFormProps> = ({ categories, languages, filter, setFilter }) => {
  const [keyword, setKeyword] = useState<string>('')
  
  const onSearchKeyword = () => {
    setFilter(prev => ({
      ...prev,
      keyword
    }))
  }

  const onFilterCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(prev => ({
      ...prev,
      category: event.target.value
    }))
  }

  const onFilterLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(prev => ({
      ...prev,
      language: event.target.value
    }))
  }

  const onFilterHightResolution = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(prev => ({
      ...prev,
      isHd: event.target.checked
    }))
  }

  const onSortBy = (value: sortedBy) => {
    setFilter(prev => ({
      ...prev,
      sortedBy: value,
      ...(value === null ? { orderBy: 'asc' } : {})
    }))
  }

  const onOrderBy = (value: orderBy) => {
    setFilter(prev => ({
      ...prev,
      orderBy: value
    }))
  }

  const onReset = () => {
    setFilter({
      keyword: '',
      category: '',
      language: '',
      isHd: false,
      sortedBy: null,
      orderBy: 'asc'
    })
  }

  return (
    <div className={style.filterWrapper}>
      <div className={style.filterInputsWrapper}>
        <div className={style.inputWrapper}>
          <input 
            name='keyword' 
            type='text' 
            value={keyword}
            autoCapitalize='none'
            onChange={(event) => setKeyword(event.target.value)}
            onKeyPress={(event) => event.key === 'Enter' ? onSearchKeyword() : null}
          />
          <button onClick={onSearchKeyword}>Search</button>
        </div>

        <select value={filter.category} onChange={onFilterCategory}>
          <option value=''>All Category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select value={filter.language} onChange={onFilterLanguage}>
          <option value=''>All Languages</option>
          {languages.map(language => (
            <option key={language} value={language}>{language}</option>
          ))}
        </select>

        <label>
          <input type="checkbox" onChange={onFilterHightResolution} />{' '}
          High Resolution
        </label>
      </div>
      <div className={style.sortByWrapper}>
        <div className={style.sortByButtons}>
          {SORT_BY_LIST.map((item) => (
            <button 
              key={item.key} 
              onClick={() => onSortBy(item.value)}
              className={`${style.sortByButton} ${filter.sortedBy === item.value ? style.sortByActive : ''}`}
            >
              {item.name}
            </button>
          ))}
        </div>
          {filter.sortedBy && (
            <div className={style.sortByButtons}>
              {ORDER_BY_LIST.map((item) => (
                <button 
                  key={item} 
                  onClick={() => onOrderBy(item)}
                  className={`${style.sortByButton} ${filter.orderBy === item ? style.sortByActive : ''}`}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
          )}

        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  )
}

export default FilterForm;
