import { createContext, useContext } from 'react';

export interface AppShellContextValue {
    collapsed: boolean;
    mobileOpen: boolean;
    toggleCollapsed: () => void;
    toggleMobile: () => void;
    closeMobile: () => void;
}

export const AppShellContext = createContext<AppShellContextValue>({
    collapsed: false,
    mobileOpen: false,
    toggleCollapsed: () => { },
    toggleMobile: () => { },
    closeMobile: () => { },
});

export function useAppShell() {
    return useContext(AppShellContext);
}
