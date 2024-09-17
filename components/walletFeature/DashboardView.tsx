'use client';
import Image from 'next/image';
import DashboardPieChart from './DashboardPieChart';
import DashboardSlider from './DashboardSlider';

// Define interfaces for type safety
interface FlowItem {
  balance: string;
  data: {
    color: string;
    symbol: string;
  };
  metadata: {
    logo: string;
  };
}

interface FlowData {
  result?: FlowItem[];
}

interface DashboardViewProps {
  flowData: FlowData;
}

const DashboardView = ({ flowData }: DashboardViewProps) => {
  console.log('check value 28', flowData?.result);

  const totalBalance = flowData?.result
    ? flowData.result
        .map((item) => parseFloat(item.balance))
        .reduce((acc, balance) => acc + balance, 0)
    : 0;

  const roundedTotalBalance = parseFloat(totalBalance.toFixed(2));

  return (
    <div>
      <div>
        <DashboardPieChart
          totalBalance={roundedTotalBalance}
          flowData={flowData?.result}
        />
      </div>
      <div className='mt-4'>
        <DashboardSlider walletList={flowData.result} />
      </div>
      <div className='border rounded-2xl mt-8'>
        {flowData?.result?.map((item, index) => (
          <div
            key={index}
            className='flex items-center justify-between p-4 font-medium border-b'
          >
            <div className='flex items-center gap-x-2'>
              <div
                className='size-3'
                style={{ backgroundColor: item?.data?.color }}
              />
              <Image
                src={item?.metadata?.logo}
                alt={'Icon'}
                width={500}
                height={500}
                className='mx-auto size-10 rounded-full'
              />
              <p className='text-lg'>{item?.data?.symbol}</p>
            </div>
            <p className='text-base'>{item?.balance}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardView;
