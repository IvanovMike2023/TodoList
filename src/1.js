function getCount(str) {
    console.log('cacasca')
    console.log(str.length- str.replace(/[aeiou]/gi,'').length)
    return str.length- str.replace(/[aeiou]/gi,'').length;

}

getCount('csaciacooiiii')
