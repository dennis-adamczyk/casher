import { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { useTheme } from 'styled-components';
import { GetServerSideProps } from 'next';
import { Category, Subscription } from '@prisma/client';
import { getIntervalMonthlyFactor } from '@/helpers/interval';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface AnalysisPieChartProps {
  data: ChartData<'doughnut', number[], string>;
  labelData: (Category & {
    subscriptions: Subscription[];
})[],
  onlyPositive: boolean
}

const cBorderColors = [
  "rgba(255,99,132,1)",
  "rgba(54,162,235,1)",
  "rgba(255,206,86,1)",
  "rgba(75,192,192,1)",
  "rgba(153,102,255,1)",
  "rgba(255,159,64,1)"
]

const cBgColors = [
  "rgba(255,99,132,0.3)",
  "rgba(54,162,235,0.3)",
  "rgba(255,206,86,0.3)",
  "rgba(75,192,192,0.3)",
  "rgba(153,102,255,0.3)",
  "rgba(255,159,64,0.3)"
]

const AnalysisPieChart: FC<AnalysisPieChartProps> = ({ data, labelData, onlyPositive }) => {

  const getRandomVal = () => Math.floor(Math.random() * 255)
  const labels: string[] = []
  const datasetData: number[] = [] 
  const bgColors: string[] = []
  const borderColors: string[] = []


  labelData.forEach((cat)=> {
    const TotalSubForCat: number = cat.subscriptions.reduce((prev, current) => {
      if(onlyPositive !== current.amount < 0){
        return prev + (current.amount * getIntervalMonthlyFactor(current.interval))
      }else{
        return prev
      }
    },0)
    if(TotalSubForCat !== 0){
      labels.push(cat.name)
      datasetData.push(TotalSubForCat)
    }
  })

  labels.forEach((lbl, index: number)=>{
    bgColors.push(cBgColors[index % cBgColors.length])
    borderColors.push(cBorderColors[index % cBorderColors.length])
  })


  data.labels = labels
  data.datasets[0].data = datasetData
  data.datasets[0].backgroundColor = bgColors
  data.datasets[0].borderColor = borderColors

  const theme = useTheme();
  return (
    <Doughnut
      options={{
        plugins: { legend: { position: 'left', labels: { color: theme.colors.body, font: { size: 16 } } } },
        aspectRatio: 2,
      }}
      data={data}
    />
  );
};

export default AnalysisPieChart;

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('TESTING')
  return {
    props: {
      hideHeader: true,
    },
  };
};
