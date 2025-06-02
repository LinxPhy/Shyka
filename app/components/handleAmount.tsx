


export default function handleAmount(amount: number) {
    
    if (!amount) return 0;

    if (amount < 1000) return amount;
    if (amount < 10000) return `${amount / 100}k`;
    if (amount < 1000000) return `${amount / 1000}k`;
    return `${amount / 1000000}m`;


}