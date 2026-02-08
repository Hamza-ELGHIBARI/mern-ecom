const clientService = require("../services/client.service");

const getAddresses = async (req, res) => {
    try {
        const addresses = await clientService.getAddresses(req.user.id);
        res.json(addresses);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const addAddress = async (req, res) => {
    try {
        const { street, city, zip, country } = req.body;
        const address = await clientService.addAddress(req.user.id, { street, city, zip, country });
        res.status(201).json(address);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAddresses, addAddress };
