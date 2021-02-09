export const substrings = (string) => {
    let substrings = []
    let chars = string.split('')

    for (let i = 0; i < chars.length; i++) {
        for (let j = i + 1; j <= chars.length; j++) {
            let substring = string.slice(i, j)
            substrings.push(substring)
        }
    }

    return substrings
}

export const modifyTime = (time) => {
    let timeStrings = time.split(' ')
    let digit = timeStrings.find((char) => Number.isInteger(parseInt(char)))

    if (timeStrings.includes('hours') || timeStrings.includes('hour')) {
        return digit ? `${digit}h` : `1h`
    } else if (
        timeStrings.includes('minutes') ||
        timeStrings.includes('minute')
    ) {
        return digit ? `${digit}m` : `1m`
    } else if (timeStrings.includes('weeks') || timeStrings.includes('week')) {
        return digit ? `${digit}w` : `1w`
    } else if (timeStrings.includes('days') || timeStrings.includes('day')) {
        return digit ? `${digit}d` : `1d`
    } else if (
        timeStrings.includes('seconds') ||
        timeStrings.includes('second')
    ) {
        return digit ? `${digit}s` : `1s`
    } else {
        return ''
    }
}
