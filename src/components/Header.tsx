"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { TbLoader3 } from "react-icons/tb";

import { useEffect, useState } from "react";
export default function Header() {

    const { data: session, status } = useSession()

    const [initialLoading, setInitialLoading] = useState(true)

    useEffect(() => {
        if (status !== "loading") {
            setInitialLoading(false)
        }
    }, [session, status])

    return (
        <div className="fixed top-0 w-full h-[60px] bg-black border-b border-white/60 p-3 flex justify-between items-center">

            <Link href={'/'}>
                <h2 className="font-bold text-xl"> Gen AI</h2>
            </Link>
            {initialLoading && status === "loading" ? <TbLoader3 className=" animate-spin text-blue-500 size-10" /> : !session ?
                (<div className="__menu">
                    <Button onClick={() => signIn("google")}>Login</Button>
                </div>)
                :
                (<Avatar>
                    <AvatarImage src={session.user?.image || ''} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>)
            }
        </div>
    )
}

