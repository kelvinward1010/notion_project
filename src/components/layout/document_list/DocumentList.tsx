import { IconFile } from '@tabler/icons-react';
import { createTree } from '../../../oplossing';
import { Item } from '../item/Item';
import styles from './style.module.scss';

interface DocumentListProps {
    data: Array<any>;
    onExpand?: () => void;
    onClick?: () => void;
    onCreateInID: (lv: number, idParent: string) => void;
    onDelete: (id: string) => void;
    setData?: any;
}

export const DocumentList: React.FC<DocumentListProps> = ({
    data,
    onCreateInID,
    onDelete,
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
                    icon={<IconFile size={16}/>}
                    onCreateInID={onCreateInID}
                    onDelete={onDelete}
                />
            ))}
            {/* {tree.map(item => <ItemComponent key={item.id} item={item}/>)} */}
        </div>
    )
}
