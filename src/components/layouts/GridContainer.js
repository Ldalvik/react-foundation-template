const GridContainer = ({ children }) => {
  return (
    <div className="grid-container"> {/* "grid-container fluid" for full page width*/}
      <div className="grid-x grid-padding-x grid-padding-y">
          {children}
        </div>
    </div>
  );
};

export default GridContainer;
