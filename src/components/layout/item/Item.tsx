import { IconCheck, IconChevronDown, IconChevronLeft, IconEdit, IconFaceIdError, IconFile, IconFilePlus, IconFolderPlus, IconTrash } from '@tabler/icons-react';
import styles from './style.module.scss';
import { CheckIcon, Text, TextInput, rem } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { database } from '../../../lib/firebase';
import { notifications } from '@mantine/notifications';
import { previewUrl } from '../../../urls';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { useForm } from '@mantine/form';

interface ItemProps {
    id: string;
    title: string;
    level?: number;
    children?: Item[];
    type?: string
    onExpand?: () => void;
}

export const Item: React.FC<ItemProps> = ({
    id,
    title,
    level,
    children,
    type,
    onExpand,
}) => {

    const user = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [dataList, setDataList] = useState<any[]>([]);
    const [isEditTitle, setIsEditTitle] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const form = useForm({
        initialValues: {
            title: title,
        },
        validate: {
            title: (value) => (value.length <= 0 ? 'Name must have at least 1 letters' : null),
        },
    });

    useEffect(() => {
        if (title) {
            form.setValues({ title: title });
        }
    }, [title]);

    const toggleNode = () => {
        setIsOpen(!isOpen);
    };

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    };


    const handleCreateNewItem = useCallback(async (type: string) => {

        const defaultData = {
            title: "United",
            content: "New content",
            level: Number(level) + 1,
            type: type,
            parent: id,
        }

        const userCollectionRef = collection(database, "folders", user?.uid, "data");
        await addDoc(userCollectionRef, defaultData);
    },[level, id, type])

    useEffect(() => {
        const getCollectionData = async () => {
            if (user?.uid) {
                const userCollectionRef = collection(database, "folders", user?.uid, "data");
                const unsubscribe = onSnapshot(userCollectionRef, (snapshot) => {
                    const newDataList = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setDataList(newDataList);
                });
                return () => unsubscribe();
            }
        }
        getCollectionData();
    }, [user?.uid, database]);

    const hanldeDelete = useCallback(async () => {
        if(id && user?.uid){
            const childDocs = dataList.filter((doc) => doc.parent === id);
            for (const childDoc of childDocs) {
                const docRefChid = doc(database, "folders", user?.uid, "data", childDoc.id);
                await deleteDoc(docRefChid);
            }
            const docRef = doc(database, "folders", user?.uid, "data", id);
            await deleteDoc(docRef);

            notifications.show({
                title: 'Successfully deleted',
                message: 'Your data has been deleted successfully in the database',
                icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
            })
            navigate(previewUrl)
        }else{
            notifications.show({
                color: 'red',
                title: 'Error deleting',
                message: 'Something went wrong! Please try again',
                icon: <IconFaceIdError style={{ width: rem(18), height: rem(18) }} />,
            })
        }
    },[id, user?.uid, database, dataList])

    const handleUpdateTitle = useCallback(async () => {
    
        const initialData = {
            title: form.getTransformedValues().title,
        }

        if (user?.uid && id && title != initialData.title) {
            const docRef = doc(database, "folders", user?.uid, "data", id);
            if (initialData.title !== undefined) {
                await updateDoc(docRef, initialData);
                notifications.show({
                    title: 'Successfully updated',
                    message: 'Your data has been saved successfully in the database',
                    icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
                })
            } else {
                notifications.show({
                    color: 'red',
                    title: 'Error updating',
                    message: 'Your data is undefined!',
                    icon: <IconFaceIdError style={{ width: rem(18), height: rem(18) }} />,
                })
            }
        }else return;
    },[user?.uid, id, form])

    useOutsideClick(inputRef, () => {
        setIsEditTitle(false);
        handleUpdateTitle();
    });

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
    
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                            {!!id && type =='folder' && (
                                <div
                                    className={styles.expand}
                                    onClick={handleExpand}
                                    role='buttton'
                                >
                                    {isOpen === true ? <IconChevronDown size={16} /> : <IconChevronLeft size={16} />}
                                </div>
                            )}
                            {!!id && type == 'file' && (
                                <div
                                    className={styles.expand_file}
                                    onClick={handleExpand}
                                    role='buttton'
                                >
                                    <IconFile size={15} className={styles.icon_file}/>
                                </div>
                            )}
                            {!isEditTitle ? (
                                <Text 
                                    onClick={() => {
                                        if(!children && type == 'file'){
                                            navigate(`/documents/${id}`)
                                        }
                                        toggleNode()
                                    }} 
                                    size={'sm'}
                                    style={{
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        width: '100%',
                                    }}
                                    maw={100}
                                    onDoubleClick={() => setIsEditTitle(true)}
                                >
                                    {title}
                                </Text>
                            ):(
                                <>
                                    <TextInput
                                        ref={inputRef}
                                        withAsterisk
                                        placeholder="Your title"
                                        className={styles.input_edit_title}
                                        size={'sm'}
                                        {...form.getInputProps('title')}
                                        m={'lg'}
                                    />
                                    {windowWidth < 555 && (
                                        <div
                                            className={styles.save_title}
                                            role='buttton'
                                            onClick={() => {
                                                setIsEditTitle(!isEditTitle)
                                                handleUpdateTitle();
                                            }}
                                        >
                                            <CheckIcon size={16} />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <div className={styles.actions}>
                            {!!id && type =='folder' && isEditTitle == false && (
                                <>
                                    <div
                                        className={styles.plus}
                                        role='buttton'
                                        onClick={() => {
                                            handleCreateNewItem('folder')
                                            setIsOpen(true)
                                        }}
                                    >
                                        <IconFolderPlus size={16} />
                                    </div>
                                    <div
                                        className={styles.plus}
                                        role='buttton'
                                        onClick={() => {
                                            handleCreateNewItem('file')
                                            setIsOpen(true)
                                        }}
                                    >
                                        <IconFilePlus size={16} />
                                    </div>
                                </>
                            )}
                            {windowWidth < 555 && isEditTitle == false && (
                                <div
                                    className={styles.plus}
                                    role='buttton'
                                    onClick={() => {
                                        setIsEditTitle(true)
                                    }}
                                >
                                    <IconEdit size={16} />
                                </div>
                            )}
                            {isEditTitle == false && (
                                <div
                                    className={styles.trash}
                                    role='buttton'
                                    onClick={() => hanldeDelete()}
                                >
                                    <IconTrash size={16} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {isOpen && children && children?.map(child => <Item 
                                                        children={child.children} 
                                                        id={child.id} 
                                                        key={child.id} 
                                                        level={child.level}
                                                        title={child.title}
                                                        type={child.type}
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
    type: string;
    parent: string;
    children?: Item[];
}

export const ItemComponent: React.FC<{ item: Item }> = ({ item }) => (
    <div style={{ marginLeft: 12 * item.level }}>
        <p>{item.title}</p>
        {item.children && item.children.map(child => <ItemComponent key={child.id} item={child} />)}
    </div>
);