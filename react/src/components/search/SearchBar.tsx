import './SearchBar.css';

function onSearchSubmit(event: any) {
  var q = event.target.q.value;
  console.log(q);
}

export default function SearchBar(props: any) {
  var searchPrompt = "Search ";
  searchPrompt += props.type;
  searchPrompt += ":";

  return (
    <div className="search-bar">
      <form onSubmit={onSearchSubmit}>
        <label htmlFor="q" className="query-prompt">
          {searchPrompt}
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