export function unixToHumanReadable(unixTime) {
    const date = new Date(unixTime);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) { 
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else if (date.getFullYear() === today.getFullYear()) {
        return `${date.getMonth() + 1}-${date.getDate()}`;
    } else {
        return `${date.getFullYear().toString()}.${date.getMonth() + 1}.${date.getDate()}.`;
    }
}   