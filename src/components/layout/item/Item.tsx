import { IconChevronLeft, IconTrash } from '@tabler/icons-react';
import styles from './style.module.scss';
import { Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

interface ItemProps {
    id?: string;
    title: string;
    level?: number;
    children?: Item[];
    icon: any;
    onExpand?: () => void;
    onCreateInID: (lv: number, idParent: string) => void;
    onDelete: (id: string) => void;
}

export const Item: React.FC<ItemProps> = ({
    id,
    title,
    level,
    children,
    icon,
    onExpand,
    onCreateInID,
    onDelete,
}) => {

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    };
    
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
                                    <IconChevronLeft size={16} />
                                </div>
                            )}
                            {icon}
                            <Text size={'sm'}>
                                {title}
                            </Text>
                        </div>
                        <div className={styles.actions}>
                            <div
                                className={styles.plus}
                                role='buttton'
                                onClick={() => onCreateInID(Number(level), String(id))}
                            >
                                <IconPlus size={16} />
                            </div>
                            <div
                                className={styles.trash}
                                role='buttton'
                                onClick={() => onDelete(String(id))}
                            >
                                <IconTrash size={16} />
                            </div>
                        </div>
                    </div>
                )}
                {children && children?.map(child => <Item 
                                                        onCreateInID={onCreateInID} 
                                                        onDelete={onDelete} 
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