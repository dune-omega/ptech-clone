setTimeout(function(){
    const prevSlider = document.getElementsByClassName('flex-prev')[0]
    const nextSlider = document.getElementsByClassName('flex-next')[0]
    
    prevSlider.innerHTML = '<'
    nextSlider.innerHTML = '>'
}, 50)
