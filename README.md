# 폰쿠

가족 또는 지인끼리 집단 쿠폰 관리를 위해 개발된 PWA(Progressive Web App) 웹앱

## 작동 화면

|로그인|사용가능 목록|사용완료 목록|정렬 메뉴|
|:---:|:---:|:---:|:---:|
| ![로그인](https://github.com/syki66/poncoo/assets/59393359/5ffbed2d-cf89-41b4-8924-c7e9bd5b6bc6) | ![사용가능목록](https://github.com/syki66/poncoo/assets/59393359/d5d5a804-706b-46bd-96f5-95812739a2f1) | ![사용 완료 목록](https://github.com/syki66/poncoo/assets/59393359/42b2f3f9-8e23-44ee-9f59-4d613de8bc95) | ![정렬 메뉴](https://github.com/syki66/poncoo/assets/59393359/d66f1736-9a95-4766-8de3-0019a268279d) |
|쿠폰 조회|쿠폰 사용완료|쿠폰 복구|쿠폰 삭제|
|![쿠폰 조회](https://github.com/syki66/poncoo/assets/59393359/cfc4a547-6df7-406e-99cc-95d2208223af)|![쿠폰 사용완료](https://github.com/syki66/poncoo/assets/59393359/fe5ca1d2-bb19-48be-97e7-f6ea1ddd486a)|![쿠폰 사용복구](https://github.com/syki66/poncoo/assets/59393359/d6f38ae5-b692-43a1-bb0d-f04065eee2d4)|![쿠폰 삭제](https://github.com/syki66/poncoo/assets/59393359/065d954b-2d09-40f3-9537-3ea0097784ce)|
|쿠폰 추가|쿠폰 이미지 미리보기|쿠폰 유효기간 설정|쿠폰 등록 완료|
|![쿠폰 추가](https://github.com/syki66/poncoo/assets/59393359/970562e4-57fb-4ab2-b5f5-059df6b9c5d0)|![쿠폰 이미지 미리보기](https://github.com/syki66/poncoo/assets/59393359/8c6fbc5e-6281-451f-9a07-2ee2391a95ae)|![쿠폰 유효기간 설정](https://github.com/syki66/poncoo/assets/59393359/d4902e18-6fae-4c77-ac9b-7cf13ee11249)|![쿠폰 등록 완료](https://github.com/syki66/poncoo/assets/59393359/79ef15c9-85f7-4943-a1b7-4e6c3ef67dc1)|
|쿠폰 수정|쿠폰 사용기록|쿠폰 사용기록 무한스크롤|쿠폰 사용기록 조회|
|![쿠폰 수정](https://github.com/syki66/poncoo/assets/59393359/e1f1a74a-bae6-4852-b344-c6e2e01b4a52)|![쿠폰 사용기록](https://github.com/syki66/poncoo/assets/59393359/0d98b621-c751-446e-9747-f80ef5898752)|![쿠폰 사용기록 무한스크롤](https://github.com/syki66/poncoo/assets/59393359/33757b8e-41d7-4b0b-8b22-04f955e1a7ba)|![쿠폰 사용조회 모달](https://github.com/syki66/poncoo/assets/59393359/db731a3d-32f3-4ed9-8f7c-57da443335e2)|
| 포어그라운드 푸시 알림 | 백그라운드 푸시 알림|||
|![쿠폰 사용 알림 (foreground)](https://github.com/syki66/poncoo/assets/59393359/98e1a69e-585b-4b41-8853-852b1b1924e6)|![쿠폰 사용알림(background)](https://github.com/syki66/poncoo/assets/59393359/f564f654-5fac-4ba0-bcfb-915ce9399a2c)|||

## 기능

- 쿠폰 `조회`, `추가`, `수정`, `삭제` 가능
- `사용가능`, `사용완료` 탭
- 쿠폰 `사용완료` 및 `복구` 기능
- 정렬 (최근순, 오래된순, 유효기간 만료순, 유효기간 널널한순)
- 푸시 알림 구현

## 상세 기능 구현 설명

- Firebase를 이용하여, Database 제어, Auth(로그인, 로그아웃), 푸시 알림 구현
- Firebase의 Hosting을 사용하여 사이트 배포
- 가비아 도메인에서 주소를 발급 받아 커스텀 주소 연결
- Ant-Design 라이브러리 사용
- 모바일 레이아웃에 대응 (세로 고정, 블록지정 방지, Zoom-in & Zoom-out 방지)
- 기프티콘은 특성상 상단에 설명과 그림이 있기 때문에 미리보기에서 상단을 crop해서 보여주고, 마지막 수정인을 사진 오른쪽 하단에 표시
- 이전 페이지로 이동 시, 마지막으로 기억된 탭과 페이지로 이동
- Firebase Rules 및 설정 파일 관리, Deploy 스크립트 파일 관리
- Firestore를 이용하여, CRUD 구현
  - 메인 쿠폰 리스트 페이지
    - 사용가능, 사용완료를 탭으로 구분
    - 페이지네이션 구현
    - 유효기간 만료순, 역순, 등록순, 오래된 순으로 정렬 가능
    - 공통 컴포넌트를 사용하고, 라우팅 처리로 구분
    - 전체 쿠폰, 사용 가능 쿠폰, 사용 완료 쿠폰 개수 표시
    - 사용자 정보 제공
    - 로그아웃 기능 제공
  - add, edit 페이지
    - 제목, 유효기간, 사진에 대해서 유효성 검증 후, DB로 전송 (사진은 1MB 제한, PNG/JPG만 가능)
    - 사진 유효기간 확인을 위한 사진 미리보기 기능
    - Cloud Storage에 사진파일 저장하고, DB에 사진 주소를 연결
    - 사진을 교체할 경우만 기존 사진 제거 및 Cloud Storage 재호출
    - 업로드 대기시간 동안 2번 이상 업로드 클릭 시 생기는 오류는 버튼 비활성화로 해결
  - view
    - 제목, 수정일, 수정인, 유효기간, 쿠폰 사진을 보여줌
    - 쿠폰 사용 완료 처리를 하면, 쿠폰 삭제 기능 제공
    - 사용 완료처리에서 복구할 수 있는 기능 제공
    - 사용 완료된 쿠폰은 "사용 완료" 모양의 도장이 찍히고, blur 처리가 되는 디자인의 CSS 추가
  - delete
    - 쿠폰 삭제 시, DB의 정보와 연결된 사진을 동시에 삭제함
  - 알림 로그 페이지
    - 무한 스크롤 방식으로 제작
    - 상세정보 표시 용도의 커스텀 모달 제작
- FCM(Firebase Cloud Messaging) 사용, Service Worker를 기기에 등록하여 Foreground, Background 푸시 알림 구현
  - 쿠폰 변경 시 (추가, 삭제, 복구, 사용, 수정) 푸시 알림 전송하고, 로그(쿠폰 정보, 사용자 정보, 시간 등)를 DB에 저장
  - Foreground 커스텀 모달 제작
    - Title, Body, Image를 5초간 표시
    - 클릭 시, 알림 로그 페이지로 이동
  - Background 푸시 알림 클릭 시, 알림 로그 페이지로 이동

## ios 미지원 기능

- 세로모드 고정

## 개발 서버 실행

```
npm start
```

## 빌드 및 배포

```
npm run deploy
```

## 안드로이드에서 푸시알림 설정 방법

알림허용 이후

- 알림 > 앱 알림 > 폰쿠 > 알림 카테고리 > 일반 > 팝업으로 표시
