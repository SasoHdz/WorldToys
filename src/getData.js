
const getDescription = async (id) => {

    const descriptionURL = `https://api.mercadolibre.com/items/${id}/description`;
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error ',error);
    };
};

export default getDescription;