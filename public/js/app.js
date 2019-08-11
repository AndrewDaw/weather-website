



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
                messageThree.textContent=''
                var msg = ''
                var re = /\d\d[:]\d\d/
                for(i = 0; i < 6; i++){
                    const time = re.exec(new Date(data.temps[i].dt*1000))[0]
                    const temp = data.temps[i].main.temp
                    const weather = data.temps[i].weather[0].description
                    msg = time + " : " + temp +"C with " + weather+". "

                    var para = document.createElement("p");
                    node = document.createTextNode(msg);
                    para.appendChild(node);

                    
                    messageThree.appendChild(para);
                }
                
            }
        })
    })

})