import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const MyChart = ({ filteredInvestment }) => {

    const labels = filteredInvestment && filteredInvestment.length > 0 ? filteredInvestment[0].reports.map(report => report.month) : [];

    const chartData = {
        labels: labels,
        datasets: filteredInvestment.map((investmentData) => ({
            label: investmentData.description,
            data: investmentData.reports.map((report) => report.value),
            borderColor: 'rgb(0,191,255)',
            backgroundColor: 'rgb(219 234 254)',
        })),
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: '',
            },
            title: {
                display: false,
                text: '',
            },
        },
    };

    return <Line options={options} data={chartData} />;
}

export default MyChart
