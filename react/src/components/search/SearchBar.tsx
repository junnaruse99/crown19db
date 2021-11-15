import { useHistory } from 'react-router-dom';
import './SearchBar.css';

export default function SearchBar(props: any) {
  const history = useHistory();

  const onSearchSubmit = (event) => {
    var q: string = event.target.q.value;
    if (q == "") {
      event.preventDefault();
      return;
    }

    if (props.redirect != null) {
      var uri = `${props.redirect}?q=${q}`;
      history.push(uri);
      history.go(uri);
    }
  }

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
