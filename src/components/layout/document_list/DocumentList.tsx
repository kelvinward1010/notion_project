import { createTree } from '@/utils/oplossing';
import styles from './style.module.scss';
import { Item } from '../item/Item';

interface DocumentListProps {
    data: Array<any>;
    onExpand?: () => void;
    onClick?: () => void;
    setData?: any;
}

export const DocumentList: React.FC<DocumentListProps> = ({
    data,
}) => {

    const tree = createTree(data);

    return (
        <div className={styles.container}>
            {tree?.map((item) => (
                <Item
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    level={item.level}
                    children={item.children}
                    type={item.type}
                />
            ))}
        </div>
    )
}
