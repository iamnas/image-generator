"use client";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


const formSchema = z.object({
    inputPrompt: z.string().min(7, {
        message: "must be at least 7 characters.",
    }).max(50),
})

export default function Page() {

    const [outputImg, setOutputImg] = useState<string | null>(null)
    const [inputPrompt, setInputPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            inputPrompt: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log(values)
    }

    return (
        <div className='w-full h-dvh flex justify-center items-start pt-[72px] flex-col'>
            <div className='w-full p-3'>
                <h1 className='text-center font-bold text-white text-4xl'>Create</h1>
                <p className='text-white/60 text-center'>
                    Transform your ideas into stunning visuals instantly with our easy-to-use AI image generator!
                </p>
            </div>

            <div className='flex w-full gap-3 h-full'>
                <div className='__form flex-[2] gap-2  flex justify-center items-center flex-col'>
                    <p className=' text-left text-sm text-white/80'>Type you prompt below to create any image you can imagine!</p>
                    <div className="flex gap-2 w-full justify-center ">

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full  flex gap-2 ">
                                <FormField
                                    control={form.control}
                                    name="inputPrompt"
                                    render={({ field }) => (
                                        <FormItem className="w-full max-w-[70%] ">
                                            <FormControl>
                                                <Input placeholder='a cat sitting over a sofa ...' className="border border-white transition-all" {...field} />
                                            </FormControl>
                                            {/* <FormDescription>
                                                This is your public display name.
                                            </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Generate</Button>
                            </form>
                        </Form>

                        {/* <Button> Generate </Button> */}
                    </div>
                </div>
                <div className='__output flex-[1] bg-white/5 rounded-lg'>
                </div>
            </div>
        </div>
    )
}
