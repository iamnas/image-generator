"use client";

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React, { useEffect, useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Wand2 } from 'lucide-react'

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";

const formSchema = z.object({
    prompt: z.string().min(7, {
        message: "Must be at least 7 characters.",
    }).max(50),
})

export default function Page() {

    const { status } = useSession()
    const router = useRouter()

    const [outputImg, setOutputImg] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    })

    useEffect(() => {
        if (status === "unauthenticated") {
          router.push("/login")
        }
    }, [status, router])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true)
            const res = await fetch('/api/images', {
                method: 'POST',
                body: JSON.stringify(values),
            })
            const data = await res.json()
            if (res.status === 200) {
                setOutputImg(data?.url)
                toast({ description: 'Image generated successfully!' })
            } else {
                toast({ variant: "destructive", description: data.error })
            }
        } catch (error) {
            console.error(error)
            toast({ variant: "destructive", description: 'Something went wrong' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-dvh bg-gradient-to-b from-gray-900 via-purple-900 to-black p-6"
        >
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="max-w-6xl mx-auto pt-16"
            >
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center mb-4">
                    AI Image Studio
                </h1>
                <p className="text-lg text-white/80 text-center max-w-2xl mx-auto">
                    Transform your imagination into breathtaking visuals with our cutting-edge AI technology
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                    <div className="space-y-6">
                        <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="prompt"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="A mystical forest at twilight..."
                                                        className="border-gray-700 bg-gray-900/50 h-12 text-lg"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 group"
                                        disabled={loading}
                                    >
                                        <Wand2 className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                                        {loading ? 'Creating Magic...' : 'Generate Image'}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>

                    <motion.div
                        className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700/50 min-h-[400px] relative"
                    >
                        {outputImg ? (
                            <Image
                                src={outputImg}
                                alt="Generated"
                                fill
                                className="object-contain p-4"
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60 p-6">
                                <Wand2 size={48} className="mb-4 animate-pulse" />
                                <p className="text-lg text-center">
                                    Your masterpiece will appear here
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}