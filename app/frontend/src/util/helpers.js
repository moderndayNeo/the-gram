export const substrings = string => {
    let substrings = [];
    let chars = string.split('');

    for (let i = 0; i < chars.length; i++) {
        for (let j = i + 1; j <= chars.length; j++) {
            let substring = string.slice(i, j);
            substrings.push(substring);
        }
    }

    return substrings;
};