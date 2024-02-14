import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { IconStar } from "@tabler/icons-react";


export function InsertStarControl() {
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