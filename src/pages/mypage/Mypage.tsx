import React, { useState, useEffect } from "react";

interface User {
  nickname: string;
  age: number;
  gender: string;
  height: number;
  stationName: string;
  line: number;
  upDown: string;
  timeToLeave: string;
  latitude: number;
  longitude: number;
}

const Mypage: React.FC = () => {
  const [user, setUser] = useState<User>({
    nickname: "",
    age: 0,
    gender: "",
    height: 0,
    stationName: "",
    line: 0,
    upDown: "",
    timeToLeave: "",
    latitude: 0,
    longitude: 0,
  });

  const [inputs, setInputs] = useState({
    age: "",
    gender: "",
    height: "",
    stationName: "",
    line: "",
    upDown: "",
    timeToLeave: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    // Fetch user data from API
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    // Replace with actual API call
    const response = await fetch("/api/user");
    const userData = await response.json();
    setUser(userData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };

  const updateProfile = async () => {
    const { age, gender, height } = inputs;
    await fetch("/api/user/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ age, gender, height }),
    });
    fetchUserData();
  };

  const updateStation = async () => {
    const { stationName, line, upDown } = inputs;
    await fetch("/api/user/station", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stationName, line, upDown }),
    });
    fetchUserData();
  };

  const updateTimeToLeave = async () => {
    const { timeToLeave } = inputs;
    await fetch("/api/user/timeToLeave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timeToLeave }),
    });
    fetchUserData();
  };

  const updateCoordinate = async () => {
    const { latitude, longitude } = inputs;
    await fetch("/api/user/coordinate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latitude, longitude }),
    });
    fetchUserData();
  };

  const geoLocationCoord = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setInputs({
            ...inputs,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        },
        (error) => {
          console.error("오류 발생: " + error.message);
        }
      );
    } else {
      console.log("Geolocation을 지원하지 않는 브라우저입니다.");
    }
  };

  return (
    <div className="profile">
      <h1>안녕하세요, {user.nickname}님!</h1>
      <div className="profile-info">
        <div className="info-item">나이: {user.age}세</div>
        <div className="info-item">
          성별:{" "}
          {user.gender === "Male" ? "남" : user.gender === "Female" ? "여" : ""}
        </div>
        <div className="info-item">키: {user.height}cm</div>
      </div>

      <div className="profile-info">
        <div className="info-item">출발역: {user.stationName}</div>
        <div className="info-item">노선: {user.line}호선</div>
        <div className="info-item">
          상/하행 여부: {user.upDown === "1" ? "상행" : "하행"}
        </div>
      </div>

      <div className="profile-info">
        <div className="info-item">역 출발 시각: {user.timeToLeave}</div>
        <div className="info-item">위도: {user.latitude}</div>
        <div className="info-item">경도: {user.longitude}</div>
      </div>

      <div className="input-group">
        <input
          type="number"
          id="age"
          placeholder="나이"
          value={inputs.age}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="gender"
          placeholder="성별 (Male/Female)"
          value={inputs.gender}
          onChange={handleInputChange}
        />
        <input
          type="number"
          id="height"
          placeholder="키 (cm)"
          value={inputs.height}
          onChange={handleInputChange}
        />
        <button className="update-button" onClick={updateProfile}>
          수정
        </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          id="stationName"
          placeholder="출발역"
          value={inputs.stationName}
          onChange={handleInputChange}
        />
        <input
          type="number"
          id="line"
          placeholder="N호선"
          value={inputs.line}
          onChange={handleInputChange}
        />
        <input
          type="number"
          id="upDown"
          placeholder="상행:1 | 하행:2"
          value={inputs.upDown}
          onChange={handleInputChange}
        />
        <button className="update-button" onClick={updateStation}>
          수정
        </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          id="timeToLeave"
          placeholder="출발 시각 (hh:mm:ss)"
          value={inputs.timeToLeave}
          onChange={handleInputChange}
        />
        <button className="update-button" onClick={updateTimeToLeave}>
          수정
        </button>
      </div>

      <div className="input-group">
        <input
          type="number"
          id="latitude"
          placeholder="위도"
          step="0.000001"
          value={inputs.latitude}
          onChange={handleInputChange}
        />
        <input
          type="number"
          id="longitude"
          placeholder="경도"
          step="0.000001"
          value={inputs.longitude}
          onChange={handleInputChange}
        />
        <button className="update-button" onClick={updateCoordinate}>
          수정
        </button>
        <button className="update-button" onClick={geoLocationCoord}>
          현재위치 가져오기
        </button>
      </div>

      <a href="/api/page/main" className="redirect-button">
        메인페이지로 이동
      </a>
    </div>
  );
};

export default Mypage;
