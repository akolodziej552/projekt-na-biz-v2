export const fmt = (price) => price.toFixed(2).replace(".",",") + " zł";


export const generateOrderNumber = () => {
    let counter = localStorage.getItem("orderCounter");
    counter = counter ? parseInt(counter) + 1 : 1;
    localStorage.setItem("orderCounter", counter);
    return `ZAM-${String(counter).padStart(4, "0")}`;
}