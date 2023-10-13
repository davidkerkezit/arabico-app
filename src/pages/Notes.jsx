import React from "react";
// React Router
import { useLoaderData, useParams } from "react-router-dom";
// Components
import Products from "../components/Products";
import Back from "../components/Back";
function Notes() {
  // perfumesByNote => all perfumes by selected note
  const perfumesByNote = useLoaderData();
  const params = useParams();

  return (
    <div className="md:mt-[3.2rem]">
      <Back />
      {params.note !== undefined && (
        <p
          className="text-whiteness logo-secondary-headers font-semibold uppercase text-center text-lg py-2  bg-gradient-to-r from-coal via-zinc-800 to-coal  border-y-[1px] border-light-gold/30"
          style={{
            color: "var(--" + params.note.split(" ") + ")",
          }}
        >
          {params.note}
        </p>
      )}
      <Products data={perfumesByNote} />{" "}
    </div>
  );
}

export default Notes;
// LOADER 1 - SIMULATION - Get all perfumes by selected note
export async function perfumesByNoteLoader({ params }) {
  // All Perfumes
  const res = await fetch(
    "https://arabico-strapi.onrender.com/api/perfumes?populate=*&filters[soon][$ne][1]=true"
  );
  const data = await res.json();
  // Perfumes
  const perfumesByNote = [];
  data.data.forEach((element) => {
    // element.attributes.ingredients = notes (Object)
    // example : {"Woody": 4,  "Warm Spicy": 2,  "Amber": 2, "Fresh Spicy": 2}
    for (let note in element.attributes.ingredients) {
      note === params.note && perfumesByNote.push(element);
    }
  });

  return perfumesByNote;
}
