import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function BorrowBarChart() {
  const [chartData, setChartData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [trend, setTrend] = useState({ percentage: 0, isUp: true });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) =>
    (currentYear - i).toString()
  );

  const chartConfig = {
    borrowCount: {
      label: "Books Borrowed",
      color: "hsl(var(--chart-1))",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/la/dashboard/borrows/year/${selectedYear}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setChartData(data);

        const currentMonth = new Date().getMonth();
        if (currentMonth > 0 && data.length >= currentMonth + 1) {
          const currentMonthCount = data[currentMonth].borrowCount;
          const prevMonthCount = data[currentMonth - 1].borrowCount;

          if (prevMonthCount > 0) {
            const percentChange =
              ((currentMonthCount - prevMonthCount) / prevMonthCount) * 100;
            setTrend({
              percentage: Math.abs(Number.parseFloat(percentChange.toFixed(1))),
              isUp: percentChange >= 0,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching borrow statistics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Book Borrowing Statistics</CardTitle>
          <CardDescription>
            Monthly borrowing trends for {selectedYear}
          </CardDescription>
        </div>
        <Select value={selectedYear} onValueChange={handleYearChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-muted-foreground">Loading statistics...</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="min-h-[300px]">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                right: 10,
                left: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey="borrowCount"
                fill="var(--color-borrowCount)"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trend.isUp ? (
            <>
              Trending up by {trend.percentage}% this month{" "}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          ) : (
            <>
              Trending down by {trend.percentage}% this month{" "}
              <TrendingDown className="h-4 w-4 text-red-500" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total books borrowed per month for {selectedYear}
        </div>
      </CardFooter>
    </Card>
  );
}

export default BorrowBarChart;
