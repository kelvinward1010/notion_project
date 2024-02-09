import { ActionIcon, Avatar, Button, Group, Popover, Text, Title, rem, useMantineColorScheme } from '@mantine/core';
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { User, signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useDisclosure } from '@mantine/hooks';
import { Auth } from './auth/Auth';
import { notifications } from '@mantine/notifications';
import { IconArrowRight, IconCheck, IconMoon, IconSun } from '@tabler/icons-react';
import { useAuth } from '../../context/authContext';
import { useState } from 'react';
import { previewUrl } from '../../urls';

export function Landing() {

    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const [opened2, setOpened2] = useState(false);

    const toggleColorScheme = () => {
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    };
    const user: User = useAuth();

    const hanldeSignOut = () => {
        signOut(auth).then(() => {
            notifications.show({
                title: 'User signed out',
                message: 'User signed out',
                icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
            })
        }).catch((error) => {
            notifications.show({
                color: 'red',
                title: 'User sign out Failed',
                message: error,
            })
        });
    }

    return (
        <div className={styles.container}>
            <Auth opened={opened} close={close} />
            <div className={styles.top}>
                {user && (
                    <>
                        <Popover opened={opened2} onChange={setOpened2}>
                            <Popover.Target>
                                <Group className={styles.info} gap={5} onClick={() => setOpened2(!opened2)}>
                                    <Avatar radius="xl" src={user?.photoURL} />
                                    <Text>{user?.displayName || user?.email}</Text>
                                </Group>
                            </Popover.Target>

                            <Popover.Dropdown>
                                <Button
                                    variant="default"
                                    rightSection={<IconArrowRight size={14} />}
                                    onClick={hanldeSignOut}
                                >
                                    Log out
                                </Button>
                            </Popover.Dropdown>
                        </Popover>
                    </>
                )}
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
            </div>
            <div className={styles.center_landing}>
                <Title order={3}>Notion Application Web</Title>
                {user ? (
                    <>
                        <Button onClick={() => navigate(previewUrl)} className={styles.button}>
                            Next to create your idea!
                        </Button>
                    </>
                ) : (
                    <Button onClick={open} className={styles.button}>
                        Next step!
                    </Button>
                )}
            </div>
        </div>
    )
}