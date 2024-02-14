import styles from './style.module.scss';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useForm } from '@mantine/form';
import { BubbleMenu, useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header';
import Image from '@tiptap/extension-image'
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { Button, Group, TextInput, Title, rem } from '@mantine/core';
import { IconCheck, IconDeviceFloppy, IconEdit, IconFaceIdError } from '@tabler/icons-react';
import { database } from '../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useCallback, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { notifications } from '@mantine/notifications';
import { previewUrl } from '../../urls';
import {
    InsertImageControl,
    InsertStarControl, 
    InsertTableControl 
} from '../../plugins';


export function Documents() {

    const navigate = useNavigate();
    const user: User = useAuth();
    const idParam: any = useParams().id;
    const [data, setData] = useState<any>();
    const [cnt, setCnt] = useState<any>();
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [title, setTitle] = useState<string>();
    const content = data?.content;

    const form = useForm({
        initialValues: {
            title: data?.title,
        },
        validate: {
            title: (value) => (value.length <= 0 ? 'Name must have at least 1 letters' : null),
        },
    });

    useEffect(() => {
        if (data?.title) {
            form.setValues({ title: data?.title });
        }
    }, [data?.title]);

    useEffect(() => {
        const getDocumentData = async () => {
            if (user?.uid && idParam) {
                const docRef = doc(database, "folders", user?.uid, "data", idParam);
                const docSnap = await getDoc(docRef);
    
                if (docSnap.exists()) {
                    setData(docSnap.data());
                    setTitle(docSnap.data()?.title)
                }else{
                    navigate(previewUrl)
                }
            }
        }
        getDocumentData();
    },[user?.uid, idParam, database, navigate])

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Write your idea!' }),
            TextStyle,
            Color,
            Table.configure({ resizable: true }),
            TableRow,
            TableCell,
            TableHeader,
            Image,
        ],
        content,
    },[data?.content]);

    useEffect(() => {
        if (!editor) {
          return;
        }
    
        const handleUpdate = () => {
          setCnt(editor.getHTML())
        };
    
        editor.on('update', handleUpdate);
    
        return () => {
          editor.off('update', handleUpdate);
        };
    }, [editor]);
    
    const updateDocumentData = useCallback(async () => {
    
        const initialData = {
            content: cnt,
        }

        if (user?.uid && idParam) {
            const docRef = doc(database, "folders", user?.uid, "data", idParam);
            if (cnt !== undefined) {
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
        }
    },[user?.uid, idParam, cnt])
    
    const handleUpdateTitle = useCallback(async () => {
    
        const initialData = {
            title: form.getTransformedValues().title,
        }

        if (user?.uid && idParam) {
            const docRef = doc(database, "folders", user?.uid, "data", idParam);
            if (initialData.title !== undefined) {
                await updateDoc(docRef, initialData);
                notifications.show({
                    title: 'Successfully updated',
                    message: 'Your data has been saved successfully in the database',
                    icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
                })
                setTitle(initialData?.title)
                setIsEditTitle(!isEditTitle)
            } else {
                notifications.show({
                    color: 'red',
                    title: 'Error updating',
                    message: 'Your data is undefined!',
                    icon: <IconFaceIdError style={{ width: rem(18), height: rem(18) }} />,
                })
            }
        }
    },[user?.uid, idParam, form])
    
    return (
        <div className={styles.container}>
            <div className={styles.header_doc}>
                {isEditTitle ? (
                    <div>
                        <form className={styles.form_title}>
                            <TextInput
                                withAsterisk
                                placeholder="Your title"
                                {...form.getInputProps('title')}
                                m={'lg'}
                            />
                            <Group gap={5}>
                                <Button onClick={handleUpdateTitle} leftSection={<IconDeviceFloppy size={14} />} variant="default">
                                    Save title
                                </Button>
                                <Button onClick={() => setIsEditTitle(!isEditTitle)} variant="default">
                                    Cancel
                                </Button>
                            </Group>
                        </form>
                    </div>
                ): (
                    <div className={styles.title_form}>
                        <Title order={2} m={'lg'}>{title}</Title>
                        <Button m={'lg'} onClick={() => setIsEditTitle(!isEditTitle)} leftSection={<IconEdit size={14} />} variant="default">
                            Edit title
                        </Button>
                    </div>
                )}
                <Button m={'lg'} onClick={updateDocumentData} leftSection={<IconDeviceFloppy size={14} />} variant="default">
                    Save Content
                </Button>
            </div>
            <div>
                <RichTextEditor mih={200} editor={editor}>
                    {editor && (
                        <BubbleMenu editor={editor}>
                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                                <RichTextEditor.Highlight />
                                <RichTextEditor.Code />
                                <RichTextEditor.Link />
                            </RichTextEditor.ControlsGroup>
                        </BubbleMenu>
                    )}
                    <RichTextEditor.Toolbar sticky>
                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Bold />
                            <RichTextEditor.Italic />
                            <RichTextEditor.Underline />
                            <RichTextEditor.Strikethrough />
                            <RichTextEditor.ClearFormatting />
                            <RichTextEditor.Highlight />
                            <RichTextEditor.Code />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.H1 />
                            <RichTextEditor.H2 />
                            <RichTextEditor.H3 />
                            <RichTextEditor.H4 />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.ColorPicker
                                colors={[
                                    '#25262b',
                                    '#868e96',
                                    '#fa5252',
                                    '#e64980',
                                    '#be4bdb',
                                    '#7950f2',
                                    '#4c6ef5',
                                    '#228be6',
                                    '#15aabf',
                                    '#12b886',
                                    '#40c057',
                                    '#82c91e',
                                    '#fab005',
                                    '#fd7e14',
                                ]}
                            />
                        </RichTextEditor.ControlsGroup>

                        <InsertStarControl />
                        <InsertImageControl />
                        <InsertTableControl />

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Blockquote />
                            <RichTextEditor.Hr />
                            <RichTextEditor.BulletList />
                            <RichTextEditor.OrderedList />
                            <RichTextEditor.Subscript />
                            <RichTextEditor.Superscript />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Link />
                            <RichTextEditor.Unlink />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.AlignLeft />
                            <RichTextEditor.AlignCenter />
                            <RichTextEditor.AlignJustify />
                            <RichTextEditor.AlignRight />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                            <RichTextEditor.Undo />
                            <RichTextEditor.Redo />
                        </RichTextEditor.ControlsGroup>
                    </RichTextEditor.Toolbar>

                    <RichTextEditor.Content />
                </RichTextEditor>
            </div>
        </div>
    )
}
