import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
//import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Index: React.FC = () => {
  // const navigate = useNavigate();
  // const [searchParams] = useSearchParams();

  const kakaoLogin = () => {
    // You might want to use a library like axios for API calls
    fetch("/api/user/login", {
      method: "GET",
      mode: "no-cors",
    })
      .then(() => {
        // Handle successful login, e.g., redirect to dashboard
        //navigate("/api/cognito/login");
        window.location.href = "/api/cognito/login";
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <div className="header">
        <div className="titleWrap">힘세고 강한 아침</div>
        <img
          src="/images/powerpowermorning.jpg"
          alt="main_img"
          className="max-w-lg mx-auto"
        />
      </div>
      <div className="contentWrap">
        <Button className="w-full" variant="default" onClick={kakaoLogin}>
          {/* <img
            src="/images/kakao_logo.png"
            alt="Kakao"
            className="socialLogo"
          /> */}
          로그인
        </Button>
      </div>

      <div className="contentWrap flex gap-5 w-full">
        <Button variant="outline" className="w-full">
          <Link to="/home" className="w-full">
            Main Page
          </Link>
        </Button>

        <Button variant="outline" className="w-full">
          <Link to="/mypage" className="w-full">
            My Page
          </Link>
        </Button>
      </div>
      <div className="contentWrap">
        <div className="projectSection">
          <h2 className="mb-5 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            프로젝트 요약
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            "힘세고 강한 아침"은 사용자의 위치 등 메타데이터와 근처 지하철의
            실시간 위치 정보, 기상청 날씨 정보를 통해 사용자의 출근 및 통학을
            돕는 웹 어플리케이션입니다.
          </p>
        </div>
        <div className="projectSection">
          <h2 className="mb-5 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            프로젝트 아키텍쳐 설계
          </h2>
          <img src="/images/cws_archi.png" alt="cws_archi.png" />
        </div>
        <div className="projectSection">
          <h2 className="mb-5 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            프로젝트 제안 배경
          </h2>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            사용자 요구사항 분석
          </h3>
          <p className="mb-5 leading-7 [&:not(:first-child)]:mt-6">
            아침마다 오늘의 기온은 어떠한지, 우산은 챙겨가야 할 지, 지금 오는 저
            지하철을 타려면 언제 나가야 할 지 아침에는 우리가 신경써야 할
            요소들이 많습니다. 사용자들은 날씨, 대중교통 정보, 그리고 출발
            시점을 한 번에 확인하고 적절한 나가는 시간을 계산하고 싶어합니다.
          </p>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            기존 솔루션의 한계점
          </h3>
          <p className="mb-5 leading-7 [&:not(:first-child)]:mt-6">
            현재 사용자는 날씨, 대중교통 정보, 그리고 실시간 위치 정보를 얻기
            위해 여러 애플리케이션을 사용해야 합니다. 각 앱은 개별적으로
            제공하는 정보만을 다루기 때문에 사용자가 이를 종합해 직접 판단해야
            하는 불편함이 있습니다.
          </p>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            서비스 제공의 필요성
          </h3>
          <p className="mb-5 leading-7 [&:not(:first-child)]:mt-6">
            아침 도우미는 사용자에게 필요한 모든 정보를 한 곳에서 제공하여,
            사용자가 분산된 여러 애플리케이션을 사용할 필요 없이 빠르고 정확하게
            정보를 얻을 수 있도록 돕습니다.
          </p>
        </div>
        <div className="projectSection">
          <h2 className="mb-5 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            프로젝트 주요 기능 및 서비스
          </h2>
          <ul className="list-disc pl-4 pt-2">
            <li>설정해둔 지하철 역의 도착 시간 정보 안내 기능</li>
            <li>매일 아침 및 하루 시간대별 날씨 정보 제공 기능</li>
            <li>사용자 출근 및 통학 적정 시각 제공 기능</li>
            <li>사용자가 직접 입력한 아침 TODO LIST</li>
            <li>날씨 및 사용자 정보에 따른 시간 조정 기능</li>
            <li>출근 및 통학 알람 기능</li>
            <li>사용자 맞춤 가중치 조정 기능</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default Index;
