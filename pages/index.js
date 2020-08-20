import React, { useState, useEffect, useRef } from 'react';
import TopBar from '../components/organisams/TopBar';
import { useRouter } from 'next/router';
import {
  TextInputes,
  OptionSelect,
  DropDown,
  DropDownWithImage,
  PhoneNoInput,
  OtpInput,
} from '../components/molecules/Inputes';
import { ButtonMain } from '../components/atom/Button';
import Toast from '../components/molecules/Toast';
import publicIp from 'public-ip';

const data = {
  navbar: ['0,-1,-1', '1,0,-1', '1,1,0'],
  meta: [
    {
      headline: 'Add your personal details',
      paragraph:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    },
    {
      headline: 'Add your company details',
      paragraph:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    },
    {
      headline: 'Enter your OTP',
      paragraph:
        'For your security, we need to verify your identity. we sent a 5-digit code to name@domain.com. Please enter it bellow',
    },
  ],
  country: [
    { name: 'Australia', image: 'https://www.countryflags.io/AU/flat/32.png' },
    { name: 'India', image: 'https://www.countryflags.io/IN/flat/32.png' },
    { name: 'Canada', image: 'https://www.countryflags.io/CA/flat/32.png' },
  ],
  state: ['Delhi', 'Tamil Nadu', 'West Bengal'],
};

