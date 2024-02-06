import { ElementRef, useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { IconChevronsLeft, IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { User } from '../user/User';
import { DocumentList } from '../document_list/DocumentList';
import { CreatePage } from '../createpage/CreatePage';
import { ActionIcon, Text, useMantineColorScheme } from '@mantine/core';


const defaultData = [
    {
        "id": "0.6489629075787287",
        "title": "United 1",
        "level": 0,
        "parent": "",
    },
    {
        "id": "0.9020505604132987",
        "title": "United 2",
        "level": 0,
        "parent": ""
    },
    {
        "id": "0.5700801393218313",
        "title": "United 3",
        "level": 1,
        "parent": "0.6489629075787287"
    }
]

export function Navigation() {

    const pathname = useParams();
    const isMobile = useMediaQuery("(max-width: 570px");

    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [,setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    const [data, setData] = useState<Array<any>>(defaultData);
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    const toggleColorScheme = () => {
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    };

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "200px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 200px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "200px"
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

    const handleCreate = () => {
        let initialData = {
            id: Math.random().toString(),
            title: 'United',
            level: 0,
            parent: '',
        }
        setData(prevData => [...prevData, initialData])
    }

    const handleCreateInId = (lv?: number, idParent?: string) => {
        let initialData = {
            id: Math.random().toString(),
            title: `United`,
            level: Number(Number(lv) + 1),
            parent: idParent,
        }
        setData(prevData => [...prevData, initialData])
    }

    const hanldeDeleteItem = (id: string) => {
        setData(prevData => prevData.filter(item => item?.id !== id));
    };

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
                <div>
                    <User />
                </div>
                <div className={styles.document_list}>
                    <CreatePage onClick={handleCreate}/>
                    <div style={{borderTop: '1px solid teal'}}/>
                    <DocumentList 
                        data={data}
                        onCreateInID={handleCreateInId}
                        onDelete={hanldeDeleteItem}
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