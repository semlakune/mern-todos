const createToken = (len) => {
    let randomString = ''

    for (let i = 0; i < len; i++) {
        randomString += Math.random().toString(36).substr(2)
    }

    return randomString
}

module.exports = createToken