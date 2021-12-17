import React from "react";

const Search = (props) => {
const people = props.movieTitles
const [searchTerm, setSearchTerm] = React.useState("");
const [searchResults, setSearchResults] = React.useState([]);
const handleChange = event => {
setSearchTerm(event.target.value);
document.querySelector('input').value.length > 0 ? document.querySelector('.search').classList.add("search-results") : document.querySelector('.search').classList.remove("search-results")
};

React.useEffect(() => {
    const results = people.filter((person, i) =>
      person.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
}, [searchTerm]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="search">
         {searchResults.map((item, i) => (
             <div key={i}>
                <div>{item}</div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Search

