const isNumberedLine = (text: string): boolean => {
    return /^[0-9]+\./.test(text.trim());
};

const formatToStrong = (text: string): string => {
    return text
            .replace(/^[0-9]+\.\s*/, "")
            .replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>");
};

export { isNumberedLine, formatToStrong }
