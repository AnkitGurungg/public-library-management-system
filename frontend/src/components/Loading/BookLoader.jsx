export const BookLoader = () => (
  <div className="col-span-5 flex flex-col items-center justify-center py-20">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
    <p className="text-gray-600 text-lg">Loading...</p>
  </div>
);

// export const BookLoader = () => (
//   <div className="animate-pulse grid grid-cols-5 gap-5">
//     {Array.from({ length: 5 }).map((_, i) => (
//       <div key={i} className="h-48 bg-gray-200 rounded-md"></div>
//     ))}
//   </div>
// );