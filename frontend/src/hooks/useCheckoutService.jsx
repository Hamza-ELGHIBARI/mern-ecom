import { useState, useEffect } from "react";
import clientApi from "../api/clientApi";

export default function useCheckoutService() {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAddresses = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await clientApi.getAddresses();
            setAddresses(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addAddress = async (address) => {
        setLoading(true);
        setError(null);
        try {
            const data = await clientApi.addAddress(address);
            setAddresses((prev) => [...prev, data]);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async ({ addressIndex, items }) => {

        setLoading(true);
        setError(null);
        try {
            await clientApi.createOrder({
                addressIndex, items: items.map((item) => ({
                    productId: item._id,
                    quantity: item.qty,
                }))
            });
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    return {
        addresses,
        addAddress,
        createOrder,
        loading,
        error,
        fetchAddresses,
    };
}
