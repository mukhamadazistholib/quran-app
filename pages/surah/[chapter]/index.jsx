import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import dynamic from 'next/dynamic'

import ChapterBanner from "../../../src/components/Banner/ChapterBanner";
import QuranReader from "../../../src/components/quranReader/QuranReader";
import Wrapper from "../../../src/components/Wrapper";
import Head from "next/head";
import { TopbarContext } from "../../../src/context/TopbarContext";
import { RootContext } from "../../../src/context/RootContext";
import { getAllVerseByChapter } from "../../../src/utils/verse";
import { getChapterInfo } from "../../../src/utils/chapter";
import PlayIcon from "../../../src/components/icons/PlayIcon";
import TransitionWrapper from "../../../src/components/TransitionWrapper/TransitionWrapper";
const Switcher = dynamic(
    () => import('../../../src/components/quranReader/Switcher'),
    { ssr: false }
)

export default function Surah(){
    const router = useRouter();
    const [datas, setData] = useState({})
    const [isLoading, setLoading] = useState(true)

    const { setShowTopbar } = useContext(TopbarContext)
    const { allChapters, setCurrentChapterId, currentChapter, setAudioId } = useContext(RootContext)

    useEffect(() => {
        setLoading(true)
        setShowTopbar(true)
        
        async function getData(chapterId){
            const surah_info = await getChapterInfo(chapterId, router.locale)
            const verses = await getAllVerseByChapter(chapterId, router.locale)
            setData({ ...surah_info, ...verses })
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
        
        if(router.isReady){
            if(router.query.chapter > 114 || router.query.chapter < 1 || isNaN(router.query.chapter)){
                router.push('/404')
            } else {
                getData(router.query.chapter)
                setCurrentChapterId(router.query.chapter)
            }
        }

    }, [router.isReady, router.query.chapter, router.locale])
    
    return (
        <TransitionWrapper type="toRight" opacity={false}>
            <Wrapper className="px-5 pb-20">
                <Head>
                    <title>{allChapters[currentChapter]?.name_simple} ({allChapters[currentChapter]?.translated_name.name})</title>
                </Head>
                <hr className="md:my-10 my-8 border-none"/>
                <ChapterBanner chapterData={allChapters[currentChapter]} chapterInfo={datas.chapter_info} isLoading={isLoading}/>
                <div className="flex items-center justify-between my-8">
                    <Switcher/>
                    <button
                        className="bg-emerald-500 text-slate-50 py-1 px-2 text-sm lg:py-2 lg:px-3 lg:text-base font-bold rounded flex items-center"
                        onClick={() => setAudioId(currentChapter+1)}
                    >Play Audio <PlayIcon className="h-5 ml-3"/></button>
                </div>
                <QuranReader bismillahPre={allChapters[currentChapter]?.bismillah_pre} versesData={datas.verses} isLoading={isLoading} skeletonLoadingCount={3}/>
            </Wrapper>
        </TransitionWrapper>
    )
}