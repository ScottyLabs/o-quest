// import { Navbar } from "@/components/navbar";
import { BottomNavBar } from "@/components/bottom-navbar";
import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
    component: () => {
        const location = useLocation();
        const isOnboarding = location.pathname === "/onboarding";

        return (
            <>
                {/* {!isOnboarding && <Navbar />} */}
                <Outlet />
                {!isOnboarding && <BottomNavBar />}
                <TanStackRouterDevtools />
            </>
        );
    },
});
