import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from "react-router-dom";

import BookCard from "@/features/User/Home/BookCard";
import { useFetchNewArrivalBooks } from "@/hooks/useFetchNewArrivalBooks";
import { useFetchTopBorrowedBooks } from "@/hooks/useFetchTopBorrowedBooks";
import { useFetchRecentlyPublished } from "@/hooks/useFetchRecentlyPublished";
import { BookLoader } from "@/components/Loading/BookLoader";

const Home = () => {
  const pageNumber = 0;
  const pageSize = 5;
  const navigate = useNavigate();

  const { data: topBorrowedBooks, isLoading: loadingTopBorrowed } =
    useFetchTopBorrowedBooks(pageNumber, pageSize);
  const { data: newArrivalBooks, isLoading: loadingNewArrivals } =
    useFetchNewArrivalBooks(pageNumber, pageSize);
  const { data: recentlyPublished, isLoading: loadingRecentlyPublished } =
    useFetchRecentlyPublished(pageNumber, pageSize);

  useEffect(() => {
    // console.log(topBorrowedBooks)
    // console.log(newArrivalBooks)
    // console.log(recentlyPublished)
  }, [topBorrowedBooks, newArrivalBooks, recentlyPublished]);

  return (
    <section className="mt-9">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
          }),
        ]}
        className="-mx-1 xl:px-6 2xl:px-10"
      >
        <CarouselContent className="px-4 m-auto">
          <CarouselItem className="basis-1/3">
            <div>
              <img
                src="/slider/7EQXYhVAjZ7A9qTcJTBQHiJAGxFmEJxWQjWsaeO9.png"
                alt="Coming"
                className=" aspect-[4/3] object-cover"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <div>
              <img
                src="/slider/KnUznZ0dxmrorRMUEo44sH3iPR9IRajzKuHdAsVW.png"
                alt="Coming"
                className="aspect-[4/3] object-cover"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <div>
              <img
                src="/slider/viNVqakCKWqiwUlWbzydjj5IScknVpcBrAptzQoM.png"
                alt="Coming"
                className=" aspect-[4/3] object-cover"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <div>
              <img
                src="/slider/7EQXYhVAjZ7A9qTcJTBQHiJAGxFmEJxWQjWsaeO9.png"
                alt="Coming"
                className=" aspect-[4/3] object-cover"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <div>
              <img
                src="/slider/KnUznZ0dxmrorRMUEo44sH3iPR9IRajzKuHdAsVW.png"
                alt="Coming"
                className=" aspect-[4/3] object-cover"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            <div>
              <img
                src="/slider/viNVqakCKWqiwUlWbzydjj5IScknVpcBrAptzQoM.png"
                alt="Coming"
                className=" aspect-[4/3] object-cover"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div className="max-w-7xl xl:max-w-screen-2xl mt-9">
        <div className="max-w-7xl xl:max-w-screen-2xl mx-auto px-16 py-4">
          <div className="mb-5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl opacity-80">Popular Choices</h2>
              <button
                className="text-gray-500 cursor-pointer"
                onClick={() => navigate("/popular-choices")}
              >
                Show all
              </button>
            </div>
            <p className="text-[16px]">
              Find Your Next Great Read Among Our Reader Favorites.
            </p>
          </div>
          <ul className="grid grid-cols-5 justify-center items-center gap-5">
            {loadingTopBorrowed ? (
              <BookLoader />
            ) : topBorrowedBooks?.content?.length > 0 ? (
              topBorrowedBooks.content.map((item) => (
                <BookCard key={item.bookId} curBook={item} />
              ))
            ) : (
              <p className="col-span-5 text-center text-gray-500 py-10">
                Popular books are currently unavailable!
              </p>
            )}
          </ul>
        </div>

        <div className="max-w-7xl xl:max-w-screen-2xl mx-auto px-16 py-4">
          <div className="mb-6 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl opacity-80">New Arrivals</h2>
              <button
                className="text-gray-500 cursor-pointer"
                onClick={() => navigate("/new-arrivals")}
              >
                Show all
              </button>
            </div>
            <p className="text-[16px]">
              Explore Fresh Arrivals and Find Your Next Great Read.
            </p>
          </div>
          <ul className="grid grid-cols-5 justify-center items-center gap-5">
            {loadingNewArrivals ? (
              <BookLoader />
            ) : newArrivalBooks?.content?.length > 0 ? (
              newArrivalBooks.content.map((item) => (
                <BookCard key={item.bookId} curBook={item} />
              ))
            ) : (
              <p className="col-span-5 text-center text-gray-500 py-10">
                New arrivals are currently unavailable!
              </p>
            )}
          </ul>
        </div>

        <div className="max-w-7xl xl:max-w-screen-2xl mx-auto px-16 py-4 mb-10">
          <div className="mb-6 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl opacity-80">
                Recently Published
              </h2>
              <button
                className="text-gray-500 cursor-pointer"
                onClick={() => navigate("/recently-published")}
              >
                Show all
              </button>
            </div>
            <p className="text-[16px]">
              Check Out the Latest Titles Available in Our Collection.
            </p>
          </div>
          <ul className="grid grid-cols-5 justify-center items-center gap-5">
            {loadingRecentlyPublished ? (
              <BookLoader />
            ) : recentlyPublished?.content?.length > 0 ? (
              recentlyPublished.content.map((item) => (
                <BookCard key={item.bookId} curBook={item} />
              ))
            ) : (
              <p className="col-span-5 text-center text-gray-500 py-10">
                Recently published books are currently unavailable!
              </p>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
