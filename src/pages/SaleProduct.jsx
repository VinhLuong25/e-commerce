import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Title from "../components/title/Title";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
export default function SaleProduct() {
  const { saleProduct, loading, hasErrors } = useSelector(
    (state) => state.product
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProducts = saleProduct.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Container fluid>
        <Title>Sale</Title>
        <ProductCard
          currentProducts={currentProducts}
          loading={loading}
          hasErrors={hasErrors}
        />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={saleProduct.length}
          paginate={paginate}
        />
      </Container>
    </>
  );
}
