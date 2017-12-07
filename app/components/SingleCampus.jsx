import React from 'react';
import store from '../store';

export default SingleCampus = (props) => {
    const campuseId = props.match.params.campusId;
    const { students } = store.getState()
    return (
        <div className="singlecampus">
            {
                <div>
                    <h3>{ campus.name }</h3>
                    <img src={ campus.imageUrl } className="img-thumbnail" />
                </div>
            }
      </div>
    )
}