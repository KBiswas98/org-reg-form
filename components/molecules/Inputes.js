import React, { useState, useRef, useEffect } from 'react';
import { ButtonLite } from '../atom/Button';

function TextInputes({
  title = 'no title',
  placeholder = 'Type something',
  onChange,
  value,
  type = 'text',
}) {
  const myRef = useRef(null);
  const [renderColor, setRenderColor] = useState(false);

  useEffect(() => {
    console.log('use Effect');
    document.addEventListener('mousedown', handelClick, false);
    return () => {
      document.removeEventListener('mousedown', handelClick, false);
    };
  }, []);

  const handelClick = (e) => {
    if (myRef.current.contains(e.target)) {
      return;
    }
    console.log(e, myRef);
    document.removeEventListener('mousedown', handelClick, false);
    setRenderColor(false);
  };

  const activeClick = () => {
    setRenderColor(true);
    document.addEventListener('mousedown', handelClick, false);
  };

  return (
    <div key={Date.now()} className="contain">
      <p
        style={{
          marginBottom: 5,
          opacity: 0.7,
          fontSize: 14,
          textTransform: 'capitalize',
          color: renderColor ? '#ED5A35' : '#000',
        }}
      >
        {title}
      </p>
      <input
        type={type}
        autoFocus={renderColor}
        key={Date.now()}
        ref={myRef}
        onClick={(e) => activeClick()}
        className="text-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

function OptionSelect({ title = 'label', options, value, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(options.indexOf(value));

  const onOptionChange = (index) => {
    onSelect(options[index]);
    setSelectedIndex(index);
  };

  return (
    <div key={Date.now()} className="contain">
      <p
        style={{
          marginBottom: 5,
          opacity: 0.7,
          fontSize: 14,
          textTransform: 'capitalize',
          color: '#000',
        }}
      >
        {title}
      </p>
      <div className="row">
        {options.map((item, index) => (
          <ButtonLite
            name={item}
            isActive={index === selectedIndex}
            onClick={() => onOptionChange(index)}
          />
        ))}
      </div>
    </div>
  );
}

function DropDown({
  title = 'no title',
  options = ['a', 'b'],
  onChange,
  value,
}) {
  const myRef = useRef(null);
  const [renderColor, setRenderColor] = useState(false);

  useEffect(() => {
    console.log('use Effect');
    document.addEventListener('mousedown', handelClick, false);
    return () => {
      document.removeEventListener('mousedown', handelClick, false);
    };
  }, []);

  const handelClick = (e) => {
    if (myRef.current.contains(e.target)) {
      return;
    }
    console.log(e, myRef);
    document.removeEventListener('mousedown', handelClick, false);
    setRenderColor(false);
  };

  const activeClick = () => {
    setRenderColor(true);
    document.addEventListener('mousedown', handelClick, false);
  };

  return (
    <div key={Date.now()} className="contain">
      <p
        style={{
          marginBottom: 5,
          opacity: 0.7,
          fontSize: 14,
          textTransform: 'capitalize',
          color: renderColor ? '#ED5A35' : '#000',
        }}
      >
        {title}
      </p>

      <select
        ref={myRef}
        autoFocus={renderColor}
        onClick={(e) => activeClick()}
        className="text-input option-select"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        {options.map((itm) => (
          <option value={itm}>{itm} </option>
        ))}
      </select>
    </div>
  );
}

function DropDownWithImage({
  title = 'no title',
  options = ['a', 'b'],
  onChange,
  value,
}) {
  const myRef = useRef(null);
  const [renderColor, setRenderColor] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const [selectedOne, setSelectedOne] = useState(
    options.findIndex((item) => item.name === value)
  );

  useEffect(() => {
    console.log('use Effect');
    document.addEventListener('mousedown', handelClick, false);
    return () => {
      document.removeEventListener('mousedown', handelClick, false);
    };
  }, []);

  const handelClick = (e) => {
    if (myRef.current.contains(e.target)) {
      return;
    }
    console.log(e, myRef);
    document.removeEventListener('mousedown', handelClick, false);
    setRenderColor(false);
  };

  const activeClick = () => {
    setRenderColor(true);
    setShowBody(!showBody);
    document.addEventListener('mousedown', handelClick, false);
  };

  const handelChange = (index) => {
    onChange(options[index].name);
    setSelectedOne(index);
  };

  return (
    <div key={Date.now()} className="contain">
      <p
        style={{
          marginBottom: 5,
          opacity: 0.7,
          fontSize: 14,
          textTransform: 'capitalize',
          color: renderColor ? '#ED5A35' : '#000',
        }}
      >
        {title}
      </p>

      <div
        ref={myRef}
        autoFocus={renderColor}
        onClick={(e) => activeClick()}
        className="text-input stack"
        value={value}
        style={{
          height: showBody ? 100 : 35,
          transitionDuration: '900ms',
          overflow: showBody ? 'scroll' : 'hidden',
        }}
      >
        {showBody ? (
          options.map((item, index) => (
            <div
              onClick={() => handelChange(index)}
              className="row"
              style={{ marginBottom: 5, marginTop: 4 }}
            >
              <div className="circle-image-crop">
                <img src={item.image} className="circle-image" />
              </div>
              {item.name}
            </div>
          ))
        ) : (
          <div className="row drd" style={{ marginBottom: 5, marginTop: 4 }}>
            <div className="circle-image-crop">
              <img src={options[selectedOne].image} className="circle-image" />
            </div>
            {options[selectedOne].name}
          </div>
        )}
      </div>
    </div>
  );
}

function PhoneNoInput({
  title = 'no title',
  placeholder = 'Type something',
  onChange,
  value,
}) {
  const myRef = useRef(null);
  const [renderColor, setRenderColor] = useState(false);

  useEffect(() => {
    console.log('use Effect');
    document.addEventListener('mousedown', handelClick, false);
    return () => {
      document.removeEventListener('mousedown', handelClick, false);
    };
  }, []);

  const handelClick = (e) => {
    if (myRef.current.contains(e.target)) {
      return;
    }
    console.log(e, myRef);
    document.removeEventListener('mousedown', handelClick, false);
    setRenderColor(false);
  };

  const activeClick = () => {
    setRenderColor(true);
    document.addEventListener('mousedown', handelClick, false);
  };

  return (
    <div key={Date.now()} className="contain" style={{ position: 'relative' }}>
      <p
        style={{
          marginBottom: 5,
          opacity: 0.7,
          fontSize: 14,
          textTransform: 'capitalize',
          color: renderColor ? '#ED5A35' : '#000',
        }}
      >
        {title}
      </p>
      <input
        type="number"
        autoFocus={renderColor}
        key={Date.now()}
        ref={myRef}
        onClick={(e) => activeClick()}
        className="phone-Input"
        value={value}
        maxLength={10}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <div
        className="row"
        style={{
          position: 'absolute',
          top: 39,
          left: 2,
          backgroundColor: '#F9F9F9',
          height: 34,
          width: 70,
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
          paddingLeft: 15,
        }}
      >
        <div className="circle-image-crop">
          <img
            src={'https://www.countryflags.io/IN/flat/32.png'}
            className="circle-image"
          />
        </div>
        {'+91'}
      </div>
    </div>
  );
}

function OtpInput({ title = 'no title', onChange }) {
  const myRef = useRef(null);
  const [renderColor, setRenderColor] = useState(false);
  const [otp, setOtp] = useState(new Array(5).fill(''));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    console.log('use Effect');
    document.addEventListener('mousedown', handelClick, false);
    return () => {
      document.removeEventListener('mousedown', handelClick, false);
    };
  }, []);

  const handelClick = (e) => {
    if (myRef.current.contains(e.target)) {
      return;
    }
    console.log(e, myRef);
    document.removeEventListener('mousedown', handelClick, false);
    setRenderColor(false);
  };

  const activeClick = () => {
    setRenderColor(true);
    document.addEventListener('mousedown', handelClick, false);
  };

  const handleChange = (e, index) => {
    if (isNaN(e.target.value)) return false;
    console.log(e.target.value);
    console.log(e, current);
    setOtp([...otp.map((d, idx) => (idx === index ? e.target.value : d))]);
    setCurrent(current + 1);
    onChange(otp.join(''));
  };

  return (
    <div key={Date.now()} className="contain">
      <p
        style={{
          marginBottom: 5,
          opacity: 0.7,
          fontSize: 14,
          textTransform: 'capitalize',
          color: renderColor ? '#ED5A35' : '#000',
        }}
      >
        {title}
      </p>

      <div
        className="row-center"
        ref={myRef}
        onClick={(e) => activeClick()}
        style={{
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {otp.map((data, index) => (
          <input
            value={data}
            type="text"
            key={index}
            maxLength="1"
            className="otp-box"
            onChange={(e) => handleChange(e, index)}
            autoFocus={index === current}
          />
        ))}
      </div>
    </div>
  );
}

export {
  TextInputes,
  OptionSelect,
  DropDown,
  DropDownWithImage,
  PhoneNoInput,
  OtpInput,
};
