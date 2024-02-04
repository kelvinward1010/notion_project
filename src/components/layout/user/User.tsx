import { useState } from 'react';
import styles from './style.module.scss';
import { Avatar, Button, Popover, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export function User() {

    const navigate = useNavigate();
    const [opened, setOpened] = useState(false);

    return (
        <Popover opened={opened} onChange={setOpened}>
            <Popover.Target>
                <Avatar.Group className={styles.avatar_group} onClick={() => setOpened((o) => !o)}>
                    <Avatar radius="xl" />
                    <Text c={'teal.5'} className={styles.name}>kelvin ward's notion</Text>
                </Avatar.Group>
            </Popover.Target>

            <Popover.Dropdown>
                <Button
                    variant="default"
                    rightSection={<IconArrowRight size={14} />}
                    onClick={() => navigate('/')}
                >
                    Log out
                </Button>
            </Popover.Dropdown>
        </Popover>
    )
}
