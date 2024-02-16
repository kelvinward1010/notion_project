import { IconFile, IconFolder, IconHome } from '@tabler/icons-react';
import styles from './style.module.scss';
import { ActionIcon, Group, Text, Tooltip } from '@mantine/core';
import { useAuth } from '../../../context/authContext';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { database } from '../../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { previewUrl } from '../../../urls';

export const CreatePage: React.FC = () => {

    const user = useAuth();
    const navigate = useNavigate();

    const handleCreateNewFolder = async (type: string) => {

        const defaultData = {
            title: "United",
            content: "New content 3",
            level: 0,
            type: type,
            parent: "",
        }

        const userCollectionRef = collection(database, "folders", user?.uid, "data");
        if(!userCollectionRef){
            const userDocs = doc(collection(database, "folders"), user?.uid);
            await setDoc(userDocs, defaultData);
        }else{
            await addDoc(userCollectionRef, defaultData);
        }
    }

    return (
        <div className={styles.container}>
            <Text>Tools</Text>
            <Group gap={5}>
                <Tooltip label="Home" openDelay={500} closeDelay={100}>
                    <ActionIcon                    
                        variant="default"
                        size={35}
                        onClick={() =>navigate(previewUrl)}
                    >
                        <IconHome size={16}/>
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Create folder" openDelay={500} closeDelay={100}>
                    <ActionIcon                    
                        variant="default"
                        size={35}
                        onClick={() =>handleCreateNewFolder('folder')}
                    >
                        <IconFolder size={16}/>
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Create file" openDelay={500} closeDelay={100}>
                    <ActionIcon                    
                        variant="default"
                        size={35}
                        onClick={() => handleCreateNewFolder('file')}
                    >
                        <IconFile size={16}/>
                    </ActionIcon>
                </Tooltip>
            </Group>
        </div>
    )
}
