import React, { useState, useRef } from "react";
import BodyClassName from "react-body-classname";
import { Helmet } from "react-helmet";
import HeaderPortal from "components/header-portal";

import "components/styles/page-submit-listing.scss";

const SubmitListingPage = () => {
  let [isFormSubmitted, setIsFormSubmitted] = useState(false);
  let [isFormDirty, setIsFormDirty] = useState(false);
  const [errorAnnouncement, setErrorAnnouncement] = useState(false);
  const inputRefs = useRef([]);
  const checkboxRef = useRef(null);

  const [formState, setFormState] = useState({
    sitename: "",
    location: "",
    fee: 0,
    legalToCamp: false,
    submittername: "",
    email: "",
    notes: "",
  });

  const changeHandler = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const key = target.id;

    setIsFormDirty(true);
    setFormState((prevformState) => ({ ...prevformState, ...{ [key]: value } }));
  };

  const submitHander = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    setErrorAnnouncement("");

    let firstEmptyFieldIndex = null;

    const formElements = Array.from(event.target.elements);

    formElements.map((field, index) => {
      if (field.getAttribute("aria-required") === "true") {
        setIsFormDirty(false);

        if (field.value.trim().length === 0) {
          // focus on the first empty field
          if (field.type !== "checkbox" && firstEmptyFieldIndex === null) {
            firstEmptyFieldIndex = index;
            inputRefs.current[index].focus();

            // console.log(`${field.id} - ${firstEmptyFieldIndex} non checkbox`);
            setErrorAnnouncement("Required fields cannot be empty");
          }
        } else if (field.type === "checkbox" && !field.checked) {
          if (firstEmptyFieldIndex === null) {
            firstEmptyFieldIndex = index;
            checkboxRef.current.focus();

            // console.log(`${field.id} - ${firstEmptyFieldIndex} checkbox?`);
            setErrorAnnouncement("Please check the required checkbox");
          }
        }
      }
    });
  };

  return (
    <BodyClassName className='header-overlap page-submit-listing'>
      <>
        <HeaderPortal>
          <h1 className='visually-hidden'>CampSpots</h1>
        </HeaderPortal>
        <section aria-labelledby='heading-about-1'>
          <header className='page-header'>
            <div className='page-header-content layout'>
              <h2 className='primary-heading h1-style' id='heading-about-1'>
                Submit Your Spot
              </h2>
            </div>
          </header>
          <article className='form-wrap'>
            <div className='layout'>
              <h3>Got a camping spot our community would enjoy? Tell us about it!</h3>
              <form
                action={""}
                aria-describedby='key'
                className={!isFormDirty ? "" : "dirty"}
                onSubmit={(event) => submitHander(event)}>
                <p className='error' role='alert' aria-relevant='all'>
                  {errorAnnouncement ? errorAnnouncement : ""}
                </p>
                <div className='two-parts-50-50'>
                  <div className='form-field'>
                    <label htmlFor='submittername'>
                      Your name{" "}
                      <span className='asterisk' abbr='required' aria-hidden='true'>
                        *
                      </span>
                    </label>
                    <input
                      aria-invalid={
                        isFormSubmitted && formState.submittername.length === 0 ? "true" : null
                      }
                      autoComplete='name'
                      aria-required='true'
                      id='submittername'
                      name='submittername'
                      onChange={changeHandler}
                      ref={(inputRef) => {
                        inputRefs.current.push(inputRef);
                      }}
                      type='text'
                    />
                  </div>
                  <div className='form-field'>
                    <label htmlFor='email'>
                      Your email address{" "}
                      <span className='asterisk' abbr='required' aria-hidden='true'>
                        *
                      </span>
                    </label>
                    <input
                      aria-required='true'
                      aria-invalid={isFormSubmitted && formState.email.length === 0 ? "true" : null}
                      autoComplete='email'
                      id='email'
                      name='email'
                      onChange={changeHandler}
                      ref={(inputRef) => {
                        inputRefs.current.push(inputRef);
                      }}
                      // pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                      type='email'
                    />
                  </div>
                </div>
                <div className='two-parts-50-50'>
                  <div className='form-field'>
                    <label htmlFor='sitename'>
                      Site Name{" "}
                      <span className='asterisk' abbr='required' aria-hidden='true'>
                        *
                      </span>
                    </label>
                    <input
                      aria-invalid={
                        isFormSubmitted && formState.sitename.length === 0 ? "true" : null
                      }
                      aria-required='true'
                      id='sitename'
                      name='sitename'
                      onChange={changeHandler}
                      ref={(inputRef) => {
                        inputRefs.current.push(inputRef);
                      }}
                      type='text'
                    />
                  </div>
                  <div className='form-field'>
                    <label htmlFor='location'>
                      Location{" "}
                      <span className='asterisk' abbr='required' aria-hidden='true'>
                        *
                      </span>
                    </label>
                    <input
                      aria-invalid={
                        isFormSubmitted && formState.location.length === 0 ? "true" : null
                      }
                      aria-required='true'
                      id='location'
                      name='location'
                      onChange={changeHandler}
                      ref={(inputRef) => {
                        inputRefs.current.push(inputRef);
                      }}
                      type='text'
                    />
                  </div>
                </div>
                <div className='two-parts-50-50'>
                  <div className='form-field'>
                    <label htmlFor='fee'>Nightly fee</label>
                    <input
                      id='fee'
                      name='fee'
                      onChange={changeHandler}
                      placeholder='$'
                      ref={(inputRef) => {
                        inputRefs.current.push(inputRef);
                      }}
                      type='number'
                    />
                  </div>
                  <div className='form-field'>
                    <label htmlFor='legalToCamp'>
                      Can the public legally camp here?{" "}
                      <span className='asterisk' abbr='required' aria-hidden='true'>
                        *
                      </span>
                    </label>
                    <input
                      aria-invalid={isFormSubmitted && !formState.legalToCamp ? "true" : null}
                      aria-required='true'
                      id='legalToCamp'
                      name='legalToCamp'
                      onChange={changeHandler}
                      ref={checkboxRef}
                      type='checkbox'
                      value={formState.legalToCamp}
                    />
                  </div>
                </div>
                <div className='form-field'>
                  <label htmlFor='notes'>Notes</label>
                  <textarea
                    onChange={changeHandler}
                    ref={(inputRef) => {
                      inputRefs.current.push(inputRef);
                    }}
                    id='notes'
                    name='notes'></textarea>
                </div>
                <p id='key' className='asterisk' aria-hidden='true'>
                  * Fields are required.
                </p>
                <div className='form-submit'>
                  <button className='btn-submit'>Submit</button>
                </div>
              </form>
            </div>
          </article>
        </section>
      </>
    </BodyClassName>
  );
};

export default SubmitListingPage;
