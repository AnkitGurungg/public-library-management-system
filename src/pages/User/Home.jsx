import { Input } from "@/components/ui/input";
import BookCard from "@/features/User/Home/BookCard";
import Card from "@/features/User/Home/Card";
import useFetchDisplayBooks from "@/hooks/useFetchDisplayBooks";
import { useFetchMemberWishList } from "@/hooks/useFetchMemberWishList";
import { useEffect, useState } from "react";

const Home = () => {
  const {
    data: displayBooks,
    refetch: refetchDisplayBooks,
    isLoading,
    isFetched,
  } = useFetchDisplayBooks();

  useEffect(() => {
    refetchDisplayBooks();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-16 py-16">
      <ul className="grid grid-cols-5 justify-center items-center gap-5">
        {displayBooks?.status === 200 &&
          displayBooks.data?.length > 0 &&
          displayBooks?.data?.map((curBook) => (
            <BookCard key={curBook.bookId} curBook={curBook} />
            // <Card key={curBook.bookId} curBook={curBook} />
          ))}
      </ul>
    </div>
  );
};

export default Home;

{
  /* <div>
      {showRegister && (
        <Dialog open={isOpenRegister} onOpenChange={setIsOpenRegister}>
          <DialogContent className="w-390" aria-describedby={undefined}>
            <DialogHeader className="flex justify-center items-center">
              <DialogTitle className=" opacity-75 text-4xl font-bold text-[#2d3436]">
                Register An Account
              </DialogTitle>
            </DialogHeader>
            <hr />
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md px-4">
                <div className="text-center mb-4">
                  <p className=" text-[#636e72] px-4">
                    Create an account to enjoy all the services!
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="">
                    <Input
                      className="w-full h-[65px] rounded-xl border border-gray-300 bg-white px-4 focus:outline-none focus:ring-1 focus:ring-[#81c7b5]"
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      {...register("email", {
                        required: "Please enter email!",
                        minLength: {
                          value: 1,
                          message: "Minimun length is required",
                        },
                        maxLength: {
                          value: 50,
                          message: "Max length should be 50",
                        },
                      })}
                    />
                    <p className="text-red-500 text-[15px] ml-0.5">
                      {errors?.email?.message}
                    </p>
                  </div>
                  <div>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Password"
                      {...register("password", {
                        required: "Please enter password!",
                        minLength: {
                          value: 1,
                          message: "Min length is required",
                        },
                      })}
                      className="w-full h-[65px] rounded-xl border  border-gray-300 bg-white px-4 focus:outline-none focus:ring-1 focus:ring-[#81c7b5]"
                    />
                    <p className="text-red-500 text-[15px] ml-0.5">
                      {errors?.password?.message}
                    </p>
                  </div>
                  <Button className="bg-[#196489] w-full h-[65px] mx-auto mt-4 flex items-center justify-center rounded-xl text-white text-xl font-medium transition-colors hover:bg-[#196489]">
                    Sign Up
                  </Button>
                </form>

                <div className="mt-5 text-center text-[#4d5156]">
                  Already Have An Account?{" "}
                  <a
                    className="font-medium text-[#196489] cursor-pointer"
                    onClick={() => {
                      setIsOpenLogin(true);
                      setIsOpenRegister(false);
                    }}
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {showOTP && <VerifyOTP />}
      {loading && <LoadingComponent />}
    </div> */
}
