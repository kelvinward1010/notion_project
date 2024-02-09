import { ElementRef, useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { IconChevronsLeft, IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { User } from '../user/User';
import { DocumentList } from '../document_list/DocumentList';
import { CreatePage } from '../createpage/CreatePage';
import { ActionIcon, Text, useMantineColorScheme } from '@mantine/core';
import { useAuth } from '../../../context/authContext';
import { collection, onSnapshot } from 'firebase/firestore';
import { database } from '../../../lib/firebase';

export function Navigation() {

    const pathname = useParams();
    const isMobile = useMediaQuery("(max-width: 570px");

    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [,setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    const {colorScheme, setColorScheme } = useMantineColorScheme();
    const user = useAuth();
    const [dataList, setDataList] = useState<any[]>([]);

    const toggleColorScheme = () => {
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    };

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "210px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 210px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "210px"
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

    useEffect(() => {
        const getCollectionData = async () => {
            if (user?.uid) {
                const userCollectionRef = collection(database, "folders", user?.uid, "data");
                const unsubscribe = onSnapshot(userCollectionRef, (snapshot) => {
                    const newDataList = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setDataList(newDataList);
                });
                return () => unsubscribe();
            }
        }
        getCollectionData();
    }, [user?.uid]);
    
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
                <User />
                <div className={styles.document_list}>
                    <CreatePage />
                    <div style={{borderTop: '1px solid teal'}}/>
                    <DocumentList 
                        data={dataList}
                    />
                    <div className={styles.action_footer}>
                        <ActionIcon
                            variant="default"
                            size={35}
                            onClick={toggleColorScheme}
                        >
                            {colorScheme == 'dark'
                                ? <IconSun />
                                : <IconMoon />
                            }
                        </ActionIcon >
                        {colorScheme == 'light' ? <Text ml={5}>Light</Text>: <Text ml={5}>Dark</Text>}
                    </div>
                </div>
            </aside>
            <div 
                ref={navbarRef}
                className={styles.change_style}
                style={{
                    transition: 'all',
                    transitionTimingFunction: 'ease-in-out',
                    transitionDuration: '300ms',
                }}
            >
                <nav className={styles.nav}>
                    {isCollapsed && <IconMenu2 style={{cursor: 'pointer'}} onClick={resetWidth} role="button"/>}
                </nav>
            </div>
        </div>
    )
}