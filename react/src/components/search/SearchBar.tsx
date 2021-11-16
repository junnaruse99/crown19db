import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import './SearchBar.css';

export default function SearchBar(props: any) {
  const history = useHistory();

  const onSearchSubmit = (event) => {
    event.preventDefault();
    var q: string = event.target.q.value;
    if (q == "") {
      event.preventDefault();
      return;
    }

    var params: any = queryString.parse(props.location.search);
    params.q = q;
    var uri = props.redirect != null ? props.redirect + '' : '';
    uri += '?' + queryString.stringify(params);
    history.push(uri);
    history.go(uri);
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
