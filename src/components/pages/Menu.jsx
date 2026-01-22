import "../../styles/pages/menu.css";

const Menu = () => {
    return (
        <div className="menuwrapper">
            <div className="menu">
                <input type="search" />
                <ul className="categories">
                    <li>Jedzenie ciepłe</li>
                    <li>Przekąski</li>
                    <li>Napoje</li>
                </ul>
                <div className="productlist">

                </div>
            </div>
        </div>
    )
}

export default Menu;