export const menus = [
  {
    href: '/dashboard',
    text: '대시보드',
  },
  {
    text: '주문',
    subMenus: [{ href: '/orders', text: '유저별 주문' }],
  },
  {
    text: '배송',
    subMenus: [{ href: '/shippings', text: '전체 배송' }],
  },
  {
    text: '상품',
    subMenus: [
      { href: '/products', text: '상품목록' },
      { href: '/addproduct', text: '상품추가' },
      { href: '/import-products', text: '상품입고' },
    ],
  },
  {
    text: '고객',
    subMenus: [{ href: '/customers', text: '고객 목록' }],
    // href: '/customers',
  },
  {
    text: 'B2B(테스트중)',
    subMenus: [
      { href: '/b2b/pre-release', text: '신보주문목록' },
      { href: '/b2b/old-release', text: '구보주문목록' },
    ],
  },
  {
    text: '음반 매입',
    subMenus: [
      { href: '/album-purchase/dashboard', text: '대시보드' },
      { href: '/album-purchase/albums', text: '앨범 관리' },
      { href: '/album-purchase/events', text: '행사 관리' },
      { href: '/album-purchase/requests', text: '매입 신청 관리' },
      { href: '/album-purchase/receipts', text: '수령 처리' },
      { href: '/album-purchase/settlements', text: '정산 관리' },
      { href: '/album-purchase/settlements/report', text: '정산 리포트' },
    ],
  },
  {
    text: '공지사항',
    subMenus: [
      { href: '/notice', text: '공지사항 목록' },
      { href: '/notice/create', text: '공지사항 추가' },
      { href: '/board', text: '스탭 게시판' },
      { href: '/board/create', text: '글 작성' },
      { href: '/release-schedule', text: '일정 관리' },
    ],
  },
];
