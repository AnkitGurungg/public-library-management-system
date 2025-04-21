import { TrendingUp } from "lucide-react";
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
import { useEffect, useState } from "react";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import useFetchCountVm from "@/hooks/Dashboard/useFetchCountVm";
import useFetchCountNonVm from "@/hooks/Dashboard/useFetchCountNonVm";
import useFetchCountBooks from "@/hooks/Dashboard/useFetchCountBooks";
import useFetchCountBorrowedBooks from "@/hooks/Dashboard/useFetchCountBorrowedBooks";
import {
  BookOpenText,
  BookText,
  UserCheck,
  UserRoundX,
  BookOpen,
  Book,
} from "lucide-react";
import BorrowBarChart from "./BorrowBarChart";

function Dashboard() {
  const [chartData, setChartData] = useState([]);
  const [chartConfig, setChartConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartColors = ["#e6785f", "#2d8e84", "#2c4047", "#ebc669", "#f3aa69"];

  const {
    data: countBooks,
    refetch: refetchCountBooks,
    isLoading: loadingCountBooks,
  } = useFetchCountBooks();

  const {
    data: countVm,
    refetch: refetchCountVm,
    isLoading: loadingCountVm,
  } = useFetchCountVm();

  const {
    data: countBorrowedBooks,
    refetch: refetchCountBorrowedBooks,
    isLoading: loadingCountBorrowedBooks,
  } = useFetchCountBorrowedBooks();

  const {
    data: countNonVm,
    refetch: refetchCountNonvm,
    isLoading: loadingCountNonVm,
  } = useFetchCountNonVm();

  useEffect(() => {
    refetchCountBooks();
    refetchCountVm();
    refetchCountNonvm();
  }, []);

  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        setLoading(true);
        const response = await GLOBAL_SERVICE.get(
          "/api/v1/la/dashboard/category-stats"
        );

        const data = response.data;
        console.log("API data:", data);

        const transformedData = data.map((item, index) => ({
          category: item.categoryName,
          bookCount: item.bookCount,
          fill: chartColors[index % chartColors.length],
        }));

        const config = {};
        data.forEach((item, index) => {
          const key = item.categoryName.toLowerCase().replace(/\s+/g, "");
          config[key] = {
            label: item.categoryName,
            color: chartColors[index % chartColors.length],
          };
        });

        setChartData(transformedData);
        setChartConfig(config);
      } catch (err) {
        console.error("Failed to fetch category stats:", err);
        setError(
          err instanceof Error
            ? err.response?.data?.message || err.message
            : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryStats();
  }, []);

  return (
    <section className="min-h-screen max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center gap-4  h-[80px]  bg-white  rounded-2xl shadow-md p-4 hover:scale-105 transition-transform duration-200 ease-in-out">
          <div className="flex items-center justify-centerp-2 rounded-full">
            <UserRoundX className="text-red-600 w-6 h-6" />
          </div>
          <div className="border-l-2 border-gray-300 h-full"></div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {countNonVm?.status === 200 && countNonVm?.data?.length !== 0
                ? countNonVm.data
                : 0}
            </h1>
            <p className="text-sm text-gray-500">Members to Verify</p>
          </div>
        </div>

        <div className="flex items-center gap-4  h-[80px] rounded-2xl bg-white shadow-md p-4 hover:scale-105 transition-transform duration-200 ease-in-out">
          <div className="flex items-center justify-center bg-green-100 p-2 rounded-full">
            <UserCheck className="text-green-600 w-6 h-6" />
          </div>
          <div className="border-l-2 border-gray-300 h-full"></div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {countVm?.status === 200 && countVm?.data?.length !== 0
                ? countVm.data
                : 0}
            </h1>
            <p className="text-sm text-gray-500">Verified Members</p>
          </div>
        </div>

        <div className="flex items-center gap-4 h-[80px] rounded-2xl bg-white shadow-md p-4 hover:scale-105 transition-transform duration-200 ease-in-out">
          <div className="flex items-center justify-center bg-yellow-100 p-2 rounded-full">
            <BookOpen className="text-yellow-600 w-6 h-6" />
          </div>
          <div className="border-l-2 border-gray-300 h-full"></div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {countBorrowedBooks?.status === 200 &&
              countBorrowedBooks?.data?.length !== 0
                ? countBorrowedBooks.data
                : 0}
            </h1>
            <p className="text-sm text-gray-500">Borrowed Books</p>
          </div>
        </div>

        <div className="flex items-center gap-4  h-[80px] rounded-2xl bg-white shadow-md p-4 hover:scale-105 transition-transform duration-200 ease-in-out">
          <div className="flex items-center justify-center bg-blue-100 p-2 rounded-full">
            <Book className="text-blue-600 w-6 h-6" />
          </div>
          <div className="border-l-2 border-gray-300 h-full"></div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {countBooks?.status === 200 && countBooks?.data?.length !== 0
                ? countBooks.data
                : 0}
            </h1>
            <p className="text-sm text-gray-500">Available Books</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="flex flex-col col-span-1 h-full min-h-[400px]">
          <CardHeader className="items-center pb-0">
            <CardTitle>Book Categories</CardTitle>
            <CardDescription>Distribution by Category</CardDescription>
          </CardHeader>

          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="bookCount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>

          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Books
              <TrendingUp className="h-4 w-4" />
            </div>

            <div className="mt-2 flex flex-wrap gap-3 justify-center">
              {!loading &&
                Object.entries(chartConfig).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: value.color }}
                    />
                    <span>{value.label}</span>
                  </div>
                ))}
            </div>
          </CardFooter>
        </Card>

        <BorrowBarChart />
      </div>
    </section>
  );
}

export default Dashboard;
