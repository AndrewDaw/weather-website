



const weatherForm = document.querySelector('form')
const searchEle = document.querySelector('input')
const messageOne = document.querySelector('#m1')
const messageTwo = document.querySelector('#m2')
const messageThree = document.querySelector('#m3')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchEle.value
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent =''
                messageThree.textContent =''
            }else{
                messageOne.textContent ='It is ' + data.temp+'C with '+ data.forecast
                messageTwo.textContent = data.location
            }
        })
    })

    fetch('/day-temps?address='+location).then((response) => {
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent =''
                messageThree.textContent =''
            }else{
                messageThree.textContent = 'Morning:'+data.tempMorn + 'C Lunch:'+data.tempLunch + 'C Evening:'+data.tempEve+'C'
            }
        })
    })

})