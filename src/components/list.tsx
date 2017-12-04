import * as React from 'react';
import {IList, deleteList} from "../redux/list"
import {IStore} from "../store";
import {DispatchProp, connect} from "react-redux";
import AddItem from "./addItem"
import {ICard, addCard, updateCardColor, deleteCard} from "../redux/card";
import {Card} from "./card"


interface ListProps extends DispatchProp<IStore> {
    list: IList,
    cards: {
        cardHash: {
            [id: number]: ICard
        },
        cardIds: Array<number>
    }
}

class List extends React.Component<ListProps, {}> {

    onDelete = () => {
        const {list, dispatch} = this.props;
        dispatch(deleteList(list.id));
    };

    onAddItem = (text) => {
        const {list, dispatch} = this.props;
        dispatch(addCard(text, list.id))
    };

    onDeleteCard = (cardId)=>{
        const {dispatch} = this.props;
        dispatch(deleteCard(cardId));
    };

    onCardColorChange = (color, cardId)=>{
        const {dispatch} = this.props;
        console.log(color, cardId);
        dispatch(updateCardColor(color, cardId))
    };

    render() {

        const {list, cards} = this.props;
        return <div className="list grid__column">
            <div className="list__header">
                <div className="list__title">{list.title}</div>
                <i className="material-icons" onClick={this.onDelete}>delete</i>
            </div>
            <div className="list__content">
                {cards.cardIds.map((id)=>(<div className="list__item" key={cards.cardHash[id].id} >
                    <Card card={cards.cardHash[id]} onColorChange={this.onCardColorChange} onDelete={this.onDeleteCard}/>
                </div>))}
                <div className="list__item">
                    <AddItem onAddItem={this.onAddItem} />
                </div>
            </div>
        </div>
    }

}

const mapStateToProps = (state: IStore, ownProperties: ListProps): ListProps => {
    console.log(state);
    return {
        list: ownProperties.list,
        cards: {
            cardHash: state.cards.cardHash,
            cardIds: state.cards.cardIds
                .filter((id)=>(state.cards.cardHash[id].listId === ownProperties.list.id))
                .sort((id1, id2)=>(state.cards.cardHash[id1].order - state.cards.cardHash[id2].order))
        }
    }
};

export default connect<{}, {}, any>(mapStateToProps)(List);