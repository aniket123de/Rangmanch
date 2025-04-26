import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../../animation/animate";
import { ThemeContext } from "../../context/ThemeContext";
import styled from "styled-components";
import BackgroundPattern from "../common/BackgroundPattern";

const StyledWrapper = styled.div`
  .input {
    color: #333;
    font-size: 0.9rem;
    background-color: rgba(255, 255, 255, 0.1);
    width: 100%;
    box-sizing: border-box;
    padding-inline: 0.5em;
    padding-block: 0.7em;
    border: none;
    border-bottom: var(--border-height) solid var(--border-before-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
  }

  .input::placeholder {
    color: #666;
  }

  .input-border {
    position: absolute;
    background: var(--border-after-color);
    height: 2px;
    width: 100%;
    bottom: 0;
    left: 0;
    transform: scaleX(0%);
    transition: transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }

  .input:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.15);
  }

  .input:focus + .input-border {
    transform: scaleX(100%);
  }

  .form-control {
    position: relative;
    --width-of-input: 300px;
    --border-height: 1px;
    --border-before-color: rgba(221, 221, 221, 0.39);
    --border-after-color: #5891ff;
  }

  .input-alt {
    font-size: 1.2rem;
    padding-inline: 1em;
    padding-block: 0.8em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  .input-border-alt {
    height: 3px;
    background: linear-gradient(90deg, #ff6464 0%, #ffbf59 50%, #47c9ff 100%);
    transition: transform 0.4s cubic-bezier(0.42, 0, 0.58, 1);
  }

  .input-alt:focus + .input-border-alt {
    transform: scaleX(100%);
  }

  /* Dark mode adjustments */
  .dark & .input {
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
  }

  .dark & .input::placeholder {
    color: #999;
  }

  .dark & .input:focus {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const Newsletter = () => {
  const { isDark } = useContext(ThemeContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target;
    const formData = new FormData(form);
    
    try {
      const formJson = Object.fromEntries(formData.entries());
      
      const response = await fetch(`https://formsubmit.co/ajax/rangmanchofficial30@gmail.com`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formJson)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          submitted: true,
          success: true,
          message: "Thank you for your message! We will get back to you soon."
        });
        form.reset();
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        submitted: true,
        success: false,
        message: error.message || "Failed to send message. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter">
      <BackgroundPattern>
        <div className="w-full dark:bg-dark-bg transition-colors duration-300">
          <div className="max-w-[600px] mx-auto space-y-5 py-14">
            <motion.h1
              variants={SlideUp(0.2)}
              initial="initial"
              whileInView="animate"
              className="text-3xl font-bold font-serif text-center dark:text-white"
            >
              Contact Us
            </motion.h1>
            <motion.p
              variants={SlideUp(0.4)}
              initial="initial"
              whileInView="animate"
              className="max-w-[400px] mx-auto text-gray-500 dark:text-gray-400 text-sm text-center"
            >
              Have questions, ideas, or just want to say hello?
              Fill out the form below and our team at Rangmanch will get back to you shortly.
            </motion.p>
            
            {/* Success/Error Message */}
            {submitStatus.submitted && (
              <div className={`text-center p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {submitStatus.message}
              </div>
            )}
            
            {/* Contact Form */}
            <motion.form
              action={`https://formsubmit.co/rangmanchofficial30@gmail.com`}
              method="POST"
              variants={SlideUp(0.6)}
              initial="initial"
              whileInView="animate"
              className="!mt-10 space-y-4"
              onSubmit={handleSubmit}
            >
              {/* FormSubmit specific hidden fields */}
              <input type="hidden" name="_subject" value="New Contact Form Submission from Rangmanch" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={window.location.href} />
              <input type="hidden" name="_replyto" value="" />
              
              <StyledWrapper>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name"
                      className="input input-alt"
                    />
                    <span className="input-border input-border-alt" />
                  </div>
                  <div className="form-control">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Your Email"
                      className="input input-alt"
                    />
                    <span className="input-border input-border-alt" />
                  </div>
                </div>
                <div className="form-control mt-4">
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Subject"
                    className="input input-alt"
                  />
                  <span className="input-border input-border-alt" />
                </div>
                <div className="form-control mt-4">
                  <textarea
                    name="message"
                    required
                    placeholder="Your Message"
                    rows="4"
                    className="input input-alt"
                    style={{ resize: "none" }}
                  ></textarea>
                  <span className="input-border input-border-alt" />
                </div>
              </StyledWrapper>
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg uppercase font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </BackgroundPattern>
    </section>
  );
};

export default Newsletter;
