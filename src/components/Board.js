import React, {Component} from 'react';
import {LENGTH} from '../constants';

function Square(props) {
    let color = "square";
    if (typeof props.value !== "undefined" && props.value !== null) {
        if (props.value === "O") {
            color = color.concat(" blue");
        } else if (props.value === "✘") {
            color = color.concat(" red");
        }
    }
    return (
        <button className={color} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends Component {
    renderSquare(i, j) {
        /*const color = this.props.color;
        if (typeof color !== "undefined" && color !== null) {
            Object.keys(color).map(function (value) {
                console.log(color[value]);
            });
        }*/
        return (
            <Square
                value={this.props.square[i][j]}
                onClick={() => this.props.onClick(i, j)}
            />
        );
    }

    renderRow(i) {
        const row = [];
        for (let j = 0; j < LENGTH; j++) {
            row.push(<td key={i + '' + j}>{this.renderSquare(i, j)}</td>);
        }
        return <tr key={i}>{row}</tr>;
    }

    render() {
        const tbody = [];
        for (let i = 0; i < LENGTH; i++) {
            tbody.push(this.renderRow(i));
        }
        return (
            <table>
                <tbody>{tbody}</tbody>
            </table>
        );
    }
}

export default Board;