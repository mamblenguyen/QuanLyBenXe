import React, { useEffect, ReactNode } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface AnimatedBoxProps {
    children: ReactNode;
    animation?: string;
    delay?: number;
    duration?: number;
}

const AnimatedBox: React.FC<AnimatedBoxProps> = ({
    children,
    animation = 'fade-up',
    delay = 0,
    duration = 1000,
}) => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <div
            data-aos={animation}
            data-aos-delay={delay}
            data-aos-duration={duration}
        >
            {children}
        </div>
    );
};

export default AnimatedBox;
