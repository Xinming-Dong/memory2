import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num_click: 0,
      table_contents: ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"],
      completed: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      show: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      last: -1,
      button_disabled: false,
    };
  }

  show(index) {
    let new_show = this.state.show;
    new_show[index] = true;
    this.setState(function(state, props) {
      return {
        show: new_show
      }
    });
  }

  click_letter_react(index) {
    if((!this.state.completed[index])&&(!this.state.button_disabled)&&(index != this.state.last)){
      // show the content
      this.show(index);
      let new_completed = this.state.completed;
      this.setState((state, props) => ({num_click: state.num_click + 1}));

      
      if((this.state.num_click % 2 === 0)) { // if num_click is odd
        
        // update state.last
        let new_last = index;
        this.setState({
          last: new_last,
        }, () => {
          console.log("user click");
        })
      }
      
      else { // if num_click is even
        // compare with state.last, if the same
        if (this.state.table_contents[index] == this.state.table_contents[this.state.last]) {
          // tag completed
          new_completed[index] = true;
          new_completed[this.state.last] = true;
          this.setState({
            completed: new_completed,
          })
        }
        
        else { // if different
          // update show
          this.setState((state, props) => ({button_disabled: true}));
          setTimeout(
            function() {
              let new_show = this.state.show;

              new_show[this.state.last] = false; 

              new_show[index] = false;

              this.setState(function(state, props) {
                return {
                  show: new_show,
                  button_disabled: false
                }
              });
            }.bind(this), 5000);
        }
      }
    }
  }

  check_state() {
    return this.state.completed.some(s => s == false);
  }

  shuffle() {
    let content = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];
    let result = [];
    let random;
    while (content.length > 0) {
      random = Math.floor(Math.random() * content.length);
      result.push(content[random]);
      content.splice(random, 1);
    }
    return result;
  }

  restart() {
    if(!this.state.button_disabled) {
      let result = this.shuffle();

      let new_num_click = 0;
      let new_completed = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
      let new_show = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
      let new_last = -1;

      this.setState({
        table_contents: result,
        num_click: new_num_click, 
        completed: new_completed, 
        show: new_show, 
        last: new_last,
      }, () => {
        this.reminder();
      });
    }
  }

  reminder() {
    console.log("new game");
  }

  create_table() {
    let table = [];
    let k = 0;
    for(let i = 0; i < 4; i ++) {
      let row = [];
      for(let j = 0;j < 4; j ++) {
        row.push(
            <button key={k} className="letter" onClick={this.click_letter_react.bind(this, k)}>{this.state.show[k]? this.state.table_contents[k]:""}</button> 
        )
        k ++;
      }
    table.push(<tr key={i}><td>{row}</td></tr>);
    }
    return table;
  }

  render() {
    return (
      <div>
        <h1>MEMORY GAME</h1>

        <table>
          <tbody>
            {this.create_table()}
          </tbody>
        </table>

        <div className="message">
          <Message root={this} />
        </div>

        <div className="resstart_btn">
          <button className="restart" onClick={this.restart.bind(this)}>restart</button>
        </div>
      </div>
    );
  }
}

function Message(params) {
  let root = params.root;
  let playing = root.check_state();

  let is_playing = <p>Playing...</p>
  let won = <p>You Won!</p>
  // score = 1600 / num_click (maximum 100)
  let score = <p>Your score is: {Math.ceil(1600 / root.state.num_click)}</p>
  
  if(playing) {
    return (
      <div>{is_playing}</div>
      
    );
  }
  else {
    return (
      <div>
        <div>{won}</div>
        <div>{score}</div>
      </div>
      
    );
  }
}