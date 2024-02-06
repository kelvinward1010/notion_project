import { IconFile } from '@tabler/icons-react';
import styles from './style.module.scss';
import { Text } from '@mantine/core';

interface CreatePageProps{
    onClick: () => void;
}

export const CreatePage: React.FC<CreatePageProps> = ({
    onClick
}) => {
    return (
        <div onClick={onClick} className={styles.container}>
            <IconFile size={16}/>
            <Text>Create Page</Text>
        </div>
    )
}
