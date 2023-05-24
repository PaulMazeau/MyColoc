import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function YourComponent() {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                data: [20, -45, 28, 80, 99, 43]
            }
        ],
    };

    const screenWidth = Dimensions.get('window').width;

    const chartConfig = {
        backgroundGradientFrom: '#FFFFFF',  // Fond blanc
        backgroundGradientTo: '#FFFFFF',
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,  // Tracé vert
        barPercentage: 0.8,  // Barres plus larges
    };

    return (
        <BarChart
            data={data}
            width={screenWidth}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={chartConfig}
            verticalLabelRotation={0}
        />
    );
}
