import { Link, useLocation } from "@tanstack/react-router";
import {
    BarChart2,
    ChevronLeft,
    ChevronRight,
    Info,
    ShoppingCart,
    Trophy,
    User,
} from "lucide-react";

const navItems = [
    { to: "/profile", icon: User, label: "Profile" },
    { to: "/leaderboard", icon: BarChart2, label: "Leaderboard" },
    { to: "/challenges", icon: Trophy, label: "Challenges" },
    { to: "/terrier-trade", icon: ShoppingCart, label: "Terrier Trade" },
    { to: "/about", icon: Info, label: "About" },
];

export function BottomNavBar() {
    const location = useLocation();
    const current = location.pathname;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-20">
            {navItems.map((item) => {
                const isActive = current.startsWith(item.to);

                const Icon = item.icon;
                return (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={`flex flex-col items-center justify-center h-full transition-colors ${
                            item.to === "/challenges" ? "flex-[1.5]" : "flex-1"
                        } ${
                            isActive
                                ? "bg-red-900"
                                : "bg-red-700 hover:bg-red-800"
                        }`}
                        style={{ minWidth: 0 }}
                    >
                        {item.to === "/challenges" ? (
                            <div className="flex items-center gap-2">
                                <ChevronLeft size={24} className="text-white" />
                                <Icon size={32} className="text-white" />
                                <ChevronRight
                                    size={24}
                                    className="text-white"
                                />
                            </div>
                        ) : (
                            <Icon size={32} className="text-white" />
                        )}
                        {item.to === "/challenges" && (
                            <span className="mt-1 text-xs font-bold text-white">
                                Challenges
                            </span>
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
