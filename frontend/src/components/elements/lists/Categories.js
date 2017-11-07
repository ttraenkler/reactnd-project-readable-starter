import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Categories extends PureComponent {
  render() {
    const { categories } = this.props;
    console.log("categories", categories);
    return (
      <p className="categories">
        Filter by categories:{" "}
        <Link key=" " to="/">
          All{" "}
        </Link>
        {categories.map(category => (
          <Link key={category.path} to={`/category/${category.path}`}>
            {category.name}{" "}
          </Link>
        ))}
      </p>
    );
  }
}

export default connect(state => ({ categories: state.categories }))(Categories);
