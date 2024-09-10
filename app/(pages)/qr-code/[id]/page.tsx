import UpdateQRCode from '@/components/CustomQRCode/UpdateQrCode';
import ForceSignOut from '@/components/ForceSignOut';
import isUserAuthenticate from '@/util/isUserAuthenticate';
import React from 'react';

const UpdateQrCodePage = async ({ params }: { params: { id: string } }) => {
  const session: any = await isUserAuthenticate();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/desktop/user/customQRCodes/details/${params.id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${session.accessToken}`,
      },
    },
  );
  const data = await response.json();
  if (!data || data.state !== 'success') {
    return <ForceSignOut />;
  }
  // console.log("data for qr deatials", data);

  return (
    <div>
      <UpdateQRCode data={data.data} session={session} />
    </div>
  );
};

export default UpdateQrCodePage;
