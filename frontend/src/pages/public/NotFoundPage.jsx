import MainLayout from "../../components/layouts/MainLayout";


export default function NotFoundPage() {
  return (
    <MainLayout>
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold text-red-600">404</h1>
        <p className="text-gray-600 mt-4">Page introuvable</p>


        <a
          href="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Retour à l'accueil
        </a>
      </div>
    </MainLayout>
  );
}