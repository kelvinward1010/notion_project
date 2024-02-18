import { useState } from 'react';
import styles from './style.module.scss';
import { Avatar, Button, Popover, Text, rem } from '@mantine/core';
import { IconArrowRight, IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { signOut } from 'firebase/auth';
import { notifications } from '@mantine/notifications';
import { auth } from '../../../lib/firebase';
import { useTranslation } from 'react-i18next';

export function User() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [opened, setOpened] = useState(false);
    const user = useAuth();

    const hanldeSignOut = () => {
        signOut(auth).then(() => {
            notifications.show({
                title: t("notifications.signout.successTitle"),
                message: t("notifications.signout.successSubTitle"),
                icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
            })
            navigate('/')
        }).catch((error) => {
            notifications.show({
                color: 'red',
                title: t("notifications.signout.errorTitle"),
                message: error,
            })
        });
    }

    return (
        <Popover opened={opened} onChange={setOpened}>
            <Popover.Target>
                <Avatar.Group className={styles.avatar_group} onClick={() => setOpened((o) => !o)}>
                    <Avatar radius="xl" src={user?.photoURL}/>
                    <Text c={'teal.5'} className={styles.name}>{user?.displayName || user?.email}</Text>
                </Avatar.Group>
            </Popover.Target>

            <Popover.Dropdown>
                <Button
                    variant="default"
                    rightSection={<IconArrowRight size={14} />}
                    onClick={hanldeSignOut}
                >
                    {t('navigation.labelSignout')}
                </Button>
            </Popover.Dropdown>
        </Popover>
    )
}
