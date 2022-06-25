import { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface AnalysisPieChartProps {
  data: ChartData<'doughnut', number[], string>;
}

const AnalysisPieChart: FC<AnalysisPieChartProps> = ({ data }) => {
  return <Doughnut options={{ plugins: { legend: { position: 'left' } }, aspectRatio: 2 }} data={data} />;
};

export default AnalysisPieChart;
