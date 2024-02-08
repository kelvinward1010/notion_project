import { IconFile } from '@tabler/icons-react';
import styles from './style.module.scss';
import { Text } from '@mantine/core';
import { useAuth } from '../../../context/authContext';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { database } from '../../../lib/firebase';

export const CreatePage: React.FC = () => {

    const user = useAuth();

    const handleCreateNewFolder = async () => {

        const defaultData = {
            title: "United",
            content: "New content 3",
            level: 0,
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
        <div onClick={handleCreateNewFolder} className={styles.container}>
            <IconFile size={16}/>
            <Text>Create Page</Text>
        </div>
    )
}
