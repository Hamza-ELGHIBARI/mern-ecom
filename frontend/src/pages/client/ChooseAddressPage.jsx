import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layouts/MainLayout";
import Button from "../../components/ui/Button";
import useCheckoutService from "../../hooks/useCheckoutService";
import CartContext from "../../contexts/CartContext";
import toast from "react-hot-toast";

export default function ChooseAddressPage() {
    const navigate = useNavigate();
    const { items } = useContext(CartContext);
    const { addresses, fetchAddresses, addAddress, loading, error } = useCheckoutService();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [newAddress, setNewAddress] = useState({ street: "", city: "", zip: "", country: "" });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleAddAddress = async (e) => {
        e.preventDefault();
        const added = await addAddress(newAddress);
        setSelectedIndex(addresses.length); // dernière adresse ajoutée
        setNewAddress({ street: "", city: "", zip: "", country: "" });
    };

    const handleProceed = () => {
        if (selectedIndex === null) return  toast.error("Veuillez séléctionnez une addresse");;
        navigate("/client/checkout", { state: { addressIndex: selectedIndex } });
    };

    if (loading) return <p className="text-center py-20">Chargement...</p>;

    return (
        <>
            <h2 className="text-2xl font-bold mb-6">Choisir ou ajouter une adresse</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <div className="mb-6">
                <h3 className="font-semibold mb-2">Vos adresses</h3>
                {addresses.length === 0 && <p>Aucune adresse trouvée.</p>}
                {addresses.map((addr, idx) => (
                    <div key={idx} className="flex items-center gap-3 mb-2">
                        <input type="radio" checked={selectedIndex === idx} onChange={() => setSelectedIndex(idx)} />
                        <span>{addr.street}, {addr.city}, {addr.zip}, {addr.country}</span>
                    </div>
                ))}
            </div>

            <form className="mb-6" onSubmit={handleAddAddress}>
                <h3 className="font-semibold mb-2">Ajouter une adresse</h3>
                <input type="text" placeholder="Rue" value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} className="border w-full mb-2 px-2 py-1 rounded" required/>
                <input type="text" placeholder="Ville" value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className="border w-full mb-2 px-2 py-1 rounded" required/>
                <input type="number" placeholder="Code postal" value={newAddress.zip} onChange={e => setNewAddress({...newAddress, zip: e.target.value})} className="border w-full mb-2 px-2 py-1 rounded" required/>
                <input type="text" placeholder="Pays" value={newAddress.country} onChange={e => setNewAddress({...newAddress, country: e.target.value})} className="border w-full mb-2 px-2 py-1 rounded" required/>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Ajouter</button>
            </form>

            <Button onClick={handleProceed} className="bg-green-600 text-white px-4 py-2 rounded">Procéder au paiement</Button>
        </>
    );
}
