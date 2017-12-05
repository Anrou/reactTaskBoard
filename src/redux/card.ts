export interface ICard {
    text: string,
    background: string,
    textColor: string,
    listId: number,
    id: number,
    order: number
}

export interface CardsState {
    cardHash: {
        [id: number]: ICard
    },
    cardIds: Array<number>
}

const InitialState: CardsState = {
    cardHash: {},
    cardIds: []
};

const ADD = "card/ADD";
type ADD_CARD = typeof ADD;

const DELETE = "card/DELETE";
type DELETE_CARD = typeof DELETE;

const UPDATE_COLOR = "card/COLOR";
type UPDATE_CARD_COLOR = typeof UPDATE_COLOR;

const DRAG = "card/DRAG";
type DRAG = typeof DRAG;

export interface AddCardAction {
    type: ADD_CARD;
    payload: {
        text: string;
        listId: number;
    }
}

export interface DeleteCardAction {
    type: DELETE_CARD;
    id: number;

}

export interface UpdateCardColorAction {
    type: UPDATE_CARD_COLOR;
    payload: {
        id: number;
        background: string;
    }
}

export interface DragCardAction {
    type: DRAG;
    payload: {
        id: number,
        sourcePosition: number,
        targetPosition: number,
        targetLIstId: number
    }
}

type CardAction = AddCardAction | DeleteCardAction | UpdateCardColorAction | DragCardAction;

let cardIdCounter: number = 0;

export default function reducer(state: CardsState = InitialState, action: CardAction): CardsState {
    switch (action.type) {
        case ADD: {
            const updatedState = {
                cardIds: [...state.cardIds, cardIdCounter],
                cardHash: {
                    ...state.cardHash,
                    [cardIdCounter]: {
                        text: action.payload.text,
                        background: '#ffffff',
                        textColor: '#000000',
                        listId: action.payload.listId,
                        id: cardIdCounter,
                        order: state.cardIds.filter((id) => (state.cardHash[id].listId === action.payload.listId)).length,
                    }
                }
            };
            cardIdCounter++;
            return updatedState;
        }

        case UPDATE_COLOR: {
            state.cardHash[action.payload.id] = {
                ...state.cardHash[action.payload.id],
                ...action.payload,
                textColor: selectColor(action.payload.background)
            };
            return {
                cardHash: {
                    ...state.cardHash
                },
                cardIds: state.cardIds
            }
        }

        case DELETE: {
            const prunedIds = state.cardIds.filter(item => {
                return item !== action.id
            });
            const deletedListPosition = state.cardHash[action.id].order,
                deletedCardListId = state.cardHash[action.id].listId;
            delete state.cardHash[action.id];
            prunedIds.forEach((id) => {
                if (state.cardHash[id].order > deletedListPosition && state.cardHash[id].listId === deletedCardListId) {
                    state.cardHash[id].order -= 1;
                }
            });
            return {
                cardIds: prunedIds,
                cardHash: state.cardHash
            }
        }

        case DRAG: {
            const {sourcePosition, targetPosition, targetLIstId} = action.payload;

            let increase = sourcePosition < targetPosition;
            let cardHash = {
                ...state.cardHash,
            };

            let souyrceListId = cardHash[action.payload.id].listId;

            if (targetLIstId === cardHash[action.payload.id].listId) { //if reorder in the same list
                for (let indx in cardHash) {
                    if (cardHash[indx].id != action.payload.id) {
                        if (increase && cardHash[indx].order > sourcePosition && cardHash[indx].order <= targetPosition) {
                            cardHash[indx].order -= 1;
                        } else if (!increase && cardHash[indx].order >= targetPosition && cardHash[indx].order < sourcePosition) {
                            cardHash[indx].order += 1;
                        }

                    }
                }
                cardHash[action.payload.id].order = targetPosition;
            }
            else { //if move card to another list
                for (let indx in cardHash) {
                    if (cardHash[indx].id != action.payload.id) {
                        if (cardHash[indx].listId === targetLIstId && cardHash[indx].order >= targetPosition) {
                            cardHash[indx].order += 1;
                        } else if (cardHash[indx].listId === souyrceListId && cardHash[indx].order > sourcePosition) {
                            cardHash[indx].order -= 1;
                        }
                    }
                }

                cardHash[action.payload.id].order = targetPosition;
                cardHash[action.payload.id].listId = targetLIstId;
            }

            return {
                cardIds: [...state.cardIds],
                cardHash: {
                    ...cardHash
                }
            }
        }

        default:
            return state;
    }
}

export const addCard = (text: string, listId: number): AddCardAction => ({
    type: ADD,
    payload: {text, listId}
});

export const updateCardColor = (background: string, id: number): UpdateCardColorAction => ({
    type: UPDATE_COLOR,
    payload: {background, id}
});

export const deleteCard = (id: number): DeleteCardAction => ({
    type: DELETE,
    id
});

export const dragCard = (id: number, sourcePosition: number, targetPosition: number, targetLIstId: number): DragCardAction => ({
    type: DRAG,
    payload: {
        id,
        sourcePosition,
        targetPosition,
        targetLIstId
    }
});

function selectColor(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let rgb = result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;

    console.log(rgb, (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 186 ? '#000000' : '#ffffff');

    return (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 186 ? '#000000' : '#ffffff'
}