import { ClassicEditor, Essentials, Bold, Italic, Paragraph, Mention, BlockQuote } from 'ckeditor5'
import CustomButton from './editor.js'

export const uiCarousel = (target, options) => {

    if(!target)
    return

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
}