import { useEffect } from 'react';
import player from '../assets/images/ninja.png';
import princess from '../assets/images/princess.png';
import weapon from '../assets/images/weapon.png';

const Board = (props) => {
  let val = 1;
  // console.log(mob);
  const handleMob = (e) => {
    val = +e.target.value;
    play(e);
    e.target.value = '';
  }

  const boardWidth = +props.boardSize;
  let pathsMoved = 0;
  let weaponsDestroyed = 0;

  // Function to remove weapon from the board 
  const destroyWeapon = (weaponPosition) => {
    const weaponElement = document.getElementById(weaponPosition);
    weaponElement.innerHTML = "";
    weaponsDestroyed = weaponsDestroyed + 1;
  };

  // Function to check if position has a weapon
  const hasWeapon = (nextPosition) => {
    const nextElement = document.getElementById(nextPosition);
    if(nextElement.innerHTML !== "") {
      return true;
    }
    return false;
  };

  // Function to check if position is a valid point on board
  const validPath = (position) => {
    const cPosition = document.getElementById(position);
    if(cPosition === null) {
      return false;
    }
    return true;
  };

  // Function to move player on the board
  const movePlayer = (playerPosition) => {
    const actor = document.getElementById(playerPosition);
    actor.innerHTML = "";
    pathsMoved = pathsMoved + 1; 
  };

  // Function to move player to new position on the board
  const setPlayerNewPosition = (playerPosition) => {
    const actor = document.getElementById(playerPosition);
    return actor.innerHTML = `<img src=${player} alt="sprite-player" width='19px' height='19px' />`;
  };

  // Function to make princess visible for rescue
  const showPrincessPosition = () => {
    const princessPosition = document.getElementById(initialPosition);
    return princessPosition.innerHTML = `<img src=${princess} alt="sprite-player" width='19px' height='19px' />`;
  };

  // Function to determine players next move
  const nextPath = (nextPosition, nextPositionAsObject, currentPlayerPosition) => {
    if(!validPath(nextPosition) ) {
      return;
    } else {
      if(hasWeapon(nextPosition)) {
        movePlayer(currentPlayerPosition);
        destroyWeapon(nextPosition);
        setPlayerNewPosition(nextPosition);
        currentPosition = nextPositionAsObject;
      } else {
        movePlayer(currentPlayerPosition);
        setPlayerNewPosition(nextPosition);
        currentPosition = nextPositionAsObject;
      }
    }
  };

  const play = (e) => {
    if(weaponsDestroyed === boardWidth) {
      showPrincessPosition();
      alert(`Congratulations! You defeated ${weaponsDestroyed} warriors to save the princess`); 
      window.location.reload();
    }

    e = e || window.event;
    if (e.keyCode === 38 || val === 2) {
      nextPath(`x:${+currentPosition.x - 1}, y:${currentPosition.y}`, {x:+currentPosition.x - 1, y:+currentPosition.y}, `x:${currentPosition.x}, y:${+currentPosition.y}`);
    }
    else if (e.keyCode === 40 || val === 8) {
      nextPath(`x:${+currentPosition.x + 1}, y:${currentPosition.y}`, {x:+currentPosition.x + 1, y:+currentPosition.y}, `x:${currentPosition.x}, y:${+currentPosition.y}`);
    }
    else if (e.keyCode === 37 || val === 4) {
      nextPath(`x:${currentPosition.x}, y:${+currentPosition.y - 1}`, {x:+currentPosition.x, y:+currentPosition.y - 1}, `x:${currentPosition.x}, y:${+currentPosition.y}`);
    }
    else if (e.keyCode === 39 || val === 6) {
      nextPath(`x:${currentPosition.x}, y:${+currentPosition.y + 1}`, {x:+currentPosition.x, y:+currentPosition.y + 1}, `x:${currentPosition.x}, y:${+currentPosition.y}`);
    } else {
      return;
    }
    
  }

  useEffect(() => {
    if(window.screen.width < 500 ||
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPod/i)) {
        document.getElementById('custId').focus();
      } else {
        document.onkeydown = (e => play(e));
      }
  }, []);

  const boardSize = boardWidth * 2;
  let numOfWeapons = 0;
  const gridMiddle = Math.floor(boardWidth / 2);
  const grid = [];
  let initialPosition = `x:${gridMiddle}, y:${gridMiddle}`;
  let currentPosition = JSON.parse(`{"x": ${gridMiddle}, "y": ${gridMiddle}}`);

  for (let row = 0; row < boardWidth; row++) {
    grid.push([]);
    for (let column = 0; column < boardWidth; column++) {
      if(row === gridMiddle && column === gridMiddle) {
        // Check if middle of board an add player
        grid[row].push(<div key={`x:${row}, y:${column}`} id={`x:${row}, y:${column}`} style={{width:'25px',height:'25px',border:'1px solid #333',textAlign:'center'}}><img src={player} alt="sprite-player" width='19px' height='19px' /></div>);

      } else if (numOfWeapons !== boardWidth && ((Math.floor(Math.random() * (1 - boardSize)) + boardSize) % gridMiddle === boardWidth % 5)) {
        // Check condition and randomly set weapons based on board width entered
        grid[row].push(<div key={`x:${row}, y:${column}`} id={`x:${row}, y:${column}`} style={{width:'25px',height:'25px',border:'1px solid #333'}}><img src={weapon} alt="weapon" /></div>);
        numOfWeapons = numOfWeapons + 1;

      } else {
        // set empty board path
        grid[row].push(<div key={`x:${row}, y:${column}`} id={`x:${row}, y:${column}`} style={{width:'25px',height:'25px',border:'1px solid #333'}}></div>);
      }
    }
  }

  return (
    <>
      <input type="text" id="custId" name="custId" onChange={handleMob} style={{height:0,border:0,outline:0}} />
      <div style={{display:'grid', gridTemplateColumns:`repeat(${boardWidth}, 25px)`}}>
        {grid}
      </div>
    </>
  );
}

export default Board;