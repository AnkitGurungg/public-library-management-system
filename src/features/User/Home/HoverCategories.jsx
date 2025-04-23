import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useFetchDisplayCategory from "@/hooks/useFetchDisplayCategory";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HoverCategories = () => {
  const navigate = useNavigate();

  const {
    data: displayCategory,
    refetch: refetchDisplayCategory,
    isLoading,
    error,
  } = useFetchDisplayCategory();

  const [hover, setHover] = useState(false);

  return (
    <HoverCard onOpenChange={setHover}>
      <HoverCardTrigger asChild>
        <Button
          variant="link"
          className="font-medium text-[17px] hover:text-[#206ea6]"
        >
          Books {hover ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto max-h-80 overflow-y-auto">
        <div className="flex flex-col gap-1">
          {displayCategory?.status === 200 &&
          Array.isArray(displayCategory?.data) &&
          displayCategory?.data?.length !== 0 ? (
            displayCategory?.data?.map((element) => (
              <div
                key={element.categoryId}
                className="hover:bg-gray-100 px-2 w-full rounded-sm cursor-pointer flex items-center gap-1.5"
                onClick={() => navigate(`/books/genres/${element.categoryId}`)}
                role="button"
                tabIndex={0}
              >
                  <ChevronRight />
                <h4 className="text-[18px] font-bold py-0.5 my-0">
                  {element.name}
                </h4>
              </div>
            ))
          ) : (
            <p>
              {displayCategory?.data?.message || "No categories available!"}
            </p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverCategories;
