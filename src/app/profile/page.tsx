"use client";
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function Page() {

    const [loading, setLoading] = useState(true)
    const [postData, setPostData] = useState()

    const fetchpost = async () => {
        const res = await fetch(`/api/images`);
        const data = await res.json();
        // console.log(data.postData);
        setPostData(data.postData);
    }

    useEffect(() => {
        try {
            setLoading(true);
            fetchpost()

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [])

    return (
        <div className='w-full gap-3 min-h-dvh p-3 pt-[72px] grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'>
            {loading ? "Loading..." :
                <AnimatePresence mode="wait">

                    {postData?.map((data,index) => {
                        return (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.95,
                                    filter: "blur(10px)"
                                }}

                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    filter: "blur(0px)"
                                }}
                                transition={{ duration: .35, delay: index * .05 }}

                                className='w-full h-full p-2.5 rounded-md border' key={data.id}>
                                <Image src={data.url} alt="GENAI" width={250} height={250} className=' object-contain w-full rounded-md' />
                                <p className='text-white/80'>{data.prompt}</p>
                            </motion.div>)
                    })}

                </AnimatePresence>
            }
        </div>
    )
}
