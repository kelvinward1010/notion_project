import { ElementRef, useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { IconChevronsLeft, IconFile, IconMenu2 } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { User } from '../user/User';
import { Item } from '../item/Item';
import { DocumentList } from '../document_list/DocumentList';

export function Navigation() {

    const pathname = useParams();
    const isMobile = useMediaQuery("(max-width: 570px");

    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [,setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    const [data, setData] = useState<Array<any>>([]);


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
            title: 'United',
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
                    <Item 
                        onCreateInID={handleCreateInId}
                        label='Create Page'
                        icon={<IconFile size={16}/>}
                        onClick={handleCreate}
                        onDelete={hanldeDeleteItem}
                    />
                    <div style={{borderTop: '1px solid teal'}}/>
                    {data?.map((item) => (
                        <Item 
                            key={item.id}
                            id={item.id}
                            label={item.title}
                            level={item.level}
                            icon={<IconFile size={16}/>}
                            onCreateInID={handleCreateInId}
                            onDelete={hanldeDeleteItem}
                        />
                    ))}
                    <DocumentList 
                        data={data}
                    />
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