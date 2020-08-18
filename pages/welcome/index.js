import React, { useEffect, useState } from 'react';

const CSS_COLOR_NAMES = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF',
];

export default function index() {
  const [times, setTimes] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    let x = setInterval(() => {
      setTimes(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(x);
    };
  }, []);
  return (
    <div className="center-container welcome_body">
      <img
        src={require('../../assets/png/welcome.png')}
        style={{ width: '100%', maxWidth: 1000 }}
      />
      <p
        style={{ letterSpacing: '0.09em', fontWeight: '300', marginBottom: 4 }}
      >
        bkamalesh99@gmail.com
      </p>
      <div className="row" style={{ marginTop: 10 }}>
        {times.split('').map((item) => (
          <h3
            style={{
              margin: 0,
              fontSize: 25,
              fontWeight: '700',
              color:
                CSS_COLOR_NAMES[
                  Math.floor(Math.random() * CSS_COLOR_NAMES.length)
                ],
            }}
          >
            {item}
          </h3>
        ))}
      </div>
    </div>
  );
}
