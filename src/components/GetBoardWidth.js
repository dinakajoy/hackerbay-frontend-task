import React, { useState } from 'react';
import Board from './Board';

const GetBoardWidth = () => {
  const [boardSize, setBoardSize] = useState(0);
  const [isBoardShown, setIsBoardShown] = useState(false);

  const setBoard = (e) => {
    e.preventDefault();
    setIsBoardShown(true);
  }

  return (
    <>
      {/* Modal to get the size of board from user */}
      {!isBoardShown && <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#boardSizeModal">
        Start Game
      </button>}

      <div className="modal fade" id="boardSizeModal" tabIndex="-1" aria-labelledby="boardSizeModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="boardSizeModalLabel">Welcome</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="sizeOfBoard">Please Enter Board Size!</label>
                  <input type="number" className="form-control" id="sizeOfBoard" aria-describedby="sizeOfBoard" value={boardSize} onChange={e => setBoardSize(e.target.value)} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e)=>setBoard(e)}>Let's Go</button>
            </div>
          </div>
        </div>
      </div>

      {/* Component to render board */}
      {isBoardShown && <Board boardSize={boardSize} />}
    </>
  );
}

export default GetBoardWidth;
