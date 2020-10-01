import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import Title from "../components/title/Title";

export default function LatestProduct() {
  const { latestProduct, loading, hasErrors, products } = useSelector(
    (state) => state.product
  );
  const location = useLocation();
  const nonSaleProduct =
    location.search === ""
      ? products.filter((prod) => prod.sale === null)
      : latestProduct;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProducts = nonSaleProduct.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Container fluid>
        <Title>Latest</Title>
        <ProductCard
          currentProducts={currentProducts}
          loading={loading}
          hasErrors={hasErrors}
        />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={nonSaleProduct.length}
          paginate={paginate}
        />
      </Container>
    </>
  );
}