export default function index() {
  const router = useRouter();
  var myRef = useRef();
  const [position, setPosition] = useState(0);
  const [values, setValues] = useState({
    name: '',
    gender: '',
    country: '',
    state: '',
    phone: '',
    companyName: '',
    email: '',
    jobTitle: '',
    yearsOfExp: '',
    profileImage: '',
    otp: '',
  });

  const [myTost, setTost] = useState({
    message: 'something',
    type: 'error',
    show: false,
  });

  const [tougleSelect, setTougle] = useState(false);

  useEffect(() => {
    const getIp = async () => {
      await publicIp.v4().then((res) => {
        fetch(`https://ipapi.co/${res}/json`).then((result) => {
          result.json().then((av) =>
            setValues({
              ...values,
              country: av.country_name,
              state: av.region,
            })
          );
        });
      });
    };

    getIp();
  }, []);

  const uploadFile = () => {
    document.getElementById('selectImage').click();
  };

  const submit = () => {
    //console.log(values);
    localStorage.setItem('data', JSON.stringify(values));
    router.push('/welcome');
  };

  const next = () => {
    //console.log(position);
    //console.log(values);
    //console.log(validation());
    position < data.navbar.length - 1 && validation()
      ? setPosition(position + 1)
      : null;
  };

  const renderBody = () => {
    switch (position) {
      case 0:
        return personalDetailsRender();
      case 1:
        return companyDetailsRender();
      case 2:
        return otpRender();
      default:
        return; //console.log('Go to Welcome page.');
    }
  };

  const validation = () => {
    const checkNonEmpty = (str) => {
      //console.log('>>>>>>>>');
      //console.log(str);
      return str.length > 0;
    };

    const checkPhoneNo = (str) => {
      return str.length === 10;
    };

    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    const showError = (msg) => {
      setTost({
        ...myTost,
        message: msg,
        type: 'error',
        show: true,
      });
      return false;
    };

    const stepOneValidation = () => {
      if (
        !Object.keys(values)
          .slice(0, 5)
          .every((item) =>
            checkNonEmpty(values[item])
              ? true
              : showError(`${item} can't be empty.`) === true
          )
      ) {
        return false;
      }

      if (!checkPhoneNo(values['phone'])) {
        showError('Phone number should be 10 digit.');
        return false;
      }

      return true;
    };

    const stepTwoValidation = () => {
      if (
        !Object.keys(values)
          .slice(5, 10)
          .every((item) =>
            checkNonEmpty(values[item])
              ? true
              : showError(`${item} can't be empty.`) === true
          )
      ) {
        return false;
      }

      if (!validateEmail(values['email'])) {
        showError('Please type a valid email.');
        return false;
      }

      if (!tougleSelect) {
        showError('Please check Trams and Condition');
        return false;
      }

      return true;
    };

    switch (position) {
      case 0:
        return stepOneValidation();
      case 1:
        return stepTwoValidation();
    }
  };

  const personalDetailsRender = () => (
    <>
      <div className="box">
        <TextInputes
          title={'Full Name'}
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <OptionSelect
          value={values.gender}
          options={['Male', 'Female', 'Other']}
          onSelect={(e) => setValues({ ...values, gender: e })}
          title="Gender"
        />
        <DropDownWithImage
          value={values.country}
          options={data.country}
          onChange={(e) => setValues({ ...values, country: e })}
          title="Country"
        />
        <DropDown
          title="state"
          value={values.state}
          onChange={(e) => setValues({ ...values, state: e })}
          options={data.state}
        />
        <PhoneNoInput
          placeholder="Your mobile number"
          title="Phone"
          value={values.phone}
          onChange={(e) => setValues({ ...values, phone: e })}
        />
        <ButtonMain onClick={() => next()} name="next" />
      </div>
      <div className="row">
        <p style={{ fontWeight: '300' }}>Already have an account? </p>
        <p style={{ color: '#ED5A35' }}> Log in</p>
      </div>
    </>
  );

  const companyDetailsRender = () => (
    <>
      <div className="box">
        <div className="row" style={{ marginTop: 25, marginBottom: 10 }}>
          <img
            src={
              values.profileImage.length > 1
                ? values.profileImage
                : require('../assets/png/placeholder.png')
            }
            style={{
              borderRadius: 80,
              height: 80,
              width: 80,
              opacity: 1,
              marginRight: 15,
              objectFit: 'cover',
            }}
          />
          <input
            type="file"
            id="selectImage"
            style={{ display: 'none' }}
            onChange={(e) =>
              setValues({
                ...values,
                profileImage: URL.createObjectURL(e.target.files[0]),
              })
            }
          />
          <p className="bold-red " onClick={() => uploadFile()}>
            {' '}
            Upload your company logo
          </p>
        </div>
        <TextInputes
          placeholder="Company Name"
          title={'Company name'}
          value={values.companyName}
          onChange={(e) =>
            setValues({ ...values, companyName: e.target.value })
          }
        />
        <TextInputes
          placeholder="Email id"
          title={'email'}
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <TextInputes
          placeholder="Job Title"
          title={'Job title'}
          value={values.jobTitle}
          onChange={(e) => setValues({ ...values, jobTitle: e.target.value })}
        />
        <TextInputes
          type="number"
          placeholder="Years of Exprience"
          title={'Years of Exprience'}
          value={values.yearsOfExp}
          onChange={(e) => setValues({ ...values, yearsOfExp: e.target.value })}
        />
        <div className="row">
          <div className="check-box" onClick={() => setTougle(!tougleSelect)}>
            {tougleSelect && (
              <img
                src="https://img.icons8.com/ios-glyphs/30/000000/checkmark.png"
                style={{ height: 18, width: 18 }}
              />
            )}
          </div>
          <div className="row">
            <p className="lite-text">I accept the </p>
            <p className="bold-red">Trams and Conditions</p>
          </div>
        </div>
        <div className="row" style={{ width: '100%', flex: 1 }}>
          <div
            onClick={() => setPosition(position - 1)}
            className="button-raw"
            style={{ backgroundColor: '#E7E7E7' }}
          >
            Back
          </div>
          <ButtonMain
            disable={false}
            onClick={() => next()}
            name="Send OTP"
            style={{ flex: 1 }}
          />
        </div>
      </div>
    </>
  );

  const otpRender = () => {
    //console.log(values);
    return (
      <>
        <div className="box">
          <OtpInput
            onChange={(e) => setValues({ ...values, otp: e })}
            title="Enter your code"
          />
          <div className="row" style={{ width: '100%', flex: 1 }}>
            <div
              onClick={() => setPosition(position - 1)}
              className="button-raw"
              style={{ backgroundColor: '#E7E7E7' }}
            >
              Back
            </div>
            <ButtonMain
              disable={values.otp.length < 4}
              onClick={() => submit()}
              name="Verify"
              style={{ flex: 1 }}
            />
          </div>
          <hr style={{ opacity: 0.3 }} />
          <div
            className="row"
            style={{
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p
              style={{
                fontWeight: '300',
                marginBottom: 0,
                textAlign: 'center',
                maxWidth: 450,
              }}
            >
              Didn't recive them email? Check your spam filter for an email from
              <p style={{ color: '#ED5A35', margin: 0, textAlign: 'center' }}>
                name@domain.com
              </p>
            </p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="body">
      <>
        <TopBar seq={data.navbar[position]} />
        <div className="center-container">
          <div>
            <h1>{data.meta[position].headline}</h1>
            <p style={{ opacity: 0.9, fontWeight: '400', maxWidth: 450 }}>
              {data.meta[position].paragraph}
            </p>
          </div>
          {renderBody()}
        </div>
        {myTost.show && (
          <Toast
            type={myTost.type}
            message={myTost.message}
            onChange={() => setTost({ ...myTost, show: !myTost.show })}
          />
        )}
      </>
    </div>
  );
}
