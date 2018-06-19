import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import posed, { PoseGroup } from "react-pose";

let _defaultDiff = 12;
let _defaultWidth = 100;
let _defaultMin = 5;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-family: Helvetica Neue;

  * {
    transition: all 0.1s;
  }
`;

const CardConainerStyled = styled.div`
  position: relative;

  * {
    transition: all 1s;
  }

  .card.active:nth-last-child(4) {
    top: ${_defaultDiff * 2}px;
    width: ${_defaultWidth - _defaultMin * 3}%;
  }
  .card.active:nth-last-child(3) {
    top: ${_defaultDiff * 3}px;
    width: ${_defaultWidth - _defaultMin * 2}%;
  }
  .card.active:nth-last-child(2) {
    top: ${_defaultDiff * 4}px;
    width: ${_defaultWidth - _defaultMin * 1}%;
  }

  .card.active:nth-last-child(1) {
    top: ${_defaultDiff * 5}px;
    width: ${_defaultWidth - _defaultMin * 0}%;
  }
`;

const Card = styled.div`
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${props => props.color};
  height: 500px;
  width: 100%;
  padding: 10px;
  color: white;
  border-radius: 5px;
  position: absolute;
  box-sizing: border-box;
`;

const CardPosed = posed(Card)({
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 50, delay: 0 }
  },
  exit: {
    opacity: 0,
    x: -2500,
    y: 800,
    rotate: -225,
    transition: { duration: 500, delay: 0 }
  }
});

class CardContainer extends React.Component {
  state = {
    current: 0,
    items: [
      {
        color: "red",
        isShow: true
      },
      {
        color: "pink",
        isShow: true
      },
      {
        color: "blue",
        isShow: true
      },
      {
        color: "green",
        isShow: true
      }
    ]
  };

  render() {
    return (
      <div>
        <button
          onClick={() => this.setState({ current: this.state.current - 1 })}
        >
          Back
        </button>
        <button
          onClick={() => this.setState({ current: this.state.current + 1 })}
        >
          Next
        </button>
        <CardConainerStyled>
          <PoseGroup>
            {this.state.items.map(
              (e, index) =>
                index < this.state.items.length - this.state.current && (
                  <CardPosed
                    key={index}
                    className="card active"
                    color={this.state.items[index].color}
                  >
                    Card: {index}
                  </CardPosed>
                )
            )}
          </PoseGroup>
        </CardConainerStyled>
      </div>
    );
  }
}

const IndexPage = () => (
  <Container>
    <h1>Hi, Stacked Card</h1>
    <CardContainer />
  </Container>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<IndexPage />, rootElement);
