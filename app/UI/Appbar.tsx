import Image from "next/image";
// import { Button } from "./Button";
import QuestLogo from '@/public/QuesLogo.png'
import { Button } from "@/components/ui/button";
import { Settings , Bell } from 'lucide-react';

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className=" w-[100vw] h-[10vh] flex justify-between px-[5vw]">
        <div className="text-lg flex items-center justify-between">
            <Image 
                src={QuestLogo} 
                alt="Image Here" 
                className=" w-[10vw] "
            />
        </div>
        <div className=" w-[10vw] h-full flex items-center justify-evenly pt-2">
            {/* <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button> */}
            <div > <Settings /> </div>
            <div> <Bell /> </div>
        </div>
    </div>
}