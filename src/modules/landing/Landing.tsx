import { ActionIcon, Button, useMantineColorScheme } from '@mantine/core';
import styles from './style.module.scss';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export function Landing() {

    const navigate = useNavigate();
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    const toggleColorScheme = () => {
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className={styles.container}>
            <ActionIcon
                variant="default"
                size={35}
                onClick={toggleColorScheme}
            >
                {colorScheme == 'dark'
                    ? <IconSun />
                    : <IconMoon />
                }
            </ActionIcon >
            <Button className={styles.button} onClick={() => navigate('/documents/preview')}>
                Get in Notion
            </Button>
        </div>
    )
}