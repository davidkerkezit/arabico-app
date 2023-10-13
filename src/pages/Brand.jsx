import React from "react";
// React Router
import { useLoaderData, useParams } from "react-router-dom";
// Components
import BrandDetails from "../components/BrandsComponents/BrandDetails";
import Products from "../components/Products";
// Brands logo
import AJMAL from "../assets/ajmal.png";
import ARMAF from "../assets/armaf.png";
import LATTAFA from "../assets/lattafa.png";
import Back from "../components/Back";

// Brands information
const BrandsInfo = [
  {
    id: 1,
    brandName: "Ajmal",
    description:
      "Perfume is all you need for time travel, that is the connection between your memories and fragrances - said Ajmal Ali, the founder of the Ajmal brand. Thanks to the vision and tireless commitment, Ajmal perfumes turned from a modest trading house to a corporate entity, worth several million dollars.",
    logo: AJMAL,
  },
  {
    id: 2,
    brandName: "Armaf",
    description:
      "Armaf is a perfume brand of the Sterling Parfums Industries LLC group of companies. The company's headquarters is in the United Arab Emirates (UAE). The group was founded in 1998 by the Fakhruddin family.Long before that, the family had a vision of creating a company that would bring success to everyone involved. The principle of treating every employee and supplier with respect and providing customers with impeccable service was to form the basis of this. The company's philosophy guided by loyalty and honesty has emerged from the deep conviction that a business can only be successful if all hands were on deck.",

    logo: ARMAF,
  },
  {
    id: 3,
    brandName: "Lattafa",
    description:
      "Lattafa Perfumes Industries L.L.C is Dubai’s leading premium luxury perfumery of authentic Arabic fragrances and it makes the world of scent sophistication available for everyone looking to shop online for perfume in UAE.Inspired by the Arabic words, ‘Latif’ for kindness and ‘Lateefa’ for pleasant, Lattafa resonates with the luxury and elegance of the Arabian culture and it vividly captures the essence of its glorious heritage in its captivating fragrance. With Lattafa’s online store, you can explore and select items at the touch of a button from a wide variety of products.",
    logo: LATTAFA,
  },
];
function Brand() {
  // brand => brand ID
  const { brand } = useParams();
  // perfumesByBrand => all perfumes by selected brand
  const perfumesByBrand = useLoaderData();
  // Find information for selected brand
  const brandInfo = BrandsInfo.find((item) => item.brandName === brand);

  return (
    <div className="md:mt-[3.2rem]">
      <Back />
      <BrandDetails data={brandInfo} />
      <h4 className="text-whiteness logo-secondary-headers font-semibold uppercase text-center text-lg py-2  bg-gradient-to-r from-coal via-zinc-800 to-coal  border-y-[1px] border-light-gold/30">
        {brand}
      </h4>
      <Products data={perfumesByBrand} />
    </div>
  );
}

export default Brand;
// LOADER 1 -Get all perfumes by selected brand
export async function perfumesByBrandLoader({ params }) {
  const res = await fetch(
    `https://arabico-strapi.onrender.com/api/perfumes?populate=*&filters[brandCategory][title][$eq][0]=${params.brand}&filters[soon][$ne][1]=true`
  );
  const data = await res.json();
  return data.data;
}
