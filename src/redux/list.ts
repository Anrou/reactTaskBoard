export interface IList {
    title: string,
    position: number,
    id: number
}

export interface ListsState {
    listHash: {
        [id: number]: IList
    },
    listIds: Array<number>
}

const InitialState: ListsState = {
    listHash: {},
    listIds: []
};


const ADD = "list/ADD";
type ADD = typeof ADD;

const DELETE = "list/DELETE";
type DELETE = typeof DELETE;


/**
 *  Actions
 * */

export interface AddAction {
    type: ADD;
    title: string
}

export interface DeleteAction {
    type: DELETE;
    id: number;
}

type ListAction = AddAction | DeleteAction;

let listIdCounter: number = 0;

export default function reducer(state: ListsState = InitialState, action: ListAction): ListsState {
    switch (action.type) {
        case ADD: {
            const updatedState = {
                listIds: [...state.listIds, listIdCounter],
                listHash: {
                    ...state.listHash,
                    [listIdCounter]: {title: action.title, id: listIdCounter, position: state.listIds.length}
                }
            };
            listIdCounter++;
            return updatedState;
        }

        case DELETE: {
            const prunedIds = state.listIds.filter(item => {
                return item !== action.id
            });
            const deletedListPosition = state.listHash[action.id].position;
            delete state.listHash[action.id];
            prunedIds.forEach((id)=>{
                if(state.listHash[id].position > deletedListPosition) {
                    state.listHash[id].position -= 1;
                }
            });
            return {
                listIds: prunedIds,
                listHash: state.listHash
            }
        }

        default: return state;
    }
}

/**
 * Action creators
 */

export const addList = (title: string): AddAction => ({
    type: ADD,
    title
});

export const deleteList = (id: number): DeleteAction => ({
    type: DELETE,
    id
});