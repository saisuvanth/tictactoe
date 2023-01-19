import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import Content from "../components/Content";
import XPiece from "../components/XPiece";
import OPiece from "../components/OPiece";
import { useEffect } from "react";

const GameBoard = () => {
  const [gameState, setGameState] = useState({
    board: Array(9).fill(0),
    xIsNext: true,
  });

  useEffect(() => {
    setGameState(gameState);
  }, [gameState]);

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  return (
    <Container>
      <Content>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "5px",
          }}
        >
          <table>
            <tr>
              <th colSpan={3}>Your Move</th>
            </tr>
            <tr>
              <td className="l">
                {gameState.board[0] === 1 ? (
                  <XPiece sz="100px" />
                ) : gameState.board[0] === -1 ? (
                  <OPiece sz="100px" />
                ) : null}
              </td>
              <td className="">
                {gameState.board[1] === 1 ? (
                  <XPiece sz="100px" />
                ) : gameState.board[1] === -1 ? (
                  <OPiece sz="100px" />
                ) : null}
              </td>
              <td className="r">
                {gameState.board[2] === 1 ? (
                  <XPiece sz="100px" />
                ) : gameState.board[2] === -1 ? (
                  <OPiece sz="100px" />
                ) : null}
              </td>
            </tr>
            <tr>
              <td className="l">
                {gameState.board[3] === 1 ? (
                  <XPiece sz="100px" />
                ) : gameState.board[3] === -1 ? (
                  <OPiece sz="100px" />
                ) : null}
              </td>
              <td className="">
                {gameState.board[4] === 1 ? (
                  <XPiece sz="100px" />
                ) : gameState.board[4] === -1 ? (
                  <OPiece sz="100px" />
                ) : null}
              </td>
              <td className="r">
                {gameState.board[5] === 1 ? (
                  <XPiece sz="100px" />
                ) : gameState.board[5] === -1 ? (
                  <OPiece sz="100px" />
                ) : null}
              </td>
            </tr>
            <tr>
              <td className="b l">
                {gameState.board[6] === 1 ? (
                  <XPiece sz="100px" />
                ) : gameState.board[6] === -1 ? (
                  <OPiece sz="100px" />
                ) : null}
              </td>
              <td className="b">
                {gameState.board[7] === 1 ? (
                  <XPiece sz="100px" />
                ) : gameState.board[7] === -1 ? (
                  <OPiece sz="100px" />
                ) : null}
              </td>
              <td className="b r">
                {gameState.board[8] === 1 ? (
                  <XPiece sz="100px" />
                ) : gameState.board[8] === -1 ? (
                  <OPiece sz="100px" />
                ) : null}
              </td>
            </tr>
          </table>
        </div>
      </Content>
      <Button backgroundColor="#F2C94C" color="white">
        Submit!
      </Button>
    </Container>
  );
};

export default GameBoard;
