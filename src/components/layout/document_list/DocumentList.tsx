
import styles from './style.module.scss';
import { Item } from '../item/Item';
import { createTree } from '../../../utils/oplossing';
import { IDocument, IDocumentList } from '../../../types/document';

interface DocumentListProps {
    data: Array<IDocumentList>;
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
            {tree?.map((item: IDocument) => (
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
