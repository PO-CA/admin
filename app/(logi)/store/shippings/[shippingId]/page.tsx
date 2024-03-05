'use client';
import styles from './page.module.css';
import { useGetAllShippingsByShippingId } from '@/query/query/shippings';

export default function ShippingDetail({
  params,
}: {
  params: { shippingId: string };
}) {
  const { shippingId } = params;

  const {
    data: shippingData,
    isLoading: isShippingLoading,
    isSuccess: isShippingSuccess,
  } = useGetAllShippingsByShippingId(shippingId);

  console.log('shippingData', shippingData);

  // const {
  //   value: ShippingInputData,
  //   setValue,
  //   onChange,
  // } = useInput<UpdateProductData>({
  //   id: 0,
  //   category: '',
  //   sku: '',
  //   title: '',
  //   thumbNailUrl: '',
  //   descriptionUrl: '',
  //   artist: '',
  //   ent: '',
  //   company: '',
  //   stock: 0,
  //   price: 0,
  //   purchase: 0,
  //   weight: 0,
  //   x: 0,
  //   y: 0,
  //   z: 0,
  //   barcode: '',
  //   releaseDate: '',
  //   deadlineDate: '',
  // });

  // useEffect(() => {
  //   if (productData !== undefined)
  //     setValue({
  //       id: productData.id || 0,
  //       category: productData.category || '',
  //       sku: productData.sku || '',
  //       title: productData.title || '',
  //       thumbNailUrl: productData.thumbNailUrl || '',
  //       descriptionUrl: productData.descriptionUrl || '',
  //       artist: productData.artist || '',
  //       ent: productData.ent || '',
  //       company: productData.company || '',
  //       stock: productData.stock || 0,
  //       price: productData.price || 0,
  //       purchase: productData.purchase || 0,
  //       weight: productData.weight || 0,
  //       x: productData.x || 0,
  //       y: productData.y || 0,
  //       z: productData.z || 0,
  //       barcode: productData.barcode || '',
  //       releaseDate: productData.releaseDate || '',
  //       deadlineDate: productData.deadlineDate || '',
  //     });
  // }, [productData, setValue]);

  // console.log('productInputData', productInputData);
  // console.log('productData', productData);

  // const onSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('sub', productInputData);
  // };

  if (isShippingLoading) return <div>loading</div>;

  if (!isShippingSuccess) return <div>fail</div>;

  return (
    <main className={styles.productDetailContainer}>
      <div>배송-상세</div>
      <div>
        <div>
          <div>배송번호</div>
          <div>{shippingData?.id}</div>
        </div>
        <div>
          <div>주소</div>
          <div>{shippingData?.city}</div>
        </div>
        <div>
          <div>상세주소</div>
          <div>{shippingData?.street}</div>
        </div>
        <div>
          <div>수령인</div>
          <div>{shippingData?.receiverName}</div>
        </div>
        <div>
          <div>연락처</div>
          <div>{shippingData?.receiverPhoneNumber}</div>
        </div>
        <div>
          <div>우편번호</div>
          <div>{shippingData?.zipcode}</div>
        </div>
        <div>
          <div>배송상태</div>
          <div>{shippingData?.shippingStatus}</div>
        </div>
        <div>
          <div>배송방법</div>
          <div>{shippingData?.shippingType}</div>
        </div>
        <div>
          <div>상품수량</div>
          <div>{shippingData?.totalQty}</div>
        </div>
        <div>
          <div>상품가격</div>
          <div>{shippingData?.totalProductPrice}</div>
        </div>
        <div>
          <div>배송비</div>
          <div>{shippingData?.shippingFee}</div>
        </div>
        <div>
          <div>총비용</div>
          <div>
            {shippingData?.shippingFee + shippingData?.totalProductPrice}
          </div>
        </div>
      </div>
      {/* <TanTable
        data={shippingData?.logiShippingItems}
        columns={shippingItemColumns}
        useSearch={false}
        useFilter={false}
        usePagenation={false}
      /> */}
    </main>
  );
}
