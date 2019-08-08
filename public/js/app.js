



const weatherForm = document.querySelector('form')
const searchEle = document.querySelector('input')
const messageOne = document.querySelector('#m1')
const messageTwo = document.querySelector('#m2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchEle.value
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
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
})