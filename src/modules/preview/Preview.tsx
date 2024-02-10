import { Blockquote } from '@mantine/core';
import styles from './style.module.scss';
import { IconInfoCircle } from '@tabler/icons-react';

export function Preview() {
    const icon = <IconInfoCircle />;
    return (
        <div className={styles.container}>
            <Blockquote color="blue" cite="- Kelvin Ward" icon={icon} mt="xl">
                Create with your favorite, awesome!
            </Blockquote>
        </div>
    )
}