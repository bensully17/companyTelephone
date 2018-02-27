let baseURL = 'https://secure-eyrie-78012.herokuapp.com/'

fetch(baseURL + 'roles')
    .then(response => {
        return response.json()
    })
    .then(response => {
        let dropdown = document.querySelector('#drop')
        dropdown.addEventListener('change', updateImage)
        for (let i = 0; i < response.length; i++) {
            let newOption = document.createElement('option')
            newOption.textContent = response[i].label
            dropdown.appendChild(newOption)
        }
        
    })
    function updateImage(event) {
        let image = document.querySelector('img')
        image.setAttribute('src', baseURL + 'images/' + event.target.value.toLowerCase() + '.jpg')                  
    }

const form = document.querySelector('form')
form.addEventListener('submit', submitButtonPressed)

function submitButtonPressed(event) {
    event.preventDefault()
    
    const newFormData = new FormData(form)
    const fName = newFormData.get('first_name')
    const lName = newFormData.get('last_name')
    let role1 = newFormData.get('drop')
    if (role1 == 'Assassin'){role1 = 1}
    else if (role1 == 'Commando'){role1 = 2}
    else if (role1 == 'Siren'){role1 = 3}
    fetch(`${baseURL}users`, {
        method: 'POST',
        body: JSON.stringify({
            firstName: fName, 
            lastName: lName,
            role: role1,
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => {  
        if (!response.ok) {
            throw new Error(response.statusText)
            console.Error('oops')
        }
        else return response.json()
    })
    .then(response => {
       let message = document.querySelector('.message') 
       function setMessage() {
           message.textContent = response.message          
        }
        setMessage()
        setTimeout(() => {
            message.textContent = ''
        }, 4000)
})

}
    


    