const LoadingComponent = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-transparent backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
      <div className="w-12 h-12 border-4 border-white border-t-[#206ea6] rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingComponent;
