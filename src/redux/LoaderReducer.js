const initialState = {
    loading : false,
}

const LoaderReducer = (state= initialState , action)=>{
    switch(action.type){
        case 'showloading':return{
            ...state,
            loading : true,
        }
        case 'hideloading':return{
            ...state,
            loading : false,
        }
        default: return state ;
    }
}
export {LoaderReducer}