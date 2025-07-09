import { Link, useLocation } from "@tanstack/react-router";
import { BarChart2, Info, ShoppingCart, Trophy, User } from "lucide-react";

const navItems = [
    { to: "/about", icon: Info, label: "About" },
    { to: "/leaderboard", icon: BarChart2, label: "Leaderboard" },
    { to: "/challenges", icon: Trophy, label: "Challenges" },
    { to: "/terrier-trade", icon: ShoppingCart, label: "Terrier Trade" },
    { to: "/profile", icon: User, label: "Profile" }, // Placeholder
];

export function BottomNavBar() {
    const location = useLocation();
    const current = location.pathname;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-blue-900 flex justify-around items-center h-20 border-t border-blue-800">
            {navItems.map((item) => {
                const isActive =
                    item.to === "/challenges"
                        ? current === item.to
                        : current.startsWith(item.to);
                const Icon = item.icon;
                return (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                            isActive
                                ? "bg-blue-700"
                                : "bg-blue-900 hover:bg-blue-800"
                        }`}
                        style={{ minWidth: 0 }}
                    >
                        <Icon
                            size={32}
                            className={
                                isActive ? "text-white" : "text-blue-200"
                            }
                        />
                        {item.to === "/challenges" && (
                            <span
                                className={`mt-1 text-xs font-bold ${
                                    isActive ? "text-white" : "text-blue-200"
                                }`}
                            >
                                Challenges
                            </span>
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
