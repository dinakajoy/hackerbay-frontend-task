import { useEffect } from 'react';
import player from '../assets/images/sprite.PNG';
import weapon from '../assets/images/sprite2.jpg';

const Board = (props) => {
  const boardWidth = +props.boardSize;
  let pathsMoved = 0;
  let weaponsDestroyed = 0;

  const destroyWeapon = (weaponPosition) => {
    const weaponElement = document.getElementById(weaponPosition);
    weaponElement.innerHTML = "";
    weaponsDestroyed = weaponsDestroyed + 1;
  }
  const hasWeapon = (weaponPosition) => {
    const nextElement = document.getElementById(weaponPosition);
    if(nextElement.innerHTML !== "") {
      return true;
    }
    return false;
  }
  const markPath = (position) => {
    const cPosition = document.getElementById(position);
    cPosition.style.backgroundColor = 'green';
  }
  const isPathMoved = (position) => {
    const cPosition = document.getElementById(position);
    if(cPosition.style.backgroundColor === 'green') {
      return true;
    }
    return false;
  }
  const isNotValidPath = (position) => {
    const cPosition = document.getElementById(position);
    if(cPosition === null) {
      return true;
    }
    return false;
  }
  const movePlayer = (playerPosition) => {
    const actor = document.getElementById(playerPosition);
    actor.innerHTML = "";
    pathsMoved = pathsMoved + 1;
  }
  const setPlayerNewPosition = (playerPosition) => {
    const actor = document.getElementById(playerPosition);
    return actor.innerHTML = `<img src=${player} alt="sprite-player" />`;
  }

  const nextPath = (path, obj) => {
    if(isNotValidPath(path) || isPathMoved(path)) {
      return false;
    } else {
      if(hasWeapon(path)) {
        destroyWeapon(path);
        setPlayerNewPosition(path);
        return obj;
      } else {
        setPlayerNewPosition(path);
        return obj;
      }
    }
  }

  const play = (playerPosition) => {
    movePlayer(`x:${playerPosition.x}, y:${playerPosition.y}`);
    markPath(`x:${playerPosition.x}, y:${playerPosition.y}`);

    if(weaponsDestroyed === boardWidth) {
      alert(`Well Played! You moved ${pathsMoved} steps before saving the princess`);
      window.location.reload();
    }

    let moveUp = nextPath(`x:${playerPosition.x}, y:${+playerPosition.y + 1}`, {x:playerPosition.x, y:+playerPosition.y + 1});
    if(!moveUp) {
      let moveLeft = nextPath(`x:${+playerPosition.x - 1}, y:${playerPosition.y}`, {x:+playerPosition.x - 1, y:playerPosition.y});
      if(!moveLeft) {
        let moveDown = nextPath(`x:${playerPosition.x}, y:${+playerPosition.y - 1}`, {x:playerPosition.x, y:+playerPosition.y - 1});
        if(!moveDown) {
          let moveRight = nextPath(`x:${+playerPosition.x + 1}, y:${playerPosition.y}`, {x:+playerPosition.x + 1, y:playerPosition.y});
          if(!moveRight) {
            alert('You Lost, Sorry, you do not have what it takes to save the princess!!!');
            window.location.reload();
          } else {
            setTimeout(function(){ return play(moveRight); }, 1000);
          }
        } else {
          setTimeout(function(){ return play(moveDown); }, 1000);
        }
      } else {
        setTimeout(function(){ return play(moveLeft); }, 1000);
      }
    } else {
      setTimeout(function(){ return play(moveUp); }, 1000);
    }
  }

  useEffect(() => {
    const playerPosition = JSON.parse(`{"x":"${gridMiddle}", "y":"${gridMiddle}"}`);
    play(playerPosition);
  }, [])

  const boardSize = boardWidth * 2;
  let numOfWeapons = 0;
  const gridMiddle = Math.floor(boardWidth / 2);
  const grid = [];

  for (let row = 0; row < boardWidth; row++) {
    grid.push([]);
    for (let column = 0; column < boardWidth; column++) {
      if(row === gridMiddle && column === gridMiddle) {
        // Check if middle of board an add player
        grid[row].push(<div key={`x:${row}, y:${column}`} id={`x:${row}, y:${column}`} style={{width:'20px',height:'20px',border:'1px solid #333',textAlign:'center'}}><img src={player} alt="sprite-player" /></div>);

      } else if (numOfWeapons !== boardWidth && ((Math.floor(Math.random() * (1 - boardSize)) + boardSize) % gridMiddle === 0)) {
        // Check condition and randomly set weapons based on board width entered
        grid[row].push(<div key={`x:${row}, y:${column}`} id={`x:${row}, y:${column}`} style={{width:'20px',height:'20px',border:'1px solid #333'}}><img src={weapon} alt="weapon" /></div>);
        numOfWeapons = numOfWeapons + 1;

      } else {
        // set empty board path
        grid[row].push(<div key={`x:${row}, y:${column}`} id={`x:${row}, y:${column}`} style={{width:'20px',height:'20px',border:'1px solid #333'}}></div>);
      }
    }
  }

  return (
    <div style={{display:'grid', gridTemplateColumns:`repeat(${boardWidth}, 20px)`}}>
      {grid}
    </div>
  );
}

export default Board;