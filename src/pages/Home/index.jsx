import React from "react";
import Header from "../../components/Header";

const Home = () => {
  return (
    <>
      <Header page="home" />
      <div className="max-w-[1440px] mx-auto">
        <div className="xl:px-[80px] lg:px-[30px] px-[15px] flex items-center relative pt-[65px] md:pt-[112px] text-[#fff]"></div>
      </div>
    </>
  );
};

export default Home;
