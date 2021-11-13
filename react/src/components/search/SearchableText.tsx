
export default function SearchableText(props: any) {
  // var highlight = {backgroundColor: '#FFFF00'}
  // if (props.children.localeCompare(props.q, undefined, {sensitivity: 'base'}) == 0) {
  //   return <mark style={highlight}>{props.children}</mark>;
  // } else {
  //   return <>{props.children}</>;
  // }

  var highlight = {
    backgroundColor: '#FFFF00',
    padding: '0px',
  };
  var output: any = [];
  const text = props.children;

  // if (!RegExp(props.q, 'gi').test(text)) {
  //   return <>{text}</>;
  // }

  if (props.q == null) {
    return <>{text}</>;
  }

  const reg = RegExp(props.q, 'gi');
  let arr;
  var a = 0;
  while ((arr = reg.exec(text)) !== null) {
    var c = reg.lastIndex;
    var b = c - arr[0].length;

    var clean = text.substring(a, b);
    var hlText = text.substring(b, c);

    output.push(<>{clean}</>);
    output.push(<mark style={highlight}>{hlText}</mark>)

    a = c;
  }
  output.push(<>{text.substring(a, text.length)}</>);

  return output;
}
