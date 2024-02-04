import { ElementRef, useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { IconChevronsLeft, IconMenu2 } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useParams } from 'react-router-dom';

export function Navigation() {

    const pathname = useParams();
    const isMobile = useMediaQuery("(max-width: 570px");

    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [,setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);


    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "180px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 180px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "180px"
            );
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);
        }
    }

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    return (
        <div className={styles.container}>
            <aside
                ref={sidebarRef}
                className={styles.sidebar}
                style={{
                    transition: 'all',
                    transitionTimingFunction: 'ease-in-out',
                    transitionDuration: '300ms',
                }}
            >
                <div onClick={collapse} role='button' className={styles.icon_left}>
                    <IconChevronsLeft />
                </div>
                Actions
            </aside>
            <div 
                ref={navbarRef}
                className={styles.change_style}
            >
                <nav className={styles.nav}>
                    {isCollapsed && <IconMenu2 style={{cursor: 'pointer'}} onClick={resetWidth} role="button"/>}
                </nav>
            </div>
        </div>
    )
}