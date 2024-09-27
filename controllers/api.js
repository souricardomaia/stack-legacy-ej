
export const apiKey = 'AIzaSyDpsVe8UfcKNaLf5HUl2clVQFTu2703nl8'

export const apiURL = 'https://www.googleapis.com/books/v1/volumes'
//?q=juridico&key=

export const apiRequest = async (args) => {

    args.type = args.type || 'GET'
    args.end = args.end || false
    args.headers = args.headers || false
    args.data = args.data || false
    args.dataType = args.dataType || 'json'
    args.dataString = args.dataString ?? true
    args.contentType = args.contentType || 'application/json'
    args.callback = args.callback || false
    args.crossDomain = args.crossDomain ?? true
    
    const options = {
        url: `${apiURL}/${args.end}`,
        type: args.type,
        contentType: args.contentType,
        dataType: args.dataType,
        crossDomain: args.crossDomain,
        success: function(data) {}
    }

    if(args.data){
        options.data = !args.dataString ? args.data : JSON.stringify(args.data)
    }

    if(args.headers){
        options.headers = args.headers
    }

    try {
        const data = await $.ajax(options)

       if (args.callback != false) {
            let callback = args.callback
            callback(data)
        }else{
            return data
        }
    } catch(error) {
        console.error("API request error:", error)
        throw error
    }
}