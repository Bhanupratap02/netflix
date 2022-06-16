import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons"
import { useRef, useState } from "react"
import ListItem from "../listItem/ListItem"
import "./List.scss"

const List = ({list}) => {
     const [slideNumber , setSlideNumber] = useState(0)
     const [isMoved , setIsMoved] = useState(false)
     const [clickLimit, setClickLimit] = useState(window.innerWidth / 230)
     const listref = useRef()
    const handleClick = (direction) =>{
        setIsMoved(true)
        let distance = listref.current.getBoundingClientRect().x - 50
      if(direction === "left" && slideNumber > 0){
          setSlideNumber(slideNumber - 1)
         listref.current.style.transform = `translate(${230 + distance}px)`
         console.log(distance)
      }
       if (direction === "right" && slideNumber < 10 - clickLimit) {
                setSlideNumber(slideNumber + 1);
         listref.current.style.transform = `translate(${-230 + distance}px)`;
         console.log(distance);
       }
    }
  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left "
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listref}>
          
          {list.content.map((item,i) =>(
            <ListItem index={i} item={item} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default List