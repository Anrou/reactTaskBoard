import * as React from 'react';
import {IList, dragList} from "../redux/list"
import {IStore} from "../store";
import {DispatchProp, connect} from "react-redux";
import AddItem from "./addItem";
import List from "./list"
import {addList} from "../redux/list"

import {DragDropContext, Droppable} from 'react-beautiful-dnd';

interface AppProps extends DispatchProp<IStore> {
    listsIds: Array<number>,
    listsHash: {
        [id: number]: IList
    },
}

class App extends React.Component<AppProps, {}> {


    onAddList = (title) => {
        const {dispatch} = this.props;
        dispatch(addList((title)));
    };

    onDragEnd = (event) => {
        console.log(event);
        if(!event.destination) return;
        const {dispatch} = this.props;
        switch(event.type){
            case "LIST": dispatch(dragList(parseInt(event.draggableId), event.source.index, event.destination.index))
        }
    };


    render() {
        const {listsIds, listsHash} = this.props;
        return <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="listDropable" type="LIST" direction="horizontal">
                {(provided, snapshot) => (
                    <div className="grid" ref={provided.innerRef}>
                        {listsIds.sort((id1, id2) => (listsHash[id1].position - listsHash[id2].position)).map((id) => {
                            return  <div className="grid__column" key={id}>

                                <List list={listsHash[id]} key={id}/>

                            </div>

                        })}
                        {provided.placeholder}
                        <div className="grid__column grid__spacer">
                            <AddItem onAddItem={this.onAddList}/>
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>

    }
}

const mapStateToProps = (state: IStore, ownProperties: AppProps): AppProps => {
    console.log(state);
    return {
        listsHash: state.lists.listHash,
        listsIds: state.lists.listIds
    }
};

export default connect<{}, {}, any>(mapStateToProps)(App);