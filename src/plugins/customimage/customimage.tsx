import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { useCallback, useState } from "react";
import { IconPhoto } from "@tabler/icons-react";
import { Box, Button, Group, Popover, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";




export function InsertImageControl() {

    const editor  = useRichTextEditorContext();
    const [open, setOpen] = useState(false);

    const form = useForm({
        initialValues: {
            url: '',
        },

        validate: {
            url: (value) => (value.length > 0 ? null : 'Invalid url'),
        },
    });

    const urlImage = form.getTransformedValues().url;

    const addImage = useCallback(() => {
        if (urlImage) {
            editor?.editor?.commands.setImage({ src: urlImage });
            form.setFieldValue('url', '');
            setOpen(false);
        }
    },[urlImage])

    const insertLinkImage = () => {
        return (
            <div>
                <Box maw={340} mx="auto">
                    <TextInput 
                        label="URL image" 
                        {...form.getInputProps('url')}
                    />
                    <Group justify="flex-end" mt="md" gap={5}>
                        <Button color={'teal.6'} onClick={addImage}>Ok</Button>
                        <Button variant="default" onClick={() => setOpen(!open)}>Cancel</Button>
                    </Group>
                </Box>
            </div>
        )
    }

    return (
        <>
            <RichTextEditor.ControlsGroup>
                <Popover width={270} opened={open} position="bottom" clickOutsideEvents={['mouseup', 'touchend']}>
                    <Popover.Target>
                        <RichTextEditor.Control
                            aria-label="More table tools"
                            title="More table tools"
                            color='white'
                            onMouseDownCapture={() => setOpen(!open)}
                        >
                            <IconPhoto stroke={1.5} size="1rem" />
                        </RichTextEditor.Control>
                    </Popover.Target>
                    <Popover.Dropdown>
                        {insertLinkImage()}
                    </Popover.Dropdown>
                </Popover>
            </RichTextEditor.ControlsGroup>
        </>
    );
}