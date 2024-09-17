import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { MdRemoveRedEye } from 'react-icons/md';

const DashboardPieChart = ({ totalBalance, flowData }: any) => {
  const data = flowData?.map((item: any, index: number) => ({
    name: item.network,
    value: (parseFloat(item.balance) / totalBalance) * 100,
  }));

  const colors = flowData?.map((item: any, index: number) => item?.data?.color);

  return (
    <div className='flex justify-center items-center flex-col mx-0'>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          innerRadius={80}
          outerRadius={120}
          fill='#8884d8'
          paddingAngle={0}
          dataKey='value'
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <text
          x='50%'
          y='50%'
          textAnchor='middle'
          dominantBaseline='middle'
          className='text-lg font-bold'
          fill='#333'
        >
          {/* <tspan x='50%' dy='-1.2em'>
            <tspan>
              <MdRemoveRedEye className='size-6 text-black' />
            </tspan>
          </tspan> */}
          <tspan x='50%' dy='-.4em'>
            My Balance
          </tspan>
          <tspan x='50%' dy='1.5em'>
            ${totalBalance.toFixed(2)}
          </tspan>
        </text>
      </PieChart>
    </div>
  );
};

export default DashboardPieChart;
