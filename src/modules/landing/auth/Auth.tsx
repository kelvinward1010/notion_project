import { Container, Flex, Group, Modal, Text, rem } from '@mantine/core';
import styles from './style.module.scss';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { IconBrandGoogle, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface AuthProps {
    opened: boolean;
    close: () => void;
}

export const Auth: React.FC<AuthProps> = ({
    opened,
    close,
}) => {

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            if (result.user) {
                notifications.show({
                    title: 'Login successfully',
                    message: 'User signed in successfully',
                    icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
                })
            }
        } catch (error) {
            notifications.show({
                color: 'red',
                title: 'Login Failed',
                message: 'Login failed',
            })
        }
    };

    return (
        <Modal className={styles.container} opened={opened} onClose={close} size="xl" title="Authentication">
            <Container size="xxs" className={styles.center}>
                <Flex
                    mih={50}
                    bg="rgba(0, 0, 0, .3)"
                    gap="md"
                    justify="center"
                    align="center"
                    direction="column"
                    wrap="nowrap"
                >
                    <Group gap={5} className={styles.auth_other} onClick={signInWithGoogle}>
                        <IconBrandGoogle color='red' />
                        <Text>Google</Text>
                    </Group>
                </Flex>
            </Container>
        </Modal>
    )
}