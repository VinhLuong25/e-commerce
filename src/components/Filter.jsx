import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  filterByBrandLatest,
  filterByBrandSale,
  sortByLatest,
  sortBySale,
  clearFilter,
} from "../redux/productSlice";
import InfoBox from "./InfoBox";
export default function Filter() {
  const dispatch = useDispatch();
  const pathName = useLocation().pathname;
  const history = useHistory();
  const { products } = useSelector((state) => state.product);
  const [brandState, setBrandState] = useState(null);
  const [sizeState, setSizeState] = useState(null);
  const [sort, setSort] = useState(null);

  const getUnique = (items, value) => {
    return [...new Set(items.map((item) => item[value]))];
  };

  const type = getUnique(products, "brand");
  const brandType = ["All", ...type];
  const ref = useRef();

  const closeCart = () => {
    const filterBar = document.querySelector(".filter-bar");
    filterBar.style.transform = "translateX(-1300px)";
  };
  const sizeArray = [
    "All",
    "US4",
    "US5",
    "US6",
    "US7",
    "US8",
    "US9",
    "US10",
    "US11",
    "US12",
  ];
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeCart();
    }
  };

  const handleDone = () => {
    if (pathName === "/latest-product") {
      if (!sort) {
        dispatch(filterByBrandLatest({ brand: brandState, size: sizeState }));
      } else {
        dispatch(filterByBrandLatest({ brand: brandState, size: sizeState }));
        dispatch(sortByLatest({ sort: sort }));
      }
    } else if (pathName === "/sale-product") {
      if (!sort) {
        dispatch(filterByBrandSale({ brand: brandState, size: sizeState }));
      } else {
        dispatch(filterByBrandSale({ brand: brandState, size: sizeState }));
        dispatch(sortBySale({ sort: sort }));
      }
    }

    closeCart();
  };

  const handleClear = () => {
    setBrandState(null);
    setSizeState(null);
    setSort(null);
    dispatch(clearFilter({ pathName: pathName }));
    history.push(`${pathName}`);
    closeCart();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="filter-bar" ref={ref}>
      <div className="head">
        <div className="title">
          <p>View By</p>
          <p onClick={() => closeCart()}>X</p>
        </div>
        <div className="state">
          {brandState && (
            <div className="state-box">
              <span>{brandState}</span>

              <span onClick={() => setBrandState(null)}>X</span>
            </div>
          )}
          {sizeState && (
            <div className="state-box">
              <span>{sizeState}</span>

              <span onClick={() => setSizeState(null)}>X</span>
            </div>
          )}
          {sort && (
            <div className="state-box">
              <span>{sort}</span>

              <span onClick={() => setSort(null)}>X</span>
            </div>
          )}
        </div>
      </div>
      <div className="filter-by">
        <p className="title">Filter By: </p>
        <InfoBox
          infoTitle="Brand"
          info={brandType.map((brand, idx) => (
            <p
              key={idx}
              onClick={(e) => {
                setBrandState(e.target.innerHTML);
              }}
            >
              {brand}
            </p>
          ))}
        />

        <InfoBox
          infoTitle="Size"
          info={sizeArray.map((size, idx) => (
            <p
              key={idx}
              onClick={(e) => {
                setSizeState(e.target.innerHTML);
              }}
            >
              {size}
            </p>
          ))}
        />
      </div>
      <div className="sort-by">
        <p className="title">Sort By:</p>
        <div>
          <p onClick={() => setSort("high to low")}>Price - high to low</p>
          <p onClick={() => setSort("low to high")}>Price - low to high</p>
        </div>
      </div>
      <div className="all-btn">
        <div className="btn" onClick={handleClear}>
          <Link to={(location) => `${location.pathname}`}>clear</Link>
        </div>
        <div className="btn" onClick={handleDone}>
          <Link
            to={(location) =>
              `${location.pathname}?brand=${brandState}&size=${sizeState}&sort=${sort}`
            }
          >
            done
          </Link>
        </div>
      </div>
    </div>
  );
}
