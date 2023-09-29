"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useRef, useState } from "react";

export default function Home() {
  const emailInputRef = useRef();
  const feedbackRef = useRef();

  const [alldata, setAlldata] = useState([]);

  const handleGetreq = () => {
    fetch("/api/feedback", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAlldata(data.feedback);
        console.log(data.feedback);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackRef.current.value;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail, btext: enteredFeedback }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Your E mail Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackRef} />
        </div>
        <button type="submit">Send Feedback</button>
      </form>
      <button onClick={handleGetreq}>Show Data</button>
      <ul style={{ color: "white" }}>
        {alldata.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
