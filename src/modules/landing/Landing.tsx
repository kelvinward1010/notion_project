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
import { useTranslation } from 'react-i18next';

export function Landing() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const [opened2, setOpened2] = useState(false);
    const user: User = useAuth();
    const { i18n } = useTranslation();

    const handleChangeLanguagues = (language: string) => {
        i18n.changeLanguage(language);
        i18n.reloadResources();
    };
    const currentLanguage = i18n.language;

    const toggleColorScheme = () => {
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    };

    const hanldeSignOut = () => {
        signOut(auth).then(() => {
            notifications.show({
                title: t("notifications.signout.successTitle"),
                message: t("notifications.signout.successSubTitle"),
                icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
            })
        }).catch((error) => {
            notifications.show({
                color: 'red',
                title: t("notifications.signout.errorTitle"),
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
                <Popover width={200} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                        <div className={styles.languagues}>{currentLanguage === 'en' ? 'English': 'Vietnamese'}</div>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <div 
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '3px',
                            }}
                        >
                            <Button 
                                variant={'default'}
                                onClick={() => handleChangeLanguagues('en')}
                                style={{
                                    background: currentLanguage === 'en' ? 'teal' : '',
                                }}
                            >
                                EN
                            </Button>
                            <Button 
                                variant={'default'}
                                onClick={() => handleChangeLanguagues('vi')}
                                style={{
                                    background: currentLanguage === 'vi' ? 'teal' : '',
                                }}
                            >
                                VI
                            </Button>
                        </div>
                    </Popover.Dropdown>
                </Popover>
            </div>
            <div className={styles.center_landing}>
                <Title order={3}>{t("name_app")}</Title>
                {user ? (
                    <>
                        <Button onClick={() => navigate(previewUrl)} className={styles.button}>
                            {t("landing.action_2")}
                        </Button>
                    </>
                ) : (
                    <Button onClick={open} className={styles.button}>
                        {t("landing.action_1")}
                    </Button>
                )}
            </div>
        </div>
    )
}