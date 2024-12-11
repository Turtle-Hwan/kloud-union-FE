// App.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface User {
  stationName: string;
  line: number;
  upDown: number;
  timeToLeave: string;
}

const Index: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("...");
  const [properTime, setProperTime] = useState<string>("...");
  const [firstTrain, setFirstTrain] = useState<string>("...");
  const [secondTrain, setSecondTrain] = useState<string>("...");

  // Assume user data is fetched from an API or passed as props
  const user: User = {
    stationName: "서울",
    line: 1,
    upDown: 1,
    timeToLeave: "09:00",
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchProperTime();
    fetchRealTimeData();
  }, []);

  const fetchProperTime = async () => {
    try {
      const response = await fetch("/api/subway/properTime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stationName: user.stationName,
          line: user.line,
          upDown: user.upDown,
          timeToLeave: user.timeToLeave,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.status);
      }
      const data = await response.json();
      setProperTime(data.properTime || "정보 없음");
    } catch (error) {
      console.error("Error fetching proper time:", error);
      setProperTime("오류 발생");
    }
  };

  const fetchRealTimeData = async () => {
    try {
      const response = await fetch("/api/subway/realTime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stationName: user.stationName,
          line: user.line,
          upDown: user.upDown,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.status);
      }
      const data = await response.json();
      setFirstTrain(data.first ? `${data.first}초 후` : "정보 없음");
      setSecondTrain(data.second ? `${data.second}초 후` : "정보 없음");
    } catch (error) {
      console.error("Error fetching real-time data:", error);
      setFirstTrain("오류 발생");
      setSecondTrain("오류 발생");
    }
  };

  return (
    <div className="time-container">
      <p className="station-name">{user.stationName}역</p>
      <p>
        현재 시각: <span className="bold-time">{currentTime}</span>
      </p>
      <p>
        적정 열차 도착 예정 시각: <div className="big-time">{properTime}</div>
      </p>

      <div className="train-info">
        <p>
          첫 번째 열차 도착 예정 시간: <span>{firstTrain}</span>
        </p>
        <p>
          두 번째 열차 도착 예정 시간: <span>{secondTrain}</span>
        </p>
      </div>

      <Link to="/mypage" className="redirect-button">
        마이페이지로 이동
      </Link>
    </div>
  );
};

export default Index;
