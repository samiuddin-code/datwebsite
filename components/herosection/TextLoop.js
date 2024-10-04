import { useState, useEffect } from "react";

export const TextLoop = () => {
    const texts = ["Infrastructures", "Energy", "Resources", "Infrastructures", "Energy", "Resources", "Infrastructures", "Energy", "Resources","Infrastructures", "Energy", "Resources"];
    const [textIndex, setTextIndex] = useState({
        curIndex: 0,
        prevIndex: -1
    });

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         let current = textIndex.curIndex;
    //         let newIndex = current + 1;
    //         if(newIndex >= texts.length) newIndex = 0;
    //         setTextIndex({
    //             curIndex: newIndex,
    //             prevIndex: current
    //         });
    //       }, 2000)
      
    //     return (() => clearInterval(interval)) //This is a cleanup function
    //   })

    return <>
    {
        texts.map((ele, index) => {
            if(index === textIndex.curIndex){
            // return <div className="slide-up" key={"some_child"+index}>{texts[textIndex.curIndex]}</div>
            }else if(index === textIndex.prevIndex){
                // return <div className="slide-down" key={"hide_child"+index}>{texts[textIndex.prevIndex]}</div>
            }else{
                return ""
            }
        })
    }
    </>
}

export default TextLoop;