import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface User {
  stationName: string;
  line: number;
  upDown: number;
  timeToLeave: string;
}

const Home: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("...");
  const [properTime, setProperTime] = useState<string>("Loading...");
  const [firstTrain, setFirstTrain] = useState<string>("Loading...");
  const [secondTrain, setSecondTrain] = useState<string>("Loading...");
  const [walkTime, setWalkTime] = useState<string>("Loading...");
  const [walkDistance, setWalkDistance] = useState<string>("Loading...");

  // Assume user data is fetched from an API or passed as props
  const user: User = {
    stationName: "서울",
    line: 1,
    upDown: 1,
    timeToLeave: "09:00",
  };

  useEffect(() => {
    const timer = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchProperTime();
    fetchRealTimeData();
    fetchStationCoordinate();
  }, []);

  const updateCurrentTime = () => {
    const now = new Date();
    setCurrentTime(
      now.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  };

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
      if (!response.ok) throw new Error("Network response was not ok");
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
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setFirstTrain(convertSeconds(data.first) + " 후" || "정보 없음");
      setSecondTrain(convertSeconds(data.second) + " 후" || "정보 없음");
    } catch (error) {
      console.error("Error fetching real-time data:", error);
      setFirstTrain("오류 발생");
      setSecondTrain("오류 발생");
    }
  };

  const fetchStationCoordinate = async () => {
    try {
      const response = await fetch("/api/subway/coordinate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stationName: user.stationName,
          line: user.line,
        }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      const userProfile = await fetchUserProfile();
      await fetchWalkDistance(userProfile, data);
      await fetchWalkTime(userProfile, data);
    } catch (error) {
      console.error("Error fetching station coordinate:", error);
    }
  };

  const fetchUserProfile = async () => {
    const response = await fetch("/api/user/profile");
    const userProfile = await response.json();
    return { latitude: userProfile.latitude, longitude: userProfile.longitude };
  };

  interface Coordinate {
    latitude: number;
    longitude: number;
  }

  const fetchWalkDistance = async (start: Coordinate, end: Coordinate) => {
    try {
      const response = await fetch("/api/distance/meter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startLongitude: start.longitude,
          startLatitude: start.latitude,
          endLongitude: end.longitude,
          endLatitude: end.latitude,
        }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const { distance } = await response.json();
      setWalkDistance(formatDistance(distance));
    } catch (error) {
      console.error("Error fetching walk distance:", error);
      setWalkDistance("오류 발생");
    }
  };

  const fetchWalkTime = async (start: Coordinate, end: Coordinate) => {
    try {
      const response = await fetch("/api/distance/seconds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startLongitude: start.longitude,
          startLatitude: start.latitude,
          endLongitude: end.longitude,
          endLatitude: end.latitude,
          speed: 30,
        }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const { moveTime } = await response.json();
      setWalkTime(convertSeconds(moveTime));
    } catch (error) {
      console.error("Error fetching walk time:", error);
      setWalkTime("오류 발생");
    }
  };

  const convertSeconds = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let result = "";
    if (hours > 0) result += `${hours}시간 `;
    if (minutes > 0 || hours > 0) result += `${minutes}분 `;
    if (result === "" && remainingSeconds === 0) return "0초";
    if (remainingSeconds > 0) result += `${remainingSeconds}초`;
    return result.trim();
  };

  const formatDistance = (meters: number): string => {
    const kilometers = meters / 1000;
    if (kilometers >= 2) return `${kilometers.toFixed(3)}km`;
    return `${meters}m`;
  };

  return (
    <div className="time-container">
      <p className="station-name">{user.stationName}역</p>
      <p>
        현재 시각: <span className="bold-time">{currentTime}</span>
      </p>
      <p>
        <span>해당 역까지 도보 도착 예상 시간 : </span>
        <span>{walkTime}</span>
      </p>
      <p>
        <span>해당 역까지 도보 도착 예상 거리 : </span>
        <span>{walkDistance}</span>
      </p>
      <p>
        <span className="bold-time">적정 열차 도착 예정 시각: </span>
        <span className="big-time">{properTime}</span>
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

export default Home;
