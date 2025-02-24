import { useEffect, useState } from "react";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="md:flex hidden w-[50px] h-[50px]   justify-center items-center rounded-[50%] fixed bottom-20 right-3 p-5 bg-[#D7FD44] text-black  shadow-md text-[30px] font-bold"
        >
          ↑
        </button>
      )}
    </>
  );
}

export default ScrollToTopButton;
