import React, { useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { useGetSearchQuery } from "../../services/product.service";
import HeadlessTippy from "@tippyjs/react/headless";
import Wrapper from "../../components/popper/Wrapper";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import SearchResult from "./SearchResult";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(false);
  const resultValue = useDebounce(searchValue, 500) || "";

  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetSearchQuery({ q: resultValue.trim() });

  const navigate = useNavigate();
  const inputRef = useRef();

  const handleClear = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith(" ")) {
      setSearchValue(value);
    }
  };

  const handleNavigate = () => {
    if (searchValue !== "") {
      setSearchValue("");
      setShowResult(false);
      navigate(`/products?page=1&q=${searchValue}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchValue !== "") {
      inputRef.current.blur();
      handleNavigate();
    }
  };

  return (
    <div className="w-[30vw] text-black  max-w-[80vw]">
      <HeadlessTippy
        interactive
        placement="bottom"
        theme="light"
        visible={
          showResult &&
          (isLoading || isFetching || products?.body?.data?.length > 0)
        }
        render={(attrs) => (
          <div
            className="bg-white shadow-lg rounded-lg w-[30vw] max-w-[80vw]"
            tabIndex="-1"
            {...attrs}
          >
            <Wrapper>
              {isLoading || isFetching ? (
                <div className="flex items-center justify-center py-4">
                  <AiOutlineLoading3Quarters className="text-gray-500 animate-spin text-2xl" />
                </div>
              ) : products?.body?.data?.length > 0 ? (
                <div className="max-h-[192px] overflow-auto">
                  <h4 className="font-semibold px-4 py-2">Items</h4>
                  <SearchResult value={products?.body?.data} />
                </div>
              ) : (
                <div className="max-h-[192px]">
                  <h1 className="text-center text-lg">
                    Không tìm thấy sản phẩm nào
                  </h1>
                </div>
              )}
            </Wrapper>
          </div>
        )}
        onClickOutside={() => setShowResult(false)}
      >
        <div className="relative flex items-center h-[40px] border border-transparent bg-gray-100 rounded-full pl-4">
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Search item ..."
            spellCheck={false}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowResult(true)}
            className="w-full bg-transparent text-gray-700 font-medium focus:outline-none placeholder-gray-500"
          />
          {!!searchValue && (
            <button
              className="absolute right-[40px] top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={handleClear}
            >
              <MdOutlineCancel />
            </button>
          )}
          <button
            className="absolute right-0 w-[40px] h-full flex items-center justify-center text-gray-500 hover:bg-gray-200 rounded-r-full"
            onClick={handleNavigate}
          >
            <BsSearch />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
};

export default Search;
