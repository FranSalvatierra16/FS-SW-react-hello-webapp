import React from "react";

const DetailPage = ({ selectedItem, onClose }) => {
  return (
    <div className="detail-page">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="detail-card">
              <button className="close-button" onClick={onClose}>
                Cerrar
              </button>
              <img src={selectedItem.img} alt={selectedItem.name || selectedItem.title} />
              <h2>{selectedItem.name || selectedItem.title}</h2>
              <p>{selectedItem.description || selectedItem.properties}</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;