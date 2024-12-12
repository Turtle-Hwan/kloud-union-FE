import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export interface User {
  nickname: string;
  age: number;
  gender: string;
  height: number;
  stationName: string;
  line: number;
  upDown: string;
  timeToLeave: string;
  latitude: string;
  longitude: string;
}

const Mypage: React.FC = () => {
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser
      ? JSON.parse(savedUser)
      : {
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
        };
  });

  const [inputs, setInputs] = useState({ ...user });

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const userData = await response.json();
      if (response.status === 200) {
        setUser((prevUser) => ({
          ...prevUser,
          ...userData,
        }));
        setInputs((prevInputs) => ({
          ...prevInputs,
          ...userData,
        }));
      }
    } catch (error) {
      console.error("API 연결 실패:", error);
      // API 연결 실패 시 아무 것도 하지 않음 (기존 데이터 유지)
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (value: string, field: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  // updateProfile, updateStation, updateTimeToLeave, updateCoordinate 함수들도 비슷하게 수정
  const updateProfile = async () => {
    const { age, gender, height } = inputs;
    try {
      await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ age, gender, height }),
      });
      setUser((prev) => ({ ...prev, age, gender, height }));
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      // 실패 시에도 로컬 상태는 업데이트
      setUser((prev) => ({ ...prev, age, gender, height }));
    }
  };

  const updateStation = async () => {
    const { stationName, line, upDown } = inputs;
    try {
      await fetch("/api/user/station", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stationName, line, upDown }),
      });
      setUser((prev) => ({ ...prev, stationName, line, upDown }));
    } catch (error) {
      console.error("역 정보 업데이트 실패:", error);
    }
  };

  const updateTimeToLeave = async () => {
    const { timeToLeave } = inputs;
    try {
      await fetch("/api/user/timeToLeave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timeToLeave }),
      });
      setUser((prev) => ({ ...prev, timeToLeave }));
    } catch (error) {
      console.error("출발 시각 업데이트 실패:", error);
    }
  };

  const updateCoordinate = async () => {
    const { latitude, longitude } = inputs;
    try {
      await fetch("/api/user/coordinate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude }),
      });
      setUser((prev) => ({ ...prev, latitude, longitude }));
    } catch (error) {
      console.error("좌표 업데이트 실패:", error);
    }
  };

  const geoLocationCoord = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude.toString();
          const longitude = position.coords.longitude.toString();
          setInputs((prev) => ({ ...prev, latitude, longitude }));
          setUser((prev) => ({ ...prev, latitude, longitude }));
        },
        (error) => {
          console.error("위치 정보 가져오기 실패:", error.message);
        }
      );
    } else {
      console.log("Geolocation을 지원하지 않는 브라우저입니다.");
    }
  };

  const updateAll = async () => {
    const {
      age,
      gender,
      height,
      stationName,
      line,
      upDown,
      timeToLeave,
      latitude,
      longitude,
    } = inputs;
    const updatedUser = { ...user };

    if (age) updatedUser.age = Number(age);
    if (gender) updatedUser.gender = gender;
    if (height) updatedUser.height = Number(height);
    if (stationName) updatedUser.stationName = stationName;
    if (line) updatedUser.line = Number(line);
    if (upDown) updatedUser.upDown = upDown;
    if (timeToLeave) updatedUser.timeToLeave = timeToLeave;
    if (latitude) updatedUser.latitude = latitude;
    if (longitude) updatedUser.longitude = longitude;

    updateProfile();
    updateStation();
    updateTimeToLeave();
    updateCoordinate();
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          안녕하세요, {user.nickname || "사용자"}님!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 닉네임 입력 필드 추가 */}
        <div className="space-y-2">
          <Label htmlFor="nickname">닉네임</Label>
          <Input
            id="nickname"
            type="text"
            className="max-w-[200px]"
            value={inputs.nickname}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">나이: {inputs.age}세</Label>
          <Input
            id="age"
            type="number"
            className="max-w-[120px]"
            value={inputs.age}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label>성별: {inputs.gender}</Label>
          <RadioGroup
            value={inputs.gender}
            onValueChange={(value) => handleRadioChange(value, "gender")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Male" id="male" />
              <Label htmlFor="male">남성</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Female" id="female" />
              <Label htmlFor="female">여성</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="height">키: {inputs.height}cm</Label>
          <Input
            id="height"
            type="number"
            className="max-w-[120px]"
            value={inputs.height}
            onChange={handleInputChange}
          />
        </div>

        <Button className="w-full" onClick={updateProfile}>
          프로필 수정
        </Button>

        <div className="space-y-2">
          <Label htmlFor="stationName">출발 역: {inputs.stationName}</Label>
          <Input
            id="stationName"
            type="text"
            className="max-w-[200px]"
            value={inputs.stationName}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="line">노선: {inputs.line}호선</Label>
          <Input
            id="line"
            type="number"
            className="max-w-[200px]"
            value={inputs.line}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label>상/하행 여부: {inputs.upDown === "1" ? "상행" : "하행"}</Label>
          <RadioGroup
            value={inputs.upDown}
            onValueChange={(value) => handleRadioChange(value, "upDown")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="up" />
              <Label htmlFor="up">상행</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="down" />
              <Label htmlFor="down">하행</Label>
            </div>
          </RadioGroup>
        </div>

        <Button className="w-full" onClick={updateStation}>
          역 정보 수정
        </Button>

        <div className="space-y-2">
          <Label htmlFor="timeToLeave">
            역 출발 시각: {inputs.timeToLeave}
          </Label>
          <Input
            id="timeToLeave"
            type="time"
            className="max-w-[200px]"
            value={inputs.timeToLeave}
            onChange={handleInputChange}
          />
        </div>

        <Button className="w-full" onClick={updateTimeToLeave}>
          출발 시각 수정
        </Button>

        <div className="space-y-2">
          <Label>유저 현재 위치</Label>
          <div className="flex row justify-between">
            <div>
              <Label htmlFor="latitude">위도: {inputs.latitude}</Label>
              <Input
                id="latitude"
                type="number"
                step="0.000001"
                className="max-w-[200px]"
                value={inputs.latitude}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="longitude">경도: {inputs.longitude}</Label>
              <Input
                id="longitude"
                type="number"
                step="0.000001"
                className="max-w-[200px]"
                value={inputs.longitude}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="flex row justify-between gap-5">
          <Button
            className="w-full"
            onClick={geoLocationCoord}
            variant="secondary"
          >
            현재위치 가져오기
          </Button>
          <Button className="w-full" onClick={updateCoordinate}>
            좌표 수정
          </Button>
        </div>
        <Button className="w-full mt-4" onClick={updateAll}>
          전체 정보 수정
        </Button>

        <Link to="/home" className="block text-center">
          <Button variant="link" className="w-full">
            메인페이지로 이동
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Mypage;
