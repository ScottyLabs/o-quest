import { RefLink } from "@/components/ref-link";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Link } from "@tanstack/react-router";
import { Menu, X as XIcon } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
    return (
        <div className="border-b">
            <Dialog>
                <DialogTrigger asChild>
                    <button type="button" className="p-3">
                        <Menu size={32} />
                        <span className="sr-only">Open navigation menu</span>
                    </button>
                </DialogTrigger>
                <DialogContent className="p-0 bg-black/80 max-w-full w-full h-full flex items-center justify-center">
                    <VisuallyHidden asChild>
                        <DialogTitle>Navigation Menu</DialogTitle>
                    </VisuallyHidden>
                    <VisuallyHidden asChild>
                        <DialogDescription>
                            Navigate to a different page here.
                        </DialogDescription>
                    </VisuallyHidden>
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="absolute top-4 right-4 text-white opacity-80 hover:opacity-100 z-50"
                            tabIndex={0}
                            aria-label="Close menu"
                        >
                            <XIcon size={32} />
                            <span className="sr-only">
                                Close navigation menu
                            </span>
                        </button>
                    </DialogClose>
                    <NavigationMenu className="w-full flex flex-col items-center">
                        <NavigationMenuList className="flex flex-col gap-4 items-start w-full max-w-xs mx-auto">
                            <NavigationMenuItem>
                                <DialogClose asChild>
                                    <NavigationMenuLink
                                        asChild
                                        className="text-white text-2xl font-extrabold w-full"
                                    >
                                        <Link to="/challenges">Challenges</Link>
                                    </NavigationMenuLink>
                                </DialogClose>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <DialogClose asChild>
                                    <NavigationMenuLink
                                        asChild
                                        className="text-white text-2xl font-extrabold w-full"
                                    >
                                        <Link to="/terrier-trade">
                                            Terrier Trade
                                        </Link>
                                    </NavigationMenuLink>
                                </DialogClose>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <DialogClose asChild>
                                    <NavigationMenuLink
                                        asChild
                                        className="text-white text-2xl font-extrabold w-full"
                                    >
                                        <Link to="/leaderboard">
                                            Leaderboard
                                        </Link>
                                    </NavigationMenuLink>
                                </DialogClose>
                            </NavigationMenuItem>
                            <div className="h-4" />
                            <NavigationMenuItem>
                                <DialogClose asChild>
                                    <NavigationMenuLink
                                        asChild
                                        className="text-white text-lg font-bold w-full"
                                    >
                                        <Link to="/about">About</Link>
                                    </NavigationMenuLink>
                                </DialogClose>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </DialogContent>
            </Dialog>
        </div>
    );
};
