import React, { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

const RevenueWeeklyChart = ({ data = [] }) => {

    const chartData = useMemo(() => {

        const last7Days = [...Array(7)].map((_, i) => {
            return dayjs().subtract(i, 'day').format('YYYY-MM-DD');
        }).reverse();

        const revenueMap = data.reduce((acc, item) => {
            const dateKey = dayjs(item.dayCreate).format('YYYY-MM-DD');
            acc[dateKey] = (acc[dateKey] || 0) + item.totalPrice;
            return acc;
        }, {});


        return last7Days.map(date => ({
            displayDate: dayjs(date).format('DD/MM'),
            fullDate: dayjs(date).format('DD/MM/YYYY'),
            revenue: revenueMap[date] || 0,
        }));
    }, [data]);


    const formatYAxis = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(value);
    };

    return (
        <div style={{ width: '100%', height: 350, background: '#ffffff', padding: '16px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', border: '1px solid rgb(205, 25, 24)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '16px', color: '#374151' }}>
                Doanh thu 7 ngày gần nhất
            </h3>

            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7d5d5" />
                    <XAxis
                        dataKey="displayDate"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={formatYAxis}
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <Tooltip
                        cursor={{ fill: '#fbf9f9' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        formatter={(value) => [new Intl.NumberFormat('vi-VN').format(value) + ' ₫', 'Doanh thu']}
                        labelFormatter={(label) => `Ngày ${label}`}
                    />
                    <Bar
                        dataKey="revenue"
                        fill="#f63b3b"
                        radius={[6, 6, 0, 0]}
                        barSize={32}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.revenue > 0 ? '#f63b3b' : '#b0c8fa'}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueWeeklyChart;