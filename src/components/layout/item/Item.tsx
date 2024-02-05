import { IconChevronLeft, IconTrash } from '@tabler/icons-react';
import styles from './style.module.scss';
import { Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface ItemProps {
    id?: string;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick?: () => void;
    icon: any;
    onCreateInID: (lv: number, idParent: string) => void;
    onDelete: (id: string) => void;
}

export const Item: React.FC<ItemProps> = ({
    id,
    label,
    level,
    onExpand,
    onClick,
    icon,
    onCreateInID,
    onDelete,
}) => {

    const navigate = useNavigate();

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    };

    return (
        <div
            onClick={onClick}
            role="button"
            className={styles.container}
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
            }}
        >
            {!!id && (
                <div
                    className={styles.expand}
                    onClick={handleExpand}
                    role='buttton'
                >
                    <IconChevronLeft size={16}/>
                </div>
            )}
            {icon}
            <Text size={'sm'}>
                {label}
            </Text>
            {!!id && (
                <div
                    className={styles.for_child}
                >
                    <div
                        className={styles.plus}
                        role='buttton'
                        onClick={() => onCreateInID(Number(level), String(id))}
                    >
                        <IconPlus size={16}/>
                    </div>
                    <div
                        className={styles.trash}
                        role='buttton'
                        onClick={() => onDelete(String(id))}
                    >
                        <IconTrash size={16}/>
                    </div>
                </div>
            )}
        </div>
    )
}
