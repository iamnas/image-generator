'use client'
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";



export default function Home() {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="flex justify-center items-center flex-col">
        <motion.h1
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
          transition={{ duration: .35 }}
          className="text-4xl sm:text-6xl font-bold">Gen Image</motion.h1>

        <motion.p
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
          transition={{ duration: .35, delay: .35 }}

          className="text-center text-white/50">
          Transforming text into stunning visuals with generative AI.
        </motion.p>

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
        transition={{ duration: .35, delay: .7 }}

        >

          <Link href={'/create'}>
            <Button className="mt-3 p-5 font-bold" >
              State Creating
            </Button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
