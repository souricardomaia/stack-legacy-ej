import { Plugin } from 'ckeditor5'
import { ButtonView } from 'ckeditor5'

export default class CustomButton extends Plugin {
    init() {
        const editor = this.editor

        editor.ui.componentFactory.add('customButton', locale => {
            const view = new ButtonView(locale)

            view.set({
                label: 'Citação',
                withText: true,
                tooltip: true,
                icon: `<svg viewBox="0 0 124 167" xmlns="http://www.w3.org/2000/svg">
<path d="m26.118 38.953c-20.894 11.144-26.118 42.949-26.118 57.459 20.894-41.788 64.424-43.53 92.282-57.459 22.287-11.144 24.377-30.18 22.636-38.306-20.894 8.1255-67.906 27.162-88.8 38.306z" fill="#F21F3C"/>
<path d="m31.341 79c-22.287 11.144-30.18 37.145-31.341 48.753 4.0628-8.126 19.849-26.466 50.494-34.824 30.645-8.3577 34.824-26.698 33.082-34.824-8.1255 2.3216-29.948 9.7506-52.235 20.894z" fill="#F21F3C"/>
<path d="m34.824 110.34c-26.466 16.715-34.243 44.11-34.824 55.718 24.376-45.271 78.353-43.53 100.99-52.235 18.108-6.965 22.636-26.118 22.636-34.824-18.573 3.4824-62.335 14.626-88.8 31.341z" fill="#F21F3C"/>
</svg>`
            })

            view.on('execute', () => {
                $.getJSON('../datas/phrases.json', (data) => {
                    let phrase = data[Math.floor(Math.random() * data.length)]

                    editor.model.change(writer => {
                        const root = editor.model.document.getRoot()
                        const blockQuote = writer.createElement('blockQuote')
                        const authorParagraph = writer.createElement('paragraph')
                        const messageParagraph = writer.createElement('paragraph')

                        writer.insertText(`${phrase['autor']}:`, { bold: true, italic: true }, authorParagraph)
                        writer.insertText(`${phrase['frase']}`, messageParagraph)

                        writer.append(authorParagraph, blockQuote)
                        writer.append(messageParagraph, blockQuote)

                        const replyParagraph = writer.createElement('paragraph')

                        writer.append(blockQuote, root)
                        writer.append(replyParagraph, root)
                        writer.remove(root.getChild( 0 ))
                        writer.setSelection(replyParagraph, 'in')
                    })
                })
            })

            return view
        })
    }
}