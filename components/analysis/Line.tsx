import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  Title,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartData,
} from 'chart.js';
import { useTheme } from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface AnalysisLineChartProps {
  data: ChartData<'line', number[], string>;
}

const AnalysisLineChart: FC<AnalysisLineChartProps> = ({ data }) => {
  const theme = useTheme();
  return (
    <Line
      options={{
        scales: { y: { ticks: { color: theme.colors.body } }, x: { ticks: { color: theme.colors.body } } },
        plugins: { legend: { position: 'bottom', labels: { color: theme.colors.body } } },
        aspectRatio: 2,
      }}
      data={data}
    />
  );
};

export default AnalysisLineChart;
