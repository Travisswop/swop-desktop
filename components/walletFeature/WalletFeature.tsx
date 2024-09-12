import { getCashFlow } from '@/actions/cashflow';
import WalletFeatureData from './WalletFeatureData';
import Link from 'next/link';
import DynamicPrimaryBtn from '../Button/DynamicPrimaryBtn';
import { isValidObjectId } from '@/util/checkMongoId';
import { getNftData } from '@/actions/nftData';
import { getTransactionData } from '@/actions/transactionData';

const WalletFeature = async ({ data, microsites, token }: any) => {
  if (data === 'No Primary microsite found!') {
    return <p>{data}</p>;
  }

  if (isValidObjectId(data)) {
    return (
      <div className='px-10 w-full flex flex-col gap-5 items-center bg-white mt-4 py-4 rounded-lg'>
        <p className='text-gray-600 font-medium'>
          ENS is not associated with this smartsite! Please create a <br /> new
          ENS to continue.
        </p>
        <Link href={`/ens-swop-id?id=${data}`}>
          <DynamicPrimaryBtn className='w-60'>Create ENS</DynamicPrimaryBtn>
        </Link>
      </div>
    );
  }

  if (data?.owner && data?.addresses['501']) {
    const walletObj = {
      ethAddress: data.owner,
      solanaAddress: data.addresses['501'],
      btcAddress: 'ererwewfsdsdweew',
    };

    const flowData = await getCashFlow(walletObj, token);

    const nftData = await getNftData(token, data.owner, data.addresses['501']);

    const transactionData = await getTransactionData(walletObj, token);

    return (
      <WalletFeatureData
        microsites={microsites}
        flowData={flowData}
        nftData={nftData}
        transactionData={transactionData}
        walletObj={walletObj}
      />
    );
  }
};

export default WalletFeature;
