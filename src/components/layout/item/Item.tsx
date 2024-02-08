import { IconChevronDown, IconChevronLeft, IconTrash } from '@tabler/icons-react';
import styles from './style.module.scss';
import { Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { database } from '../../../lib/firebase';

interface ItemProps {
    id: string;
    title: string;
    level?: number;
    children?: Item[];
    icon: any;
    onExpand?: () => void;
}

export const Item: React.FC<ItemProps> = ({
    id,
    title,
    level,
    children,
    icon,
    onExpand,
}) => {

    const user = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleNode = () => {
        setIsOpen(!isOpen);
    };

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    };


    const handleCreateNewFolder = useCallback(async () => {

        const defaultData = {
            title: "United",
            content: "New content",
            level: Number(level) + 1,
            parent: id,
        }

        const userCollectionRef = collection(database, "folders", user?.uid, "data");
        await addDoc(userCollectionRef, defaultData);
    },[level, id])

    const hanldeDelete = useCallback(async () => {
        const docRef = doc(database, "folders", user?.uid, "data", id);
        await deleteDoc(docRef);
    },[id, user?.id, database])
    
    return (
        <>
            <div
                role="button"
                className={styles.container}
            >
                {!!id && (
                    <div
                        className={styles.for_child}
                        style={{
                            paddingLeft: `${(Number(level) * 12)}px`,
                        }}
                    >
                        <div 
                            className={styles.info}
                        >
                            {!!id && (
                                <div
                                    className={styles.expand}
                                    onClick={handleExpand}
                                    role='buttton'
                                >
                                    {isOpen === true ? <IconChevronDown size={16} /> : <IconChevronLeft size={16} />}
                                </div>
                            )}
                            {icon}
                            <Text onClick={() => {
                                if(!children){
                                    navigate(`/documents/${id}`)
                                }
                                toggleNode()
                            }} size={'sm'}>
                                {title}
                            </Text>
                        </div>
                        <div className={styles.actions}>
                            <div
                                className={styles.plus}
                                role='buttton'
                                onClick={() => {
                                    handleCreateNewFolder()
                                    setIsOpen(true)
                                }}
                            >
                                <IconPlus size={16} />
                            </div>
                            <div
                                className={styles.trash}
                                role='buttton'
                                onClick={() => hanldeDelete()}
                            >
                                <IconTrash size={16} />
                            </div>
                        </div>
                    </div>
                )}
                {isOpen && children && children?.map(child => <Item 
                                                        children={child.children} 
                                                        id={child.id} 
                                                        key={child.id} 
                                                        level={child.level}
                                                        title={child.title} 
                                                        icon={icon}
                                                    />
                                            )}
            </div>
        </>
    )
}






interface Item {
    id: string;
    title: string;
    level: number;
    parent: string;
    children?: Item[];
}

export const ItemComponent: React.FC<{ item: Item }> = ({ item }) => (
    <div style={{ marginLeft: 12 * item.level }}>
        <p>{item.title}</p>
        {item.children && item.children.map(child => <ItemComponent key={child.id} item={child} />)}
    </div>
);