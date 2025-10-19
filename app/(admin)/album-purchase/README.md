# 음반 매입 관리 시스템

## 📁 폴더 구조

```
admin/
├── app/(admin)/album-purchase/          # 페이지 컴포넌트
│   ├── dashboard/                       # 대시보드
│   ├── events/                          # 행사 관리
│   │   └── [eventId]/                   # 행사 상세
│   │       └── edit/                    # 행사 수정
│   ├── requests/                        # 매입 신청 관리
│   │   └── [requestId]/                 # 신청 상세
│   ├── receipts/                        # 수령 처리
│   └── settlements/                     # 정산 관리
│       ├── [settlementId]/              # 정산 상세
│       └── report/                      # 정산 리포트
├── query/
│   ├── api/album-purchase/              # API 호출 함수
│   │   ├── events.ts
│   │   ├── requests.ts
│   │   ├── receipts.ts
│   │   └── settlements.ts
│   └── query/album-purchase/            # React Query Hooks
│       ├── events.ts
│       ├── requests.ts
│       ├── receipts.ts
│       └── settlements.ts
└── types/
    └── albumPurchase.ts                 # TypeScript 타입 정의
```

## 🎯 주요 기능

### 1. 대시보드 (`/album-purchase/dashboard`)

- 전체 정산 통계
- 대기 중/완료된 정산 현황
- 오늘/이번 달 정산 요약
- 빠른 링크

### 2. 행사 관리 (`/album-purchase/events`)

- 행사 목록 조회 (공개 여부, 종료 여부 필터링)
- 행사 상세 조회
- 행사 수정
- 행사 삭제

### 3. 매입 신청 관리 (`/album-purchase/requests`)

- 매입 신청 목록 (상태별 필터링)
- 매입 신청 상세 조회
- **가격조정 필요 상태 처리:**
  - 수락
  - 거절 (사유 입력)
  - 가격 제안

### 4. 수령 처리 (`/album-purchase/receipts`)

- **송장 바코드 스캔:**
  - 매칭 성공 → 자동 수령 처리
  - 매칭 실패 → 미매칭 수령 건 생성
- 미매칭 수령 건 목록
- **미매칭 수령 건 수동 매칭:**
  - 신청 건 검색
  - 매칭 처리

### 5. 정산 관리 (`/album-purchase/settlements`)

- 정산 대상 조회 (검수완료 상태)
- 정산 생성 (일괄 선택 가능)
- 정산 목록 (상태별 필터링)
- 정산 상세 조회
- 정산 완료 처리 (송금일시 입력)

### 6. 정산 리포트 (`/album-purchase/settlements/report`)

- 기간별 정산 현황
- 월별 집계
- 완료/대기 통계

## 🔌 API 엔드포인트

### 행사 관리

- `GET /logi/album-purchase/admin/event` - 목록
- `GET /logi/album-purchase/admin/event/{id}` - 상세
- `POST /logi/album-purchase/admin/event/create` - 등록
- `PUT /logi/album-purchase/admin/event/{id}` - 수정
- `DELETE /logi/album-purchase/admin/event/{id}` - 삭제

### 매입 신청

- `GET /logi/album-purchase/admin/request` - 목록
- `GET /logi/album-purchase/admin/request/{id}` - 상세
- `POST /logi/album-purchase/admin/request/{id}/accept` - 수락
- `POST /logi/album-purchase/admin/request/{id}/reject` - 거절
- `POST /logi/album-purchase/admin/request/{id}/propose-price` - 가격 제안

### 수령 처리

- `POST /logi/album-purchase/admin/receipt/scan` - 송장 스캔
- `GET /logi/album-purchase/admin/receipt/list` - 수령 건 목록
- `GET /logi/album-purchase/admin/receipt/unmatched` - 미매칭 목록
- `POST /logi/album-purchase/admin/receipt/unmatched/{id}/match` - 수동 매칭
- `GET /logi/album-purchase/admin/receipt/search` - 신청 검색

### 정산

- `GET /logi/album-purchase/admin/settlement/eligible` - 정산 대상
- `POST /logi/album-purchase/admin/settlement/create` - 정산 생성
- `GET /logi/album-purchase/admin/settlement` - 정산 목록
- `GET /logi/album-purchase/admin/settlement/{id}` - 정산 상세
- `POST /logi/album-purchase/admin/settlement/{id}/complete` - 정산 완료
- `GET /logi/album-purchase/admin/settlement/stats` - 통계
- `GET /logi/album-purchase/admin/settlement/report` - 리포트

## 🛠 기술 스택

- **Frontend:** Next.js 14, React, TypeScript
- **State Management:** React Query (TanStack Query)
- **HTTP Client:** Axios
- **Styling:** CSS Modules

## 📝 사용법

### 매입 신청 처리 플로우

1. `/album-purchase/requests`에서 "가격조정필요" 상태 필터링
2. 신청 상세 페이지에서 수락/거절/가격제안 선택
3. 수락 시 → "접수완료" 상태로 변경

### 수령 처리 플로우

1. `/album-purchase/receipts`에서 송장번호 스캔
2. 자동 매칭 실패 시 → 미매칭 목록에서 수동 매칭
3. 신청 검색하여 적절한 신청 건과 연결

### 정산 처리 플로우

1. `/album-purchase/settlements`에서 정산 대상 확인
2. 체크박스로 정산할 신청 선택
3. "정산 생성" 버튼 클릭
4. 정산 상세 페이지에서 송금 정보 입력 후 완료 처리

## ⚠️ 참고사항

- 모든 상태 변경은 백엔드 API를 통해 처리됩니다.
- 하위 호환성을 위해 기존 데이터 영향 없이 구현되었습니다.
- 관리자 권한 체크는 추후 추가 예정입니다.
