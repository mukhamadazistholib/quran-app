import { useRouter } from 'next/router';
import React, { useCallback, useContext, useState } from 'react'
import { RootContext } from '../../context/RootContext';
import ChapterCard from '../chapters/Card/ChapterCard';

const Search = ({className}) => {
  const { allChapters } = useContext(RootContext)
  const router = useRouter()

  const [filteredChapters, setFilteredChapters] = useState([{name_simple: "Type to search.."}])
  const [isExpanded, setExpanded] = useState(false)

  const handleChange = useCallback((e) => {
    const keyword = e.target.value

    if (keyword !== ''){
      const result = allChapters.filter((chapters) => {
        return chapters.name_simple
        .toLowerCase()
        .includes(keyword.toLowerCase())
      })
      console.log(result);
      setFilteredChapters(() => {
        if(result.length > 0){
          return result
        } else {
          return [{name_simple: "Not Found"}]
        }
      })
    } else {
      setFilteredChapters([{name_simple: "Type to search.."}])
    }
  })

  function handleBlur(){
    setTimeout(() => {
      setExpanded(false)
    }, 200);
  }

  function onFliteredClick(id){
    if (typeof id != 'undefined') {
      router.push(`/surah/${id}`)
    }
  }
  
  return (
    <div className='relative'>
      <input onFocus={() => setExpanded(true)} onBlur={handleBlur} onChange={(e) => handleChange(e)} type="text" className={'bg-gray-100 w-full dark:bg-slate-600 dark:text-slate-200 dark:ring-emerald-500 py-2 px-3 my-3 rounded-lg outline-none focus:ring-2 ring-emerald-300 transition-all ' + className} placeholder='Search...'/>
      {
        isExpanded &&
        <div className='absolute z-50 lg:w-72 w-full max-h-96 overflow-auto border border-emerald-300/50 rounded shadow-lg dark:bg-slate-600 bg-white dark:text-slate-100 right-0 p-2'>
          {
            (filteredChapters.length > 0) &&
            filteredChapters.map((e) => (
              <div onClick={() => onFliteredClick(e.id)} key={e.id} className='py-1 px-2 hover:bg-emerald-200 dark:hover:bg-emerald-600 rounded cursor-pointer'>{e.name_simple}</div>
            ))
          }
        </div>
      }
    </div>
  )
}

export default Search