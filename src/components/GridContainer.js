const GridContainer = ({ children }) => {
    return (
        <div className="grid-container"> {/* "grid-container fluid" for full page width*/}
            {children}
        </div>
    )
}

export default GridContainer