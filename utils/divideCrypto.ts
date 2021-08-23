const divideCrypto = (token: any | string) => {
    const size = token.length;
    const parts = parseInt((size / 8).toFixed());
    var final: string = "";
    var max: number = parts;
    for (let index in token) {
        let char = parseInt(index)
        console.log(max, char)
        if (max === char) {
            max = max + parts;
            final = final + " ";
        }
        final = final + token[char];
    }
    return final.toString();
}

export default divideCrypto;