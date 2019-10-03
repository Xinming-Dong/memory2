import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root, channel) {
  ReactDOM.render(<Starter channel={channel}/>, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    
    this.channel = props.channel;
    this.state = {
      display: [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      message: " ",
      btn_disabled: false,
    };
    this.channel
        .join()
        .receive("ok", this.got_view.bind(this))
        .receive("error", resp => { console.log("Unable to join", resp); });
  }

  
  got_view(view) {
    this.setState(view.game, () => {
      console.log("got view check");});
  }

  click_letter_react(index) {
    // only if the letter is not shown, can user click the button
    if((this.state.display[index] == " ") && !this.state.btn_disabled) {
      this.channel.push("click_letter", {button_index: index})
                  .receive("ok", this.got_view.bind(this));
                // console.log(this.state.btn_disabled);
      
      this.channel.push("clr", {})
                  .receive("ok", this.got_view.bind(this));
    }
  }

  restart() {
    if(!this.state.button_disabled) {
      this.channel.push("restart", {})
        .receive("ok", this.got_view.bind(this));
    }
  }

  create_table() {
    let table = [];
    let k = 0;
    for(let i = 0; i < 4; i ++) {
      let row = [];
      for(let j = 0;j < 4; j ++) {
        row.push(
            // <button key={k} className="letter" onClick={this.click_letter_react.bind(this, k)}>{this.state.display[k]}</button> 
            <button key={k} className="letter" onClick={this.click_letter_react.bind(this, k)}>{this.state.display[k]}</button> 
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
  let msg = <p>{root.state.message}</p>
  return(<div>{msg}</div>)
}