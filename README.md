# poncoo

가족 또는 지인과 함께 쿠폰을 사용하고 관리할 수 있도록 개발된 PWA 기반 공동 쿠폰 관리 웹앱

## Screenshots

|                                                        로그인                                                         |                                                    사용가능 목록                                                    |                                                   사용완료 목록                                                    |                                                  정렬 메뉴                                                   |
| :-------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: |
|           ![로그인](https://github.com/syki66/poncoo/assets/59393359/5ffbed2d-cf89-41b4-8924-c7e9bd5b6bc6)            |       ![사용가능목록](https://github.com/syki66/poncoo/assets/59393359/d5d5a804-706b-46bd-96f5-95812739a2f1)        |      ![사용 완료 목록](https://github.com/syki66/poncoo/assets/59393359/42b2f3f9-8e23-44ee-9f59-4d613de8bc95)      |     ![정렬 메뉴](https://github.com/syki66/poncoo/assets/59393359/d66f1736-9a95-4766-8de3-0019a268279d)      |
|                                                       쿠폰 조회                                                       |                                                    쿠폰 사용완료                                                    |                                                     쿠폰 복구                                                      |                                                  쿠폰 삭제                                                   |
|          ![쿠폰 조회](https://github.com/syki66/poncoo/assets/59393359/cfc4a547-6df7-406e-99cc-95d2208223af)          |       ![쿠폰 사용완료](https://github.com/syki66/poncoo/assets/59393359/fe5ca1d2-bb19-48be-97e7-f6ea1ddd486a)       |      ![쿠폰 사용복구](https://github.com/syki66/poncoo/assets/59393359/d6f38ae5-b692-43a1-bb0d-f04065eee2d4)       |     ![쿠폰 삭제](https://github.com/syki66/poncoo/assets/59393359/065d954b-2d09-40f3-9537-3ea0097784ce)      |
|                                                       쿠폰 추가                                                       |                                                쿠폰 이미지 미리보기                                                 |                                                 쿠폰 유효기간 설정                                                 |                                                쿠폰 등록 완료                                                |
|          ![쿠폰 추가](https://github.com/syki66/poncoo/assets/59393359/970562e4-57fb-4ab2-b5f5-059df6b9c5d0)          |   ![쿠폰 이미지 미리보기](https://github.com/syki66/poncoo/assets/59393359/8c6fbc5e-6281-451f-9a07-2ee2391a95ae)    |    ![쿠폰 유효기간 설정](https://github.com/syki66/poncoo/assets/59393359/d4902e18-6fae-4c77-ac9b-7cf13ee11249)    |   ![쿠폰 등록 완료](https://github.com/syki66/poncoo/assets/59393359/79ef15c9-85f7-4943-a1b7-4e6c3ef67dc1)   |
|                                                       쿠폰 수정                                                       |                                                    쿠폰 사용기록                                                    |                                              쿠폰 사용기록 무한스크롤                                              |                                              쿠폰 사용기록 조회                                              |
|          ![쿠폰 수정](https://github.com/syki66/poncoo/assets/59393359/e1f1a74a-bae6-4852-b344-c6e2e01b4a52)          |       ![쿠폰 사용기록](https://github.com/syki66/poncoo/assets/59393359/0d98b621-c751-446e-9747-f80ef5898752)       | ![쿠폰 사용기록 무한스크롤](https://github.com/syki66/poncoo/assets/59393359/33757b8e-41d7-4b0b-8b22-04f955e1a7ba) | ![쿠폰 사용조회 모달](https://github.com/syki66/poncoo/assets/59393359/db731a3d-32f3-4ed9-8f7c-57da443335e2) |
|                                                포어그라운드 푸시 알림                                                 |                                                백그라운드 푸시 알림                                                 |                                                                                                                    |                                                                                                              |
| ![쿠폰 사용 알림 (foreground)](https://github.com/syki66/poncoo/assets/59393359/98e1a69e-585b-4b41-8853-852b1b1924e6) | ![쿠폰 사용알림(background)](https://github.com/user-attachments/assets/312cb761-d07d-42dc-b060-77a0ddcb0137) |                                                                                                                    |                                                                                                              |

## Built With

- React
- Ant Design
- Firebase

## Feature

- 모바일 레이아웃에 최적화
- 쿠폰 조회, 추가, 수정, 삭제 페이지 및 기능 구현
- 쿠폰 사용완료 및 복구 기능 구현
- 페이지네이션, 탭, 정렬 적용
- 사용기록 페이지 구현 (무한스크롤, 개별 조회)
- Firebase로 사용자 인증, 데이터 관리
- FCM, Service Worker로 푸시 알림 구현 (Foreground, Background)

## Usage

### ios

- Safari > 공유 > 홈 화면에 추가

### macOs

- Safari > 파일 > Dock에 추가

### Android

1. 크롬을 이용해서 PWA 설치 (알림 허용하기)
2. 알림 > 앱 알림 > 폰쿠 > 알림 카테고리 > 일반 > 팝업으로 표시

### Chrome

- 주소창 우측 설치 버튼 클릭

## Caution

- ios에서 세로 방향 고정 미지원

## Run

```
npm install
```

```
npm start
```

## Build & Deployment

```
npm run deploy
```

## Todo List

- fcm v1 마이그레이션
- 서비스워커 이용해서 유효기간 만료 알림 적용 (periodic sync)
