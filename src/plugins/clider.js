export function slider(options, numberOfPictures) {
    let offset = 0
    const sliderLine = document.querySelector(options.sliderLine) //.slider-line
    if (numberOfPictures > 1) {
        document.querySelector(options.sliderNext).addEventListener('click', () => { //.slider-next
            offset = offset + options.offset
         //   console.log(offset)
            if (offset > options.offset*(numberOfPictures - 1)) {
                offset = 0;
            }
            sliderLine.style.left = -offset + 'px'
        })
    
        document.querySelector(options.sliderPrev).addEventListener('click', () => { //.slider-prev
            offset = offset - options.offset
           // console.log(offset)
            if (offset < 0) {
                offset = options.offset*(numberOfPictures - 1)
            }
            sliderLine.style.left = -offset + 'px'
        })
    }
}