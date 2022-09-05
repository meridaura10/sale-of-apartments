export function addImages(selector, options) {
    const input = document.querySelector(selector.input)
    const preview = document.querySelector(selector.preview)
    const open = document.querySelector(selector.btn)

    if (options.multi) {
        input.setAttribute('multiple', true)
    }

    if (options.accept && Array.isArray(options.accept)) {
        input.setAttribute('accept', options.accept.join(','))
    }
    
    const triggerInput = () => input.click()
    const changeHandler = (event) =>{
        if (!event.target.files.length) {
          //  console.log('error')
            return
        }

        const files = Array.from(event.target.files)
        files.forEach(file =>{
            if (!file.type.match('image')) {
                //console.log('error');
                return
            }
           // console.log('ok');
            const reader = new FileReader()

            reader.onload = ev =>{  
                 const src = ev.target.result
                 preview.insertAdjacentHTML('afterbegin',  `<img class="preview-img" src="${src}" alt="">`)
            }
            reader.readAsDataURL(file)
        })
    }
    open.addEventListener('click', triggerInput)
    input.addEventListener('change', changeHandler)
}