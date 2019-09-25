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
      last: -1
    };
  }

  show(index) {
    let new_show = this.state.show;
    new_show[index] = true;
    let st = _.assign({}, this.state, { show: new_show });
    this.setState(st)
  }

  click_letter_react(index) {
    if(!this.state.completed[index]){
      // show the content
      this.show(index);
      
      let new_show = this.state.show;
      let new_click = this.state.num_click + 1;
      let new_completed = this.state.completed;
      let new_last = index;

      console.log("check last 1");
      console.log(this.state.last);
      if(new_click % 2 === 1) { // if num_click is odd
        // update state.last
        //new_last = index;
      }
      
      else { // if num_click is even
        // compare with state.last, if the same
        if (this.state.table_contents[index] == this.state.table_contents[this.state.last]) {
          // tag completed
          console.log("completing first");
          console.log(index);
          new_completed[index] = true;
          console.log("completing second");
          console.log(this.state.last);
          new_completed[this.state.last] = true;
        }
        
        else { // if different
          // wait for 10s?????
          // update show
          // setTimeout(
          //   function() {
          //     console.log("check last 4")
          //     console.log(this.state.last)

          //     new_show[index] = false;
          //     console.log("tagging first")
          //     console.log(index)

          //     new_show[this.state.last] = false; 
          //     console.log("tagging second")
          //     console.log(this.state.last)
          //     let st1 = _.assign({}, this.state, { show: new_show });
          //     this.setState(st1)
          //   }.bind(this), 1000);
          new_show[this.state.last] = false;
          new_show[index] = false;
        }
      }
      let st2 = _.assign({}, this.state, {show: new_show, num_click: new_click, completed: new_completed, last: new_last});
      this.setState(st2);
    }
  }

  check_state() {
    return this.state.completed.some(s => s == false);
  }

  restart() {
    let content = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];
    let result = [];
    let random;
    while (content.length > 0) {
      random = Math.floor(Math.random() * content.length);
      result.push(content[random]);
      content.splice(random, 1);
    }

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

  reminder() {
    console.log(this.state.table_contents);
  }

  render() {
    return (
      <div>
        {/* <div className="title">
          <h1>MEMORY GAME</h1>
        <div/> */}
        <h1>MEMORY GAME</h1>
        <table>
          <tbody>
            <tr><td>
              <button className="letter" onClick={this.click_letter_react.bind(this, 0)}>{this.state.show[0]? this.state.table_contents[0]:""}</button>
              <button className="letter" onClick={this.click_letter_react.bind(this, 1)}>{this.state.show[1]? this.state.table_contents[1]:""}</button>
              <button className="letter" onClick={this.click_letter_react.bind(this, 2)}>{this.state.show[2]? this.state.table_contents[2]:""}</button>
              <button className="letter" onClick={this.click_letter_react.bind(this, 3)}>{this.state.show[3]? this.state.table_contents[3]:""}</button>
            </td></tr>
            <tr><td>
              <button className="letter" onClick={this.click_letter_react.bind(this, 4)}>{this.state.show[4]? this.state.table_contents[4]:""}</button>
              <button className="letter" onClick={this.click_letter_react.bind(this, 5)}>{this.state.show[5]? this.state.table_contents[5]:""}</button>
              <button className="letter" onClick={this.click_letter_react.bind(this, 6)}>{this.state.show[6]? this.state.table_contents[6]:""}</button>
              <button className="letter" onClick={this.click_letter_react.bind(this, 7)}>{this.state.show[7]? this.state.table_contents[7]:""}</button>
            </td></tr>
            <tr><td>
             <button className="letter" onClick={this.click_letter_react.bind(this, 8)}>{this.state.show[8]? this.state.table_contents[8]:""}</button>
             <button className="letter" onClick={this.click_letter_react.bind(this, 9)}>{this.state.show[9]? this.state.table_contents[9]:""}</button>
             <button className="letter" onClick={this.click_letter_react.bind(this, 10)}>{this.state.show[10]? this.state.table_contents[10]:""}</button>
              <button className="letter" onClick={this.click_letter_react.bind(this, 11)}>{this.state.show[11]? this.state.table_contents[11]:""}</button>
           </td></tr>
           <tr><td>
             <button className="letter" onClick={this.click_letter_react.bind(this, 12)}>{this.state.show[12]? this.state.table_contents[12]:""}</button>
             <button className="letter" onClick={this.click_letter_react.bind(this, 13)}>{this.state.show[13]? this.state.table_contents[13]:""}</button>
             <button className="letter" onClick={this.click_letter_react.bind(this, 14)}>{this.state.show[14]? this.state.table_contents[14]:""}</button>
             <button className="letter" onClick={this.click_letter_react.bind(this, 15)}>{this.state.show[15]? this.state.table_contents[15]:""}</button>
           </td></tr>
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
  
  if(playing) {
    return (
      <div>{is_playing}</div>
    );
  }
  else {
    return (
      <div>{won}</div>
    );
  }
}