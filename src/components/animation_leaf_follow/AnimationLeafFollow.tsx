import { useEffect, useState } from 'react';
import styles from './style.module.scss';

export function AnimationLeafFollow() {

    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setPosition({
                x: event.clientX,
                y: event.clientY
            });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div
                className={styles.leaf}
                style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`
                }}
            />
        </>
    )
}
