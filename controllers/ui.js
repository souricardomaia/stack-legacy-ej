import { ClassicEditor, Essentials, Bold, Italic, Paragraph, Mention, BlockQuote } from 'ckeditor5'
import CustomButton from './editor.js'
import { apiRequest, apiKey } from './api.js'


export const uiCarouselCard = (infos) => {
    
    infos.image = infos.image != undefined ? infos.image : false
    infos.title = infos.title != undefined ? infos.title : 'Título'
    infos.link = infos.link != undefined ? infos.link : false
    infos.description = infos.description != undefined ? infos.description : ''
    infos.subdescription = infos.subdescription != undefined ? infos.subdescription : ''

    let html = `
        <div class="card mb-3" style="max-width: 540px">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${infos.image}" class="rounded-start" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">
                            ${infos.title}
                        </h5>
                        <p class="card-text">
                            ${infos.description}
                        </p>
                        <p class="card-text"><small class="text-muted">
                            ${infos.subdescription}
                        </small></p>
                        <a class="btn btn-outline-dark btn-sm" href="${infos.link}" target="_blank">Ver detalhes</a>
                    </div>
                </div>
            </div>
        </div>
    `

    return html
}


export const uiCarousel = async (element,options) => {

    if(!element)
    return
    
    options = options || {}
    options.query = options.query != undefined ? options.query : 'produtividade'
    options.options = options.options != undefined ? options.options : {}
    
    let owlOptions = {
        items: 1,
        loop: true,
        margin: 10,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
            0: {items: 1},
            600: {items: 1},
            1000: {items: 1}
        }
    }

    options.options = Object.keys(options.options).length != 0 ? {...options.options,...owlOptions} : owlOptions

    try {
        const response = await apiRequest({
            type: 'GET',
            end: `?q=${options.query}&key=${apiKey}`,
            callback: (data) => {
                let carouselContent = ''
                
                $.each(data.items, (i,item) => {
                    if(item.volumeInfo.imageLinks != undefined){
                        carouselContent += '<div>'
                        carouselContent += uiCarouselCard({
                            image: item.volumeInfo.imageLinks.thumbnail,
                            title: item.volumeInfo.title,
                            description: item.volumeInfo.subtitle,
                            subdescription: item.volumeInfo.authors[0],
                            link: item.volumeInfo.infoLink
                        })
                        carouselContent += '</div>'
                    }
                })
    
                $(document).find(element).html(`<div class="owl-carousel owl-theme">${carouselContent}</div>`)
                setTimeout(() => {
                    $(document).find(`${element} .owl-carousel`).owlCarousel(options.options)
                }, 500)
            }
        })

    } catch (error) { }
}



export const uiEditor = () => {
    
    ClassicEditor.create(document.querySelector( '#ej-editor'), {
        plugins: [Essentials, Bold, Italic, Paragraph, Mention, BlockQuote, CustomButton],
        toolbar: {
            items: ['bold', 'italic', '|', 'undo', 'redo', 'blockQuote', 'customButton']
        },
    })
    .then(editor => {
        editor.ui.view.editable.element.style.maxHeight = '200px'
        editor.ui.view.editable.element.style.overflowY = 'auto'
    } )
}


export const ui = () => {
    uiEditor()
    uiCarousel('.ej-carousel')
}