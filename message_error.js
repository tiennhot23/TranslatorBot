const arr = ['Hmmm... What the fuck you are saying, my friend?',
'English please!!, I can not understand what the fuck u are saying',
'LỖI LỖI LỖI,  đm gõ ng* quá éo dịch được, thông cảm!',
'Shit, i dont understand it... Maybe my fuckin boss hasnt programmed me to respond to messages like this ']


// var random_nr = Math.floor(Math.random()*arr.length)
// var random_array_member = arr[random_nr]

module.exports = {
    get random_array_member(){
        var random_nr = Math.floor(Math.random()*arr.length);
        return arr[random_nr];
    }  
}