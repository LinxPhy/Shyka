'use client'
import LeftArrow from "@/app/icons/left-arrow.png"
import RightArrow from "@/app/icons/right-arrow.png"
import Image from "next/image"
import styles from "./carousel.module.css"
import { Children, cloneElement, isValidElement, useRef } from "react";

export default function Carousel({ children }: { children: React.ReactNode }) {
    
    const wrapper = useRef <HTMLDivElement>(null)
    const scrollContainer  = useRef <HTMLDivElement>(null)

    const scrollX = (amount: number) => {

        const value = (scrollContainer.current?.clientWidth) as number * amount || 1000

        if (scrollContainer  && scrollContainer.current) {
            scrollContainer.current.scrollLeft += value;
        }
    }

    const childWithRef = Children.map(children, (child) =>
        isValidElement(child) ? cloneElement(child, { ref: scrollContainer } as any) : child
    );

    return (
        <div className={styles.carousel} ref={wrapper}>
            {childWithRef}

            <div className={`${styles.navigation} ${styles.left}`} onClick={() => scrollX(-1)}>
                <Image src={LeftArrow} alt="Left Arrow" width={18} height={18} />
            </div>
            <div className={`${styles.navigation} ${styles.right}`} onClick={() => scrollX(1)}>
                <Image src={RightArrow} alt="Right Arrow" width={18} height={18} />
            </div>
        </div>
    )

}