import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";
import { Menu, X as XIcon } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navItems = [
        { to: "/challenges", label: "Challenges" },
        { to: "/terrier-trade", label: "Terrier Trade" },
        { to: "/leaderboard", label: "Leaderboard" },
        { to: "/about", label: "About" },
    ];

    return (
        <div className="border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList className="flex gap-6">
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.to}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            to={item.to}
                                            className="text-sm font-medium transition-colors hover:text-foreground/80"
                                        >
                                            {item.label}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden p-2"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        <Menu size={32} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-black/80">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="relative w-full max-w-xs mx-auto">
                            {/* Close Button */}
                            <button
                                type="button"
                                className="absolute top-4 right-4 text-white opacity-80 hover:opacity-100 z-50"
                                onClick={closeMobileMenu}
                                aria-label="Close mobile menu"
                            >
                                <XIcon size={24} />
                            </button>

                            {/* Mobile Navigation */}
                            <NavigationMenu className="w-full">
                                <NavigationMenuList className="flex flex-col gap-4 items-start w-full">
                                    {navItems.map((item) => (
                                        <NavigationMenuItem
                                            key={item.to}
                                            className="w-full"
                                        >
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    to={item.to}
                                                    className="text-white text-2xl font-extrabold w-full block"
                                                    onClick={closeMobileMenu}
                                                >
                                                    {item.label}
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
