import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

type NavItem = {
    to: string;
    label: string;
    type: "primary" | "secondary";
};

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navItems: NavItem[] = [
        { to: "/challenges", label: "Challenges", type: "primary" },
        { to: "/terrier-trade", label: "Terrier Trade", type: "primary" },
        { to: "/leaderboard", label: "Leaderboard", type: "primary" },
        { to: "/about", label: "About", type: "secondary" },
    ];

    const getLinkClasses = (
        type: "primary" | "secondary",
        isMobile = false,
    ) => {
        if (isMobile) {
            return type === "primary"
                ? "!text-4xl !font-extrabold text-white w-full block"
                : "!text-3xl !font-bold text-white w-full block";
        }
        // Desktop: all links have the same size
        return "text-sm font-medium transition-colors hover:text-foreground/80";
    };

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
                                            className={getLinkClasses(
                                                item.type,
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Mobile Menu Button - only show when menu is closed */}
                    {!isMobileMenuOpen && (
                        <button
                            type="button"
                            className="md:hidden p-2"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle mobile menu"
                        >
                            <Menu size={32} />
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-black/80">
                    <div className="flex w-full h-full">
                        <div className="relative w-full max-w-xs pt-8 pl-6">
                            {/* Hamburger Icon as Close Button */}
                            <button
                                type="button"
                                className="text-white mb-8 p-2"
                                onClick={closeMobileMenu}
                                aria-label="Close mobile menu"
                            >
                                <Menu size={32} className="rotate-90" />
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
                                                    className={getLinkClasses(
                                                        item.type,
                                                        true,
                                                    )}
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
