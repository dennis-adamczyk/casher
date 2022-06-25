import { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { useTheme } from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface AnalysisPieChartProps {
  data: ChartData<'doughnut', number[], string>;
}

const AnalysisPieChart: FC<AnalysisPieChartProps> = ({ data }) => {
  const theme = useTheme()
  return <Doughnut options={{ plugins: { legend: { position: 'left', labels: { color: theme.colors.body, font: {size: 16}} } }, aspectRatio: 2 }} data={data} />;};

export default AnalysisPieChart;