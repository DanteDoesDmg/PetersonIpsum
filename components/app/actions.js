export const TEXT_FETCHED = "textFetched"

export const changeMessage = (message = "this is my message") =>{
        return { type:"notype", payload:message }
}

export const fetchText = () => {
    const paragraphs = fetch("https://petersonipsum.firebaseio.com/biblical.json")
      .then(response => response.json())
      .then(data => {
       return data.paragraphs
      })
      .catch(err => {
        console.log(err);
        return null
      });
    return { type: TEXT_FETCHED, payload: paragraphs }
}
