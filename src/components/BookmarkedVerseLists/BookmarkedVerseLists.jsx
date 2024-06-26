import React, { useCallback, useContext } from 'react'
import BookmarkedItem from './BookmarkedItem'
import { RootContext } from '../../context/RootContext'
import { BookmarkIcon } from '../icons'
import IconWrapper from '../icons/IconWrapper'
import TrashIcon from '../icons/TrashIcon'

const BookmarkedVerseLists = ({chapterLists}) => {
    const { bookmarkData, deleteBookmark} = useContext(RootContext)

    return (
        <div className=' xl:px-0 mb-5'>
            <div className='mr-4 ml-4 h-fit bg-gradient-to-br from-emerald-300 to-emerald-600 rounded-lg lg:p-4 p-3'>
                <div className='lg:mb-4 flex justify-between items-center text-white'>
                    <div className='flex'>
                        <BookmarkIcon fill={true} className="h-6 mr-2"/>
                        <span className='font-bold'>Bookmark</span>
                    </div>
                    <IconWrapper className={bookmarkData.length < 1 && "invisible"} onHover="none" onClick={() => deleteBookmark(false)}>
                        <TrashIcon className="h-6 text-white"/>
                    </IconWrapper>
                </div>
                <div className='flex flex-wrap gap-1'>
                    {
                        bookmarkData.length < 1 
                        ? <div className="flex w-full items-center text-white text-xs">
                            <span className="font-bold">Click</span>
                            <BookmarkIcon fill={true} className="h-3 mx-1"/>
                            <span className="font-bold">to add bookmark</span>
                        </div>
                        : bookmarkData.map((e, index) => {
                            const chapterId = e.split(":")
                            return (
                                <BookmarkedItem
                                    key={index}
                                    name_simple={chapterLists[chapterId[0]-1].name_simple}
                                    verse_key={e}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    
    )
}

export default BookmarkedVerseLists