export function slugify(str) {
    str.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function truncateText(str, maxLength) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
    }
    return str;
}

export const formatCompactNumber = (value, maxDecimals = 1) => {
    if (value === undefined || value === null || isNaN(value)) return '0';

    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: maxDecimals
    }).format(value);
};

export function removeDashesAndUnderscores(str) {
    return str.replace(/[_-]/g, ' ');
}

export function formatDate(dateString) {
    const d = new Date(dateString);
    return `${d.getDate()} ${d.toLocaleString('en', { month: 'short' })} ${d.getFullYear()}`;
};