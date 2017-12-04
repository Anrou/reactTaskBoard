import * as React from 'react';
import { IList } from "../redux/list"
import {IStore} from "../store";
import {DispatchProp, connect} from "react-redux";
import AddItem from "./addItem";
import List from "./list"
import {addList} from "../redux/list"


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

    render() {
        const {listsIds, listsHash} = this.props;
        return <div className="grid">{listsIds.sort((id1, id2)=>(listsHash[id1].position - listsHash[id2].position)).map((id) => {
                return <List list={listsHash[id]} key={id}/>
            }
        )}
            <div className="grid__column">
                <AddItem onAddItem={this.onAddList}/>
            </div>
        </div>
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