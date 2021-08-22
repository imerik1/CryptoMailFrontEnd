import createToken from './createToken';

const createHeader = () => {
    const header = new Headers();
    header.set("Content-type", "application/json")
    header.set("Accept", "*/*")
    header.set("Authorization", createToken())
    return header;
}

export default createHeader;