import { useState } from "react";
import ProductCard from "../../components/common/ProductCard";
import SearchBar from "../../components/ui/SearchBar";
import MainLayout from "../../components/layouts/MainLayout";
import useHomeService from "../../hooks/useHomeService";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const { products, loading, error } = useHomeService();

  const filtered = (products || []).filter(
    (p) => p?.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <MainLayout>
        <div className="h-screen flex items-center justify-center">
          <p className="text-gray-600 text-xl">Chargement des produits...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Affichage erreur */}
      {error && (
        <div className="bg-red-200 w-full py-2 mb-4">
          <p className="text-red-800 text-center">{error}</p>
        </div>
      )}

      {/* Section Hero */}
      <section className="py-12 text-center">
        <h2 className="text-4xl font-bold mb-4">Découvrez nos produits</h2>
        <p className="text-gray-600">Qualité et choix pour tous vos besoins</p>
      </section>

      {/* Barre de recherche */}
      <div className="max-w-md mx-auto mb-8">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Grille des produits */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-0">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            Aucun produit trouvé.
          </p>
        )}
      </section>
    </MainLayout>
  );
}
