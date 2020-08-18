import React from 'react';
/**
 *
 * @param param0 -1 = not selected, 0 = selected , 1 = done
 */

export default function Step({ status = -1, name = 'No name', stepCount = 0 }) {
  switch (status) {
    case -1:
      return (
        <div className="row step" style={{ opacity: 0.7 }}>
          <span className="circle black_shadow">
            <h3 style={{ fontWeight: 500, fontSize: 20 }}>{stepCount}</h3>
          </span>
          <p style={{ marginLeft: 15, fontSize: 18 }}>{name}</p>
        </div>
      );
    case 0:
      return (
        <div className="row step" style={{ opacity: 1 }}>
          <span className="circle">
            <h3 style={{ fontWeight: 500, fontSize: 20 }}>{stepCount}</h3>
          </span>
          <p style={{ marginLeft: 15, fontSize: 18 }}>{name}</p>
        </div>
      );
    case 1:
      return (
        <div className="row step" style={{ opacity: 0.9 }}>
          <span className="circle black_shadow">
            <img
              src={require('../../assets/png/check1.png')}
              style={{ height: 20, width: 20 }}
            />
          </span>
          <p style={{ marginLeft: 15, fontSize: 18 }}>{name}</p>
        </div>
      );
    default:
      return null;
  }
}
