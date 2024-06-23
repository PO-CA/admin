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
    ],
  },
  {
    text: '고객',
    subMenus: [{ href: '/customers', text: '고객 목록' }],
    // href: '/customers',
  },
];
