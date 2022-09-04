export const utilService = {
    makeId,
    getExactDate,
    avgTemp,
    checkDegreesType,
    getRelevantJsonByTemp,
    isValidPlace,
    isEnglishChar
}

function makeId(length = 6) {
    let txt = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getExactDate(UNIX_timestamp) {
    let a = new Date(typeof UNIX_timestamp === 'string' ? UNIX_timestamp : UNIX_timestamp * 1000)
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayOfWeek = days[a.getDay()]
    let date = a.getDate()
    let time = date + ' ' + dayOfWeek
    return time
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function avgTemp(min, max, type) {
    const avg = (min + max) / 2
    if (type === 'F') return avg
    else return fahrenheitToCelsius(avg).toFixed(0)
}

function checkDegreesType(type) {
    if (type === 'F') return <span>&#8457;</span>
    else return <span>&#8451;</span>
}

function getRelevantJsonByTemp(temp, type = 'C') {
    if (getCurrTime() === 'evening') return require('../assets/lottie/night.json')
    else if (temp >= 80 || (type !== 'F' && temp >= 26)) return require('../assets/lottie/hot.json')
    else if (temp >= 70 || (type !== 'F' && temp >= 19)) return require('../assets/lottie/sunny.json')
    else if (temp >= 60 || (type !== 'F' && temp >= 16)) return require('../assets/lottie/cloudy.json')
    else if (temp >= 40 || (type !== 'F' && temp >= 4)) return require('../assets/lottie/rain.json')
    else return require('../assets/lottie/snow.json')
}

function getCurrTime() {
    const today = new Date()
    const curHr = today.getHours()

    if (curHr < 12) {
        return 'morning'
    } else if (curHr < 18) {
        return 'afternoon'
    } else {
        return 'evening'
    }
}

function isValidPlace(place) {
    const regex = /^([a-zA-Zà-úÀ-Ú]{,})*([a-zA-Zà-úÀ-Ú\s]{2,})+$/
    return regex.test(place)

}

function isEnglishChar(sentences = 'asd asd asd') {
    const regex = /^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/
    return regex.test(sentences)
}