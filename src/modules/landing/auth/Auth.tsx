import { Box, Button, Container, Flex, Group, Modal, PasswordInput, Text, TextInput, rem } from '@mantine/core';
import styles from './style.module.scss';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { IconBrandGoogle, IconCheck, IconFaceIdError } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useCallback, useState } from 'react';

interface AuthProps {
    opened: boolean;
    close: () => void;
}

export const Auth: React.FC<AuthProps> = ({
    opened,
    close,
}) => {

    const [isChangeForm, setIsChangeForm] = useState(false); 

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

    const formRegister = useForm({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 6 ? 'Password should be at least 6 characters' : null),
            confirmPassword: (value, values) => value !== values.password ? 'Passwords did not match' : null,
        },
    });

    const formLogin = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length == 0 ? 'You must be have password' : null),
        },
    });

    const dataRegister = {
        email: formRegister.getTransformedValues().email,
        password: formRegister.getTransformedValues().password,
    }

    const dataLogin = {
        email: formLogin.getTransformedValues().email,
        password: formLogin.getTransformedValues().password,
    }

    const hanldeLogin = useCallback(async () => {
        try {
            if(dataLogin.email && dataLogin.password){
                await signInWithEmailAndPassword(auth, dataLogin.email, dataLogin.password);
                notifications.show({
                    title: 'Successfully login',
                    message: 'Your data has been login successfully',
                    icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
                })
            }
        } catch (error) {
            notifications.show({
                color: 'red',
                title: 'Error logining',
                message: 'Something went wrong! Please try again',
                icon: <IconFaceIdError style={{ width: rem(18), height: rem(18) }} />,
            })
        }
    },[dataLogin])

    const hanldeRegister = useCallback(async () => {
        try {
            if(dataRegister.email && dataRegister.password){
                await createUserWithEmailAndPassword(auth, dataRegister.email, dataRegister.password);
                notifications.show({
                    title: 'Successfully registered',
                    message: 'Your data has been registered successfully in the database',
                    icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
                })
            }
        } catch (error) {
            notifications.show({
                color: 'red',
                title: 'Error registering',
                message: 'Something went wrong! Please try again',
                icon: <IconFaceIdError style={{ width: rem(18), height: rem(18) }} />,
            })
        }
    },[dataRegister])

    return (
        <Modal className={styles.container} opened={opened} onClose={close} size="xl" title="Authentication">
            <Container size="xxs" className={styles.center}>
                {isChangeForm ? (
                    <Box maw={340} mx="auto" my={10}>
                        <form onSubmit={formRegister.onSubmit(hanldeRegister)}>
                        <Text size={'xl'} c={'teal.4'} className={styles.title}>Sign Up</Text>
                        <TextInput mt="sm" label="Email" placeholder="Email" {...formRegister.getInputProps('email')} />
                        <PasswordInput
                            label="Password"
                            placeholder="Password"
                            {...formRegister.getInputProps('password')}
                        />

                        <PasswordInput
                            mt="sm"
                            label="Confirm password"
                            placeholder="Confirm password"
                            {...formRegister.getInputProps('confirmPassword')}
                        />
                        <Group justify="flex-end" mt="md">
                            <Text c="teal.4" style={{cursor: 'pointer'}} onClick={() => setIsChangeForm(!isChangeForm)}>You have an account!</Text>
                            <Button type="submit">Submit</Button>
                        </Group>
                        </form>
                    </Box>
                ):(
                    <Box maw={340} mx="auto" my={10}>
                        <form onSubmit={formLogin.onSubmit(hanldeLogin)}>
                        <Text size={'xl'} c={'teal.4'} className={styles.title}>Sign In</Text>
                        <TextInput mt="sm" label="Email" placeholder="Email" {...formLogin.getInputProps('email')} />
                        <PasswordInput
                            label="Password"
                            placeholder="Password"
                            {...formLogin.getInputProps('password')}
                        />
                        <Group justify="flex-end" mt="md">
                            <Text c="teal.4" style={{cursor: 'pointer'}} onClick={() => setIsChangeForm(!isChangeForm)}>You don't have an account!</Text>
                            <Button type="submit">Submit</Button>
                        </Group>
                        </form>
                    </Box>
                )}
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