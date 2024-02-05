import styles from './style.module.scss';

interface DocumentListProps {
    parentDocumentId?:  string;
    level?: number;
    data?: Array<any>;
}

export const DocumentList: React.FC<DocumentListProps> = ({
    parentDocumentId,
    level = 0,
    data,
}) => {

    const documents = data?.find(item => item.id == parentDocumentId);

    return (
        <div className={styles.container}>
            {documents?.map((document: any) => (
                <div key={document.id}>
                    <span>{document?.title}</span>
                    <DocumentList parentDocumentId={document.id} level={level + 1}/>
                </div>
            ))}
        </div>
    )
}