import React, { useState } from "react";
import "./App.css";

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const calculateDifference = () => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end)) return null;

    // Ensure start is always before end
    const earlier = start < end ? start : end;
    const later = start < end ? end : start;

    // --- Part 1: Human-readable years, months, days ---
    let years = later.getFullYear() - earlier.getFullYear();
    let months = later.getMonth() - earlier.getMonth();
    let days = later.getDate() - earlier.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(later.getFullYear(), later.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // --- Part 2: Total time difference ---
    const diffMs = Math.abs(end - start);
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMonths = years * 12 + months;

    return {
      human: { years, months, days },
      total: {
        months: totalMonths,
        weeks: totalWeeks,
        days: totalDays,
        hours: totalHours,
        minutes: totalMinutes,
        seconds: totalSeconds,
      },
    };
  };

  const result = calculateDifference();

  return (
    <div className="container">
      <h1>Date Calculator</h1>

      <div className="input-group">
        <label>Start Date:</label>
        <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      </div>

      <div className="input-group">
        <label>End Date:</label>
        <input type="date" onChange={(e) => setEndDate(e.target.value)} />
      </div>

      {result && (
        <div className="result">
          <h2>
            {result.human.years} year{result.human.years !== 1 && "s"},{" "}
            {result.human.months} month{result.human.months !== 1 && "s"},{" "}
            {result.human.days} day{result.human.days !== 1 && "s"}
          </h2>

          <br/>
          <h2>Total Units:</h2>
          <p><strong>Total Months:</strong> {result.total.months.toLocaleString("en-IN")}</p>
          <p><strong>Total Weeks:</strong> {result.total.weeks.toLocaleString("en-IN")}</p>
          <p><strong>Total Days:</strong> {result.total.days.toLocaleString("en-IN")}</p>
          <p><strong>Total Hours:</strong> {result.total.hours.toLocaleString("en-IN")}</p>
          <p><strong>Total Minutes:</strong> {result.total.minutes.toLocaleString("en-IN")}</p>
          <p><strong>Total Seconds:</strong> {result.total.seconds.toLocaleString("en-IN")}</p>
        </div>
      )}

    </div>
  );
}

export default App;
