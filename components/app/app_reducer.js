import {TEXT_FETCHED} from "./actions"

const text =  "To stand up straight with your shoulders back is to accept the terrible responsibility of life, with eyes wide open. It means deciding to voluntarily transform the chaos of potential into the realities of habitable order. It means adopting the burden of self-conscious vulnerability, and accepting the end of the unconscious paradise of childhood, where finitude and mortality are only dimly comprehended. It means willingly undertaking the sacrifices necessary to generate a productive and meaningful reality (it means acting to please God, in the ancient language)";

const initialState = {
    textToCopy: text,
    paragraphs: []
};


export default function reducer(state = initialState, {type, payload}){

    switch(type){
        case TEXT_FETCHED:{
            return {
                paragraphs: payload,
            }
        }
        default:{
            return state
        }
    }
}