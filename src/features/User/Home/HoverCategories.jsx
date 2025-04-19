import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useFetchDisplayCategory from "@/hooks/useFetchDisplayCategory";
import { ChevronDown, ChevronUp } from "lucide-react";
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
    <HoverCard onOpenChange={setHover} >
       <HoverCardTrigger asChild>
        <Button
          variant="link"
          className="font-medium text-[17px] hover:text-[#206ea6]"
        >
          Books {hover ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 max-h-80 overflow-y-auto">
        <div className="flex flex-col gap-1">
          {displayCategory?.status === 200 &&
          Array.isArray(displayCategory?.data) &&
          displayCategory?.data?.length !== 0 ? (
            displayCategory?.data?.map((element) => (
              <div className="hover:bg-gray-100 px-3" key={element.categoryId}>
                <button
                  key={element.categoryId}
                  value={element.categoryId}
                  onClick={() =>
                    navigate(`/books/genres/${element.categoryId}`)
                  }
                >
                  <h4 className="text-base font-sans">{element.name}</h4>
                </button>
              </div>
            ))
          ) : (
            <p>{displayCategory?.data?.message}</p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverCategories;
