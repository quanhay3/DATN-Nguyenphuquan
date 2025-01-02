import React from 'react'

const style = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxHeight: "min((100vh - 69px) - 60px, 734px)",
    minHeight: "100px",
    borderRadius: "8px",
    padding: "8px 0",
    overflowX: "hidden",
    overflowY: "auto",
    overscrollBehaviorY: "contain",
}

const Wrapper = ({ children, className }) => {
    return <div style={style} className={className}>
        {children}
    </div>;
}

export default Wrapper
