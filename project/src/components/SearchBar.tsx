import '../css/SearchBar.css'


function SearchBar(props:any ){
    return(
        <form className="search-bar">
            <input type="text" placeholder="Search..." onChange={(e:any) => props.setFilter(e.target.value) }></input>
        </form>
    )
}

export default SearchBar