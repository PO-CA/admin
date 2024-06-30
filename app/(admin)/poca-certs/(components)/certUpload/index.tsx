import React from 'react';
import AWS from 'aws-sdk';
import { useParams } from 'next/navigation';
import { useModifyPocaOrder } from '@/query/query/poca/pocaOrders';

export default function CertUpload() {
  const region = 'ap-northeast-2';
  const bucket = 'poca-static';

  const { orderId } = useParams();

  const { mutateAsync: patchOrders } = useModifyPocaOrder();

  AWS.config.update({
    region,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  });

  const handleFileInput = async (e: any) => {
    const file = e.target.files[0];

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucket,
        Key: `${process.env.NEXT_PUBLIC_S3_CERT_KEY}${orderId}.JPG`,
        Body: file,
      },
    });

    const promise = upload.promise();
    promise
      .then(
        // eslint-disable-next-line func-names
        async () => {
          // eslint-disable-next-line func-names
          // window.setTimeout(function () {
          // eslint-disable-next-line no-restricted-globals

          // }, 2000);
          await patchOrders({ id: orderId, isCert: true });
          alert('업로드를 성공했습니다.');
        },
        // eslint-disable-next-line func-names
        function (err) {
          console.error('ee', err);
        },
      )
      .finally(() => {
        // messageService
        //   .send({
        //     to: "010-4763-4695",
        //     from: "010-4763-4695",
        //     text: "hi",
        //   })
        //   .then((es: any) => {
        //     console.log("es", es);
        //   })
        //   .catch((efff) => {
        //     console.log("efff", efff);
        //   });
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <input
        style={{
          width: '100%',
          border: '3px skyblue dotted',
          margin: '15px',
          padding: '20px',
        }}
        type="file"
        onChange={handleFileInput}
      />
    </div>
  );
}
