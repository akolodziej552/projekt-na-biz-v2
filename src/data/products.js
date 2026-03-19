const images = import.meta.glob("../assets/products/*", {eager: true});
const img = (name) => images[`../assets/products/${name}`]?.default;

const products = [
    {id: 1, name: "Hot Dog z dodatkami", price: 7, img: img("Hot dog z dodatkami.png")},
    {id: 2, name: "Hot Dog bez dodatków", price: 6, img: img("Hot dog bez dodatków.png")},
    {id: 3, name: "Zapiekanka z pieczarkami", price: 8, img: img("Zapiekanka z pieczarkami.png")},
    {id: 4, name: "Zapiekanka z szynką", price: 9, img: img("Zapiekanka z szynką.png")},
    {id: 5, name: "Zapiekanka z salami", price: 9, img: img("Zapiekanka z salami.png")},
    {id: 6, name: "Zapiekanka z kurczakiem", price: 9, img: img("Zapiekanka z kurczakiem.png")},
    {id: 7, name: "Buła z gyrosem", price: 16, img: img("Buła z gyrosem.png")},
    {id: 8, name: "Wrap z kurczakiem", price: 16, img: img("Wrap z kurczakiem.png")},
    {id: 9, name: "Panini z salami", price: 8, img: img("Panini z salami.png")},
    {id: 10, name: "Panini z kurczakiem", price: 8, img: img("Panini z kurczkaiem.png")},
    {id: 11, name: "Drożdżówka (dżem, budyń)", price: 4.50, img: img("Drożdżówka z dżemem.png")},
    {id: 12, name: "Drożdżówka paluch", price: 5, img: img("Drożdżówka paluch.png")},
    {id: 13, name: "Drożdżówka", price: 4, img: img("Drożdżówka.png")},
    {id: 14, name: "Obwarzanek", price: 3, img: img("Obwarzanek.png")},
    {id: 15, name: "Kanapka mix", price: 7, img: img("Kanapka mix.png")},
    {id: 16, name: "Gorąca czekolada", price: 6.50, img: img("Gorąca czekolada.png")},
    {id: 17, name: "Kawa czarna", price: 6.50, img: img("Czarna kawa.png")},
    {id: 18, name: "Kawa biała", price: 7, img: img("Kawa z mlekiem.png")},
    {id: 19, name: "Herbata", price: 4, img: img("Herbata.png")},
    {id: 20, name: "Tosty (2 szt.)", price: 9, img: img("Tosty.png")},
    {id: 21, name: "Herbata zimowa", price: 7, img: img("Gerbata zimowa.png")}
];
export default products;