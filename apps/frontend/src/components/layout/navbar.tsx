import { Link } from "@tanstack/react-router"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"

export default function Navbar() {
    return (
        <nav className="w-full flex items-center justify-between p-3 border border-b border-accent">
            <div className="flex items-center justify-between mx-auto w-full max-w-[1500px]">
                <Link to="/tasks" search={{ page: 1, size: 10, priority: '', status: '', title: '' }}>
                    <div className="flex items-center space-x-3">
                        <h1 className="font-bold text-3xl text-green-800">Jungle</h1>
                        <h2 className="font-semibold text-xl dark:text-white text-black">Challenge</h2>
                    </div>
                </Link>
                <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>GV</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </nav>
    )
}