export const utilsDelay = (callback, delay) => {
    
    delay = delay || 2000
    callback = callback || false

    if(!callback){
        return
    }

    let doCallback = callback
    
    setTimeout(() => {
        doCallback()              
    }, delay)
}


export const utilsClone = (element, withDataAndEvents = false) => {
    const clone = element.cloneNode(true)
    if (withDataAndEvents) {
        const events = element.querySelectorAll('*')
        events.forEach((el) => {
            for (let i = 0; i < el.attributes.length; i++) {
                if (el.attributes[i].name.startsWith("on")) {
                    clone.addEventListener(
                        el.attributes[i].name.slice(2),
                        el[el.attributes[i].name]
                    )
                }
            }
        })
    }
  
    return clone
}


export const utilsTextToHTML = (text, classNames = []) => {
    const paragraphs = text.split(/\n\s*\n/)
    const htmlElements = paragraphs.map(paragraph => {
        const pElement = document.createElement('p')
        pElement.textContent = paragraph.trim()

        if (classNames.length > 0) {
            classNames.forEach(className => {
                pElement.classList.add(className)
            })
        }

        return pElement
    })
    return htmlElements.map(element => element.outerHTML).join('')
}


export const utilsGravatar = (email, size) => {
    size = size || 50
    return `https://secure.gravatar.com/avatar/${MD5(email)}?size=${size}`
}