// "use client";
// import { AnimatePresence, motion } from 'framer-motion';
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import { Loader2 } from 'lucide-react';
// import { Post } from '@prisma/client';

// export default function Page() {
//     const [loading, setLoading] = useState(true);
//     // Specify the type as Post[] | undefined
//     const [postData, setPostData] = useState<Post[]>();

//     const fetchpost = async () => {
//         try {
//             const res = await fetch(`/api/images`);
//             const data = await res.json();
//             setPostData(data.postData);
//         } catch (error) {
//             console.error('Failed to fetch posts:', error);
//         }
//     };

//     useEffect(() => {
//         try {
//             setLoading(true);
//             fetchpost();
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     return (
//         <div className='w-full gap-3 min-h-dvh p-3 pt-[72px] grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'>
//             {loading ? (
//                 <div className="col-span-full flex justify-center items-center">
//                     <Loader2 className="animate-spin text-purple-500 h-8 w-8" />
//                 </div>
//             ) : (
//                 <AnimatePresence mode="wait">
//                     {postData?.map((data, index) => (
//                         <motion.div
//                             initial={{
//                                 opacity: 0,
//                                 scale: 0.95,
//                                 filter: "blur(10px)"
//                             }}
//                             animate={{
//                                 opacity: 1,
//                                 scale: 1,
//                                 filter: "blur(0px)"
//                             }}
//                             transition={{ duration: 0.35, delay: index * 0.05 }}
//                             key={data.id}
//                             className='group w-full h-full bg-gray-900/50 hover:bg-gray-900/80 backdrop-blur-sm p-2.5 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors'
//                         >
//                             <div className='relative aspect-square mb-2 overflow-hidden rounded-md'>
//                                 <Image 
//                                     src={data.url} 
//                                     alt={data.prompt} 
//                                     fill
//                                     className='object-cover group-hover:scale-105 transition-transform duration-300'
//                                 />
//                             </div>
//                             <p className='text-gray-400 group-hover:text-white/90 text-sm transition-colors line-clamp-2'>
//                                 {data.prompt}
//                             </p>
//                         </motion.div>
//                     ))}
//                 </AnimatePresence>
//             )}
//         </div>
//     );
// }
"use client";
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface Post {
  id: string;
  prompt: string;
  url: string;
  seed: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const DraggableImage = ({ data, index }: { data: Post; index: number }) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative"
    >
      <motion.div
        drag
        dragSnapToOrigin
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        style={{ x: dragX, y: dragY }}
        whileDrag={{ scale: 1.05, zIndex: 50 }}
        className={`bg-gray-900 rounded-xl overflow-hidden transition-shadow ${
          isDragging ? 'shadow-2xl cursor-grabbing z-50' : 'cursor-grab hover:shadow-lg'
        }`}
      >
        <div className="relative aspect-square">
          <Image
            src={data.url}
            alt={data.prompt}
            fill
            className="object-cover pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <p className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm">
              {data.prompt}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState<Post[]>();

  const fetchpost = async () => {
    try {
      const res = await fetch(`/api/images`);
      const data = await res.json();
      setPostData(data.postData);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      fetchpost();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 pt-[72px] min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="animate-spin text-purple-500 h-8 w-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
          <AnimatePresence mode="wait">
            {postData?.map((data, index) => (
              <DraggableImage key={data.id} data={data} index={index} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}