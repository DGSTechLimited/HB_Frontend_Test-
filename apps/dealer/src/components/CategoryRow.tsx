import { Link } from "react-router-dom";

const categories = [
  { label: "Engine", glyph: "E", to: "/search?category=engine" },
  { label: "Suspension", glyph: "S", to: "/search?category=suspension" },
  { label: "Brakes", glyph: "B", to: "/search?category=brakes" },
  { label: "Electrical", glyph: "E", to: "/search?category=electrical" },
  { label: "Filters", glyph: "F", to: "/search?category=filters" },
  { label: "Body Parts", glyph: "B", to: "/search?category=body" },
  { label: "Accessories", glyph: "A", to: "/search?category=accessories" },
  { label: "Exclusive", glyph: "X", to: "/exclusive" },
  { label: "Offers", glyph: "O", to: "/new-stocks-offers" },
  { label: "Track Order", glyph: "T", to: "/order/track" },
];

const CategoryRow = () => {
  return (
    <section className="category-row">
      <div className="category-row__edge category-row__edge--left" />
      <div className="category-row__edge category-row__edge--right" />
      <div className="category-row__track">
        {categories.map((category) => {
          return (
            <div
              key={category.label}
              className="transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Link to={category.to} className="category-row__item">
                <span className="category-row__icon" aria-hidden="true">
                  {category.glyph}
                </span>
                <span className="category-row__label">{category.label}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryRow;
