import styles from './style.module.scss';
import { RichTextEditor, Link, useRichTextEditorContext } from '@mantine/tiptap';
import { BubbleMenu, useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { Title } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import { database } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

function InsertStarControl() {
    const { editor } = useRichTextEditorContext();
    return (
        <RichTextEditor.Control
            onClick={() => editor?.commands.insertContent('⭐')}
            aria-label="Insert star emoji"
            title="Insert star emoji"
        >
            <IconStar stroke={1.5} size="1rem" />
        </RichTextEditor.Control>
    );
}

export function Documents() {

    const user: User = useAuth();
    const idParam: any = useParams().id;
    const [data, setData] = useState<any>();

    const content = data?.content;

    useEffect(() => {
        const getDocumentData = async () => {
            if (user?.uid && idParam) {
                const docRef = doc(database, "folders", user?.uid, "data", idParam);
                const docSnap = await getDoc(docRef);
    
                if (docSnap.exists()) {
                    setData(docSnap.data());
                }
            }
        }
        getDocumentData();
    },[user?.uid, idParam, database])

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
        ],
        content,
    },[data?.content]);
    
    return (
        <div className={styles.container}>
            <Title order={2} m={'lg'}>{data?.title}! - level: {data?.level}</Title>
            <div>
                <RichTextEditor editor={editor}>
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
