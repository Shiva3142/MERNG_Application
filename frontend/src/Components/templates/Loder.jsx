import React from 'react'

function Loder() {
    return (
        <div style={{display:"flex",justifyContent:"center","margin":"20px",position:"fixed",left:"0",width:"100vw",top:"0",zIndex:"100000"}}>
            <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",width:"200px",background:"aqua",padding:"10px",borderRadius:"20px"}}>
            <div className="ui active inline loader"></div>
            Loading ...
            </div>
        </div>
    )
}

export default Loder
