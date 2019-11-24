export const TEXT_FETCHED = "textFetched"


// export default function createActions(){
//     return{
//         changeMessage: changeMessage()
//     }
// }

export const changeMessage = (message = "this is my message") =>{
        return {type:"notype", payload:message}
}

export const fetchText = () => {
    let paragraphs = fetch("https://petersonipsum.firebaseio.com/biblical.json")
      .then(response => response.json())
      .then(data => {
       return paragraphs = data.paragraphs
      })
      .catch(err => {
        console.log(err);
        return null
      });
    return {type:TEXT_FETCHED, payload:paragraphs}
}
