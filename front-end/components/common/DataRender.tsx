import React from "react";

const DataRender = ({ loading, skeleton, data, empty, render }) => {
  if (loading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, i) => (
            <div className="" key={i}>
                <skeleton />
            </div>
        ))}
      </>
    );
  }
  if(!data) {
    return <>
    <p className="text-sm text-muted">Not found</p>
    </>
  }
  return data.map(render)
};

export default DataRender;
