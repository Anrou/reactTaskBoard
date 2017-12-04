import * as React from 'react';

export default ({onAddItem}) => {
    let inputElement: HTMLInputElement;
    let onEnterPress = (event) => {
        if (event.which === 13) {
            addItem()
        }
    };

    let addItem = ()=>{
        if(inputElement.value) {
            onAddItem(inputElement.value);
            inputElement.blur();
            inputElement.value = '';
        }
    };

    let cancel = ()=>{
        inputElement.blur();
        inputElement.value = '';
    };
    return (<div className="input-component">
        <input
            ref={(input)=> {inputElement = input}}
            onKeyPress={onEnterPress}
            placeholder="Add item"
            className="input-component__input"
        />
        <div className="input-component__action-buttons">
            <button
                className="input-component__button input-component__button_green"
                onClick={addItem}
            >Save</button>
            <button
                className="input-component__button input-component__button_red"
                onClick={cancel}
            >Cancel</button>
        </div>
    </div>)
};