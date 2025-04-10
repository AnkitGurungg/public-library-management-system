"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Loader2 } from "lucide-react";
import { Pie, PieChart } from "recharts";

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
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

export default function CategoryStatsChart() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trendData, setTrendData] = useState({
    percentage: 0,
    direction: "up",
  });

  useEffect(() => {
    const fetchBrowserStats = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Replace with your actual API endpoint
        const response = await axios.get(
          "http:8080/api/v1/la/category/get/categories"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch browser statistics");
        }

        const data = await response.json();

        // Transform the data to include fill colors
        const transformedData = data.data.map((item) => ({
          browser: item.browser,
          visitors: item.visitors,
          fill: `var(--color-${item.browser.toLowerCase()})`,
        }));

        setChartData(transformedData);
        setTrendData(data.trend);
      } catch (err) {
        console.error("Error fetching browser statistics:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );

        // Set fallback data in case of error
        setChartData([
          { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
          { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
          { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
          { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
          { browser: "other", visitors: 90, fill: "var(--color-other)" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrowserStats();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Browser Statistics</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <div className="flex h-[250px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <Alert variant="destructive" className="mx-auto max-w-xs">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] px-0"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="visitors" hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                labelLine={false}
                label={({ payload, ...props }) => {
                  return (
                    <text
                      cx={props.cx}
                      cy={props.cy}
                      x={props.x}
                      y={props.y}
                      textAnchor={props.textAnchor}
                      dominantBaseline={props.dominantBaseline}
                      fill="hsla(var(--foreground))"
                    >
                      {payload.visitors}
                    </text>
                  );
                }}
                nameKey="browser"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending {trendData.direction} by {trendData.percentage}% this month{" "}
          <TrendingUp
            className={`h-4 w-4 ${
              trendData.direction === "down" ? "rotate-180" : ""
            }`}
          />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
