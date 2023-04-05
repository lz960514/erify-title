export const trimAll = (textStr: string): string => {
    const reg = /[\t\r\f\n\s]*/g
    if (textStr.length > 0) {
        return textStr.replace(reg, '')
    } else {
        return ''
    }
}

export const isStringSpace = (textStr: string): boolean => {
    const judgeFn = new RegExp(/\s+/g)
    return judgeFn.test(textStr)
}