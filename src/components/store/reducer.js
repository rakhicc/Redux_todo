import * as actionTypes from './actions'

const initialState = {
    notes: [
      {
        id: 1,
        title: "Create clean app",
        task: "npx create-react-app",
        done: false,
      },
      {
        id: 2,
        title: "Clean app",
        task: "Delete and clean unnecessary stuff",
        done: true,
      },
      {
        id: 3,
        title: "Create store / context",
        task: "Create new file and use React.createContext()",
        done: false,
      },
      {
        id: 4,
        title: "Awesome store / context",
        task: "Awesome Create new file and use React.createContext()",
        done: false,
      }
    ],
  };

const reducer=(state=initialState,action)=>{
   switch(action.type){
       case actionTypes.ADD_TODO:
           return{
               notes:[
                   ...state.notes,
                   {
                       id:new Date().valueOf(),
                       ...action.payload,
                       done:false
                   }
               ]
           }
           case actionTypes.REMOVE_TODO:
            const updateArray = state.notes.filter((item) => item.id !== action.payload);
      return {
        ...state,
        notes: updateArray,
      };
    case actionTypes.DONE_TODO:
      const doneToggle = state.notes.map((item) => {
        return item.id === action.payload
          ? { ...item, done: !item.done }
          : { ...item };
      });
      return {
        ...state,
        notes: doneToggle,
      };   
           default:
               return state;
   }
    
   
}

export default reducer;
