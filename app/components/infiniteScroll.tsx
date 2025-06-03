import { useInView } from "react-intersection-observer"

interface InfiniteScrollContainerInterface extends React.PropsWithChildren {
    onBottomReached: () => void,
    className?: string
}

export default function InfiniteScrollContainer({ onBottomReached, children }: InfiniteScrollContainerInterface) {


    const { ref } = useInView({
        rootMargin: "200px",
        onChange: (inView) => {
            if (inView) {
                onBottomReached()
            }
        }
    })

    return (
        <div>
            {children}
            <div ref={ref} />
        </div>
    )
}