import './SearchBar.css';

function onSearchSubmit(event: any) {
  var q = event.target.q.value;
  if (q == "") {
    event.preventDefault();
  }
}

export default function SearchBar(props: any) {
  return (
    <div className="search-bar">
      <form onSubmit={onSearchSubmit}>
        <label htmlFor="q" className="query-prompt">
          {`Search ${props.type}:`}
        </label>
        <input
          className="query-input"
          defaultValue={props.defaultValue ? props.defaultValue : ""}
          name="q"
        />
      </form>
    </div>
  );
}