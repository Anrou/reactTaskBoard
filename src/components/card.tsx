import * as React from 'react'

interface CardState {
    availableColors: Array<string>,
    showColorPicker: boolean
}

interface CardProps {
    card: any,
    onColorChange: Function,
    onDelete: Function
}

export class Card extends React.Component<CardProps, CardState> {

    constructor(props){
        super(props);
        this.state = {
            availableColors: [
                '#ffffff',
                '#000000',
                '#f44336',
                '#2196f3',
                '#4caf50',
                '#ffeb3b'
            ],
            showColorPicker: false
        }
    }

    get pickerClasses(){
        return `card__color-picker ${this.state.showColorPicker? 'card__color-picker_show' : ''}`
    }

    toggleColorPicker(){
        this.setState({showColorPicker: !this.state.showColorPicker});

    }

    onDelete = ()=>{
        const {card, onDelete} = this.props;
        onDelete(card.id);
    };

    changeColor(color: string){
        const {card, onColorChange} = this.props;
        onColorChange(color, card.id);
        this.toggleColorPicker();
    }

    render() {
        const {card} = this.props;
        const styles = {
            background: card.background,
            color: card.textColor
        };
        return <div
            className="card"
            style={styles}
        >
            <div className="card__text">{card.text}</div>
            <div className="card__actions">
                <i className="material-icons"
                   onClick={()=>{this.onDelete()}}
                >delete</i>
                <i className="material-icons"
                   onClick={()=> this.toggleColorPicker()}
                >color_lens</i>
            </div>
            <div className={this.pickerClasses}>
                {
                    this.state.availableColors.map((val, indx)=>(<div
                        key={indx}
                        className="card__color"
                        style={{background: val}}
                        onClick={()=>{this.changeColor(val)}}
                    ></div>))
                }
            </div>
        </div>
    }
}