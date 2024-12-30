"use client";
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Loader2, Layout } from 'lucide-react';

interface Post {
  id: string;
  prompt: string;
  url: string;
  seed: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const DraggableImage = ({ 
  data, 
  index, 
  isArranged 
}: { 
  data: Post; 
  index: number;
  isArranged: boolean;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Calculate grid position
  const getGridPosition = () => {
    const gap = 24;
    const width = 300 + gap;
    const columns = Math.floor((window.innerWidth - 32) / width) || 1;
    const column = index % columns;
    const row = Math.floor(index / columns);
    return {
      x: column * width,
      y: row * width
    };
  };

  return (
    <motion.div
      initial={false}
      animate={isArranged ? getGridPosition() : position}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100
      }}
      drag={!isArranged}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        setIsDragging(false);
        if (!isArranged) {
          setPosition({
            x: position.x + info.offset.x,
            y: position.y + info.offset.y
          });
        }
      }}
      className={`absolute ${
        isDragging ? 'z-50' : 'z-0'
      }`}
    >
      <div 
        className={`bg-gray-900 rounded-xl overflow-hidden transition-all duration-200 ${
          isDragging ? 'shadow-2xl scale-105 cursor-grabbing' : 'shadow hover:shadow-lg cursor-grab'
        }`}
      >
        <div className="relative w-[300px] aspect-square">
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
      </div>
    </motion.div>
  );
};

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState<Post[]>();
  const [isArranged, setIsArranged] = useState(false);

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Image Gallery</h1>
        <button
          onClick={() => setIsArranged(!isArranged)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
        >
          <Layout className="w-4 h-4" />
          {isArranged ? 'Free Move' : 'Rearrange'}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="animate-spin text-purple-500 h-8 w-8" />
        </div>
      ) : (
        <div className="relative min-h-[80vh]">
          <AnimatePresence>
            {postData?.map((data, index) => (
              <DraggableImage 
                key={data.id} 
                data={data} 
                index={index}
                isArranged={isArranged}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}