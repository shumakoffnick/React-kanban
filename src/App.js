import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFaceSmile, faAngleDown, faPlus, faRightToBracket } from "@fortawesome/free-solid-svg-icons";


const allboard = [
    {
        id: 1,
        title: "Backlog",
        items: [
            {id: 1, title: "Login page – performance issues"},
            {id: 2, title: "Sprint bugfix"},
            {id: 3, title: "Покушать" }
        ]
    },
    {
        id: 2,
        title: "Ready",
        items: [
            {id: 4, title: "Код ревью"},
            {id: 5, title: "Задача по факториал"},
            {id: 6, title: "Задачи на фибоначе" }
        ]
    },
    {
        id: 3,
        title: "In Progress",
        items: [
            {id: 7, title: "Снять видео"},
            {id: 8, title: "Смонтировать"},
            {id: 9, title: "Отрендерить" }
        ]
    },
    {
        id: 4,
        title: "Finished",
        items: [
            {id: 7, title: "Снять видео"},
            {id: 8, title: "Смонтировать"},
            {id: 9, title: "Отрендерить" }
        ]
    }]

const App = ()=>{

const [boards, setBoards] = useState(allboard)

const [currentBoard, setCurrentBoard] = useState(null)
const [currentItem, setCurrentItem] = useState(null)



function dragOverHandler(e) {
    e.preventDefault()
    if(e.target.className === "item"){
        e.target.style.boxShadow = "0 4px 3px gray"
    }
}
function dragLeaveHandler(e) {
    e.target.style.boxShadow = "none"
}
function dragStartHandler(e, board, item) {
    setCurrentBoard(board)
    setCurrentItem(item)
}
function dragEndHandler(e) {
    e.target.style.boxShadow = "none"
}
function dropHandler(e, board, item) {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(b =>{
        if(b.id === board.id){
            return board
        }
        if(b.id === currentBoard.id){
            return currentBoard
        }
        return b
    }))
}
function dropCardHandler(e, board){
    if(e.target.className !== "board"){
     dropCardHandler()   
    }
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    setBoards(boards.map(b =>{
        if(b.id === board.id){
            return board
        }
        if(b.id === currentBoard.id){
            return currentBoard
        }
        return b
    }
   
    ))
}

const removeBlock = (id)=>{
    const copy = [...boards]
    const cur = copy.filter(t=> t.id !==id)
    setBoards(cur)
}

const [newTitle, setNewTitle] = useState("")
console.log(newTitle)

const addTitle = (title)=>{
    const newcop = [...boards, {
        id: new Date(),
        title: title,
        items: []
    }]
    setBoards(newcop)
}

const [visible, setVisible] = useState(false)
const [visibleLog, setVisibleLog] = useState(false)
const [newTitleCard, setNewTitleCard] = useState("")
const [tr, setTr] = useState()
console.log(tr)
function ko (title){
    {boards.map(b=> setTr(b.items))}
    const co = [...tr, {
        id: new Date(),
        title: title
    }]
    setTr(co)
    
}
console.log(newTitleCard)


    return(
        <>
        <header className="header">
            <div className="logo">Awesome Kanban Board</div>
            <div className="PersonalArea">
                <div className="AreaImg">
                    <FontAwesomeIcon icon={faFaceSmile}/>
                </div>
                <div className="AreaBtn" onClick={()=> setVisibleLog(!visibleLog)}>
                    <FontAwesomeIcon icon={faAngleDown}/>
                </div>
            </div>
        </header>
        {visibleLog &&
        <div className="logout">
            <div className="profile">Profile</div>
            <div className="logoutLogout">Log Out</div>
        </div>
        }
        <div className="main">
        <div className="app">
            {boards.map(board =>
                <div className="board"
                    onDragOver={(e)=> dragOverHandler(e)}
                    onDrop={(e)=>dropCardHandler(e, board)}
                >
                    <div className="titleItem">
                    <div className="board__title">{board.title}</div>
                    <div className="deleteBlock">
                            <FontAwesomeIcon icon={faTrash} className="iconTrash" onClick={()=>removeBlock(board.id)}/>
                        </div>
                    </div>
                    {board.items.map(item =>
                        <div
                        onDragOver={(e)=>dragOverHandler(e)}
                        onDragLeave={(e)=>dragLeaveHandler(e)}
                        onDragStart={(e)=>dragStartHandler(e, board, item)}
                        onDragEnd={(e)=>dragEndHandler(e)}
                        onDrop={(e)=>dropHandler(e, board, item)}
                        draggable={true} 
                        className="item"
                        >{item.title}</div>
                        )}
                        
                        {visible &&
                        <div className="inpCardAdd">
                        <input className="inpCard" onChange={e=> setNewTitleCard(e.target.value)}></input>
                        <button onClick={()=>ko(newTitleCard)} className="faBracket">
                            <FontAwesomeIcon icon={faRightToBracket}/>
                        </button>
                        </div>
                        }
                        <div  className="addCard" onClick={()=> setVisible(!visible)}>
                            <FontAwesomeIcon icon={faPlus}/>
                            Add card
                        </div>
                </div>
                )}
        </div>
        <input onChange={e => setNewTitle(e.target.value)}></input>
        <button onClick={()=>addTitle(newTitle)}>Нажать</button>
        </div>
        </>
    )
}
export default App