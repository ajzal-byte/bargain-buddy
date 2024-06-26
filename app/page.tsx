import Image from "next/image";
import { HeroCarousel, SearchBar } from "@/components";
import { getAllProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";

// export const metadata = {
//   icons: {
//     icon: "/favicon.ico", // /public path
//   },
// };

const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="px-6 md:px-20 py-14">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping starts here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Spend Wisely, <br /> Save Greatly with
              <span className="text-primary"> BargainBuddy</span>
            </h1>

            <p className="mt-6">
              Embrace a smarter, more savvy approach to spending with our
              intelligent price monitoring and deal-finding capabilities.
            </p>
            <SearchBar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending Products</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
