"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Loader2, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
    const { data: session, status } = useSession();
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        if (status !== "loading") {
            setInitialLoading(false);
        }
    }, [session, status]);

    return (
        <div className="fixed top-0 w-full h-[60px] bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 px-4 flex justify-between items-center z-50">
            <Link href={'/'} className="flex items-center gap-2">
                <Wand2 className="h-6 w-6 text-purple-400" />
                <h2 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    AI Studio
                </h2>
            </Link>

            {initialLoading && status === "loading" ? (
                <Loader2 className="animate-spin text-purple-500 h-6 w-6" />
            ) : !session ? (
                <Button
                    onClick={() => signIn("google")}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                    Login
                </Button>
            ) : (
                <div className="flex gap-3 items-center">
                    <Button
                        onClick={() => signOut()}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                        Logout
                    </Button>
                    <Link href={'/profile'}>
                        <Avatar className="border-2 border-purple-500/50">
                            <AvatarImage src={session.user?.image || ''} />
                            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500">
                                {session.user?.name?.[0] || 'A'}
                            </AvatarFallback>
                        </Avatar>
                    </Link>
                </div>
            )}
        </div>
    );
}