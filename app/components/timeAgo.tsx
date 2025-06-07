

export default function timeAgo(dateString: Date | string) {
    const now: Date = new Date();
    const date: Date = new Date(dateString);
    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

    const absDiffInSeconds = Math.abs(diffInSeconds);

    if (absDiffInSeconds < 60) {
        return diffInSeconds < 0
            ? `${absDiffInSeconds} s`
            : `in ${absDiffInSeconds} s`;
    } else if (absDiffInSeconds < 3600) {
        const minutes = Math.floor(absDiffInSeconds / 60);
        return diffInSeconds < 0
            ? `${minutes} mn${minutes > 1 ? 's' : ''}`
            : `in ${minutes} mn${minutes > 1 ? 's' : ''}`;
    } else if (absDiffInSeconds < 86400) {
        const hours = Math.floor(absDiffInSeconds / 3600);
        return diffInSeconds < 0
            ? `${hours} hr${hours > 1 ? 's' : ''}`
            : `in ${hours} hr${hours > 1 ? 's' : ''}`;
    } else if (absDiffInSeconds < 604800) {
        const days = Math.floor(absDiffInSeconds / 86400);
        return diffInSeconds < 0
            ? `${days} d`
            : `in ${days} d`;
    } else {
        const weeks = Math.floor(absDiffInSeconds / 604800);
        return diffInSeconds < 0
            ? `${weeks} w${weeks > 1 ? 's' : ''}`
            : `in ${weeks} w${weeks > 1 ? 's' : ''}`;
    }
}
