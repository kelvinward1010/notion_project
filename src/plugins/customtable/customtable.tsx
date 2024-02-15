import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { IconColumnInsertLeft, IconColumnInsertRight, IconColumnRemove, IconRowInsertBottom, IconRowInsertTop, IconRowRemove, IconTable, IconTableOff, IconTableOptions } from "@tabler/icons-react";
import {  Group, Popover, Text } from "@mantine/core";


export function InsertTableControl() {
    const { editor } = useRichTextEditorContext();

    const insertTable = () => {
        editor?.chain().insertTable(
            {
                rows: 3,
                cols: 3,
                withHeaderRow: true
            },
        ).run();
    };

    //Columns
    const deleteTable = () => {
        editor?.commands.deleteTable()
    };

    //Columns
    const addColumnBefore = () => {
        editor?.commands.addColumnBefore()
    };

    const addColumnAfter = () => {
        editor?.commands.addColumnAfter()
    };

    const deleteColumn = () => {
        editor?.commands.deleteColumn();
    }

    //Rows
    const addRowAfter = () => {
        editor?.commands.addRowAfter();
    }

    const addRowBefore = () => {
        editor?.commands.addRowBefore();
    }

    const deleteRow = () => {
        editor?.commands.deleteRow();
    }

    const moreTools = () => {
        return (
            <div>
                <Group maw={150} justify={'space-between'}>
                    <Text size="10px">Table: </Text>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Control
                            onClick={deleteTable}
                            title="Delete table"
                            color='white'
                        >
                            <IconTableOff stroke={1.5} size="1rem" />
                        </RichTextEditor.Control>
                    </RichTextEditor.ControlsGroup>
                </Group>
                <Group maw={150} justify={'space-between'}>
                    <Text size="10px">Colums: </Text>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Control
                            onClick={addColumnBefore}
                            title="Add column before"
                            color='white'
                        >
                            <IconColumnInsertLeft stroke={1.5} size="1rem" />
                        </RichTextEditor.Control>
                        <RichTextEditor.Control
                            onClick={addColumnAfter}
                            title="Add column after"
                            color='white'
                        >
                            <IconColumnInsertRight stroke={1.5} size="1rem" />
                        </RichTextEditor.Control>
                        <RichTextEditor.Control
                            onClick={deleteColumn}
                            title="Delete column"
                            color='white'
                        >
                            <IconColumnRemove stroke={1.5} size="1rem" />
                        </RichTextEditor.Control>
                    </RichTextEditor.ControlsGroup>
                </Group>
                <Group maw={150} justify={'space-between'}>
                    <Text size="10px">Rows: </Text>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Control
                            onClick={addRowBefore}
                            title="Add row before"
                            color='white'
                        >
                            <IconRowInsertTop stroke={1.5} size="1rem" />
                        </RichTextEditor.Control>
                        <RichTextEditor.Control
                            onClick={addRowAfter}
                            title="Add row after"
                            color='white'
                        >
                            <IconRowInsertBottom stroke={1.5} size="1rem" />
                        </RichTextEditor.Control>
                        <RichTextEditor.Control
                            onClick={deleteRow}
                            title="Delete row"
                            color='white'
                        >
                            <IconRowRemove stroke={1.5} size="1rem" />
                        </RichTextEditor.Control>
                    </RichTextEditor.ControlsGroup>
                </Group>
            </div>
        )
    }

    return (
        <>
            <RichTextEditor.ControlsGroup>
                <RichTextEditor.Control
                    onClick={insertTable}
                    aria-label="Insert table"
                    title="Insert table"
                    color='white'
                >
                    <IconTable stroke={1.5} size="1rem" />
                </RichTextEditor.Control>
                <Popover width={200} position="bottom" clickOutsideEvents={['mouseup', 'touchend']}>
                    <Popover.Target>
                        <RichTextEditor.Control
                            aria-label="More table tools"
                            title="More table tools"
                            color='white'
                        >
                            <IconTableOptions stroke={1.5} size="1rem" />
                        </RichTextEditor.Control>
                    </Popover.Target>
                    <Popover.Dropdown>
                        {moreTools()}
                    </Popover.Dropdown>
                </Popover>
            </RichTextEditor.ControlsGroup>
        </>
    );
}